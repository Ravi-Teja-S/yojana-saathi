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

    if (!query || !schemeName) {
      return NextResponse.json({ error: 'Missing query or schemeName' }, { status: 400 });
    }

    const collection = db.collection("schemes_collection"); 

    // 1. PERFORM VECTOR SEARCH
    // We use "$vectorize": true in projection because that is where your text is stored
    const cursor = collection.find(
      { scheme_id: schemeName }, 
      {
        sort: { $vectorize: query },
        limit: 5,
        projection: { "$vectorize": true }, 
      }
    );

    const documents = await cursor.toArray();
    
    // --- CHUNK VERIFICATION LOGS ---
    console.log(`\n--- 🕵️ RAG VERIFICATION FOR: ${schemeName} ---`);
    console.log(`✅ Chunks Found: ${documents.length}`);

    if (documents.length > 0) {
      documents.forEach((doc, index) => {
        // Accessing the actual text from the $vectorize field
        const textSnippet = doc.$vectorize?.substring(0, 150) || "⚠️ No text in $vectorize";
        console.log(`📄 CHUNK ${index + 1}: ${textSnippet}...`);
      });
    } else {
      console.log("⚠️ WARNING: No documents matched the filter. Check name casing.");
    }

    // 2. PREPARE CONTEXT FOR SARVAM AI
    const contextText = documents.map(doc => doc.$vectorize || "").join('\n\n');

    // 3. GENERATE STREAMING RESPONSE
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

    // 4. STREAM TO FRONTEND
    const responseStream = new ReadableStream({
      async start(controller) {
        const encoder = new TextEncoder();
        try {
          for await (const chunk of stream) {
            const content = chunk.choices?.[0]?.delta?.content;
            if (content) {
              controller.enqueue(encoder.encode(content));
            }
          }
        } catch (err) {
          console.error("Streaming Error:", err);
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
    console.error('--- BACKEND ERROR ---');
    console.error(error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}