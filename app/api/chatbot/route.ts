import { NextRequest, NextResponse } from 'next/server';
import { DataAPIClient } from "@datastax/astra-db-ts";
import { SarvamAIClient } from "sarvamai";

const sarvamClient = new SarvamAIClient({
  apiSubscriptionKey: process.env.SARVAM_API_KEY || '',
});

const client = new DataAPIClient();
const db = client.db(process.env.ASTRA_DB_API_ENDPOINT!, { 
  token: process.env.ASTRA_DB_APPLICATION_TOKEN! 
});

export async function POST(request: NextRequest) {
  try {
    const { query, schemeName } = await request.json();
    console.log(`[CHATBOT] 📨 Received request | Scheme: "${schemeName}" | Query: "${query}"`);

    if (!query || !schemeName) {
      console.warn('[CHATBOT] ⚠️ Missing query or schemeName in request body');
      return NextResponse.json({ error: 'Missing query or schemeName' }, { status: 400 });
    }

    const collection = db.collection("schemes_collection"); 

    // 1. PERFORM VECTOR SEARCH
    console.log(`[CHATBOT] 🔍 Starting AstraDB vector search for scheme: "${schemeName}"`);
    const cursor = collection.find(
      { scheme_id: schemeName }, 
      {
        sort: { $vectorize: query },
        limit: 5,
        projection: { "$vectorize": true }, 
      }
    );

    const documents = await cursor.toArray();
    console.log(`[CHATBOT] ✅ AstraDB search complete | Chunks found: ${documents.length}`);

    if (documents.length > 0) {
      documents.forEach((doc, index) => {
        const textSnippet = doc.$vectorize?.substring(0, 150) || "⚠️ No text in $vectorize";
        console.log(`[CHATBOT] 📄 Chunk ${index + 1}: ${textSnippet}...`);
      });
    } else {
      console.warn(`[CHATBOT] ⚠️ No documents matched scheme_id: "${schemeName}" — check name casing in DB`);
    }

    // 2. PREPARE CONTEXT FOR SARVAM AI
    const contextText = documents.map(doc => doc.$vectorize || "").join('\n\n');
    console.log(`[CHATBOT] 📝 Context prepared | Total length: ${contextText.length} chars`);

    // 3. GENERATE STREAMING RESPONSE
    console.log('[CHATBOT] 🚀 Calling Sarvam AI (sarvam-30b, stream: true)...');
    const stream = await sarvamClient.chat.completions({
      model: "sarvam-30b", 
      messages: [
        {
          role: 'system',
          content: `You are a helpful expert assistant for the ${schemeName} government scheme. 
          Respond using Markdown (bullet points, bold text). 
          Answer ONLY based on the official guidelines provided below. 
          If the information is not in the context, say you don't have that specific detail.

          OFFICIAL GUIDELINES CONTEXT:
          ${contextText || "No specific guidelines found in the database."}`
        },
        { role: 'user', content: query },
      ],
      temperature: 0.6,
      stream: true,
    });
    console.log('[CHATBOT] ✅ Sarvam stream opened successfully');

    // 4. STREAM TO FRONTEND
    const responseStream = new ReadableStream({
      async start(controller) {
        const encoder = new TextEncoder();
        let totalChunks = 0;
        try {
          for await (const chunk of stream) {
            const content = chunk.choices?.[0]?.delta?.content;
            if (content) {
              totalChunks++;
              controller.enqueue(encoder.encode(content));
            }
          }
          console.log(`[CHATBOT] ✅ Stream complete | Total chunks sent to client: ${totalChunks}`);
        } catch (err) {
          console.error('[CHATBOT] ❌ Streaming error while reading Sarvam chunks:', err);
        } finally {
          controller.close();
        }
      },
    });

    return new Response(responseStream, {
      headers: { 
        'Content-Type': 'text/plain; charset=utf-8',
        'Cache-Control': 'no-cache'
      },
    });

  } catch (error: any) {
    console.error('[CHATBOT] ❌ Unhandled error:', error?.message || error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
