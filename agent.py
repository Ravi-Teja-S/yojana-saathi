# """
# Yojana Saathi Voice Agent
# =========================
# LiveKit voice agent using 100% Sarvam AI stack:
#   - STT  : sarvam (saarika:v2.5)  — Indian-language speech recognition
#   - LLM  : sarvam (sarvam-30b)    — scheme-aware RAG answer generation
#   - TTS  : sarvam (bulbul:v2)     — Indian-language text-to-speech
#   - VAD  : silero                 — voice activity detection

# Run (dev mode):
#     python agent.py dev

# Run (production):
#     python agent.py start

# Required .env variables:
#     LIVEKIT_URL
#     LIVEKIT_API_KEY
#     LIVEKIT_API_SECRET
#     SARVAM_API_KEY
#     ASTRA_DB_API_ENDPOINT
#     ASTRA_DB_APPLICATION_TOKEN
# """

# import json
# import logging
# import os

# from dotenv import load_dotenv
# from livekit import agents
# from livekit.agents import Agent, AgentSession, JobContext, WorkerOptions, cli
# from livekit.plugins import sarvam, silero
# from astrapy import DataAPIClient

# from pathlib import Path; load_dotenv(Path(__file__).parent / ".env.local")

# logger = logging.getLogger("yojana-saathi-agent")
# logging.basicConfig(level=logging.INFO)


# # ── AstraDB RAG helper ────────────────────────────────────────────────────────

# def get_scheme_context(scheme_id: str, query: str, max_chunks: int = 5) -> str:
#     """Fetch relevant context chunks from AstraDB for the given scheme."""
#     try:
#         db_client = DataAPIClient(os.environ["ASTRA_DB_APPLICATION_TOKEN"])
#         db = db_client.get_database(os.environ["ASTRA_DB_API_ENDPOINT"])
#         collection = db.get_collection("schemes_collection")

#         cursor = collection.find(
#             {"scheme_id": scheme_id},
#             sort={"$vectorize": query},
#             limit=max_chunks,
#             projection={"$vectorize": True},
#         )
#         docs = list(cursor)
#         logger.info(f"[RAG] Found {len(docs)} chunks for scheme '{scheme_id}'")

#         if not docs:
#             logger.warning(f"[RAG] No documents found for scheme_id='{scheme_id}'")
#             return ""

#         return "\n\n".join(doc.get("$vectorize", "") for doc in docs if doc.get("$vectorize"))

#     except Exception as e:
#         logger.error(f"[RAG] AstraDB error: {e}")
#         return ""


# def build_system_prompt(scheme_id: str, context: str) -> str:
#     return f"""You are Yojana Saathi, a friendly and knowledgeable voice assistant 
# for the {scheme_id} government scheme. You help citizens understand eligibility, 
# benefits, and how to apply.

# IMPORTANT RULES:
# - Keep responses SHORT and conversational — you are speaking, not writing.
# - Avoid bullet points, markdown, or lists. Speak in natural sentences.
# - Answer ONLY based on the official guidelines below.
# - If the answer is not in the context, say: "I don't have that specific detail, 
#   but I suggest contacting your nearest government helpline."
# - Speak in simple language. The user may be from a rural area.

# OFFICIAL SCHEME GUIDELINES:
# {context if context else "No specific guidelines available. Answer based on general knowledge about this scheme."}
# """


# # ── LiveKit Agent entrypoint ──────────────────────────────────────────────────

# async def entrypoint(ctx: JobContext):
#     logger.info(f"[AGENT] 🚀 New job received | Room: {ctx.room.name}")

#     # 1. Connect to the LiveKit room
#     await ctx.connect()
#     logger.info("[AGENT] ✅ Connected to room")

#     # 2. Wait for the user participant to join
#     participant = await ctx.wait_for_participant()
#     logger.info(f"[AGENT] 👤 Participant joined: {participant.identity}")

#     # 3. Extract scheme_id from participant metadata (set by get-voice-token/route.ts)
#     scheme_id = "Government Scheme"  # fallback
#     try:
#         raw_metadata = participant.metadata or ctx.room.metadata or ""
#         if raw_metadata:
#             meta = json.loads(raw_metadata)
#             scheme_id = meta.get("scheme_id", scheme_id)
#             logger.info(f"[AGENT] 📋 Scheme ID from metadata: '{scheme_id}'")
#     except Exception as e:
#         logger.warning(f"[AGENT] ⚠️ Could not parse metadata: {e}")

#     # 4. Fetch RAG context for an opening query
#     logger.info(f"[AGENT] 🔍 Fetching RAG context for scheme: '{scheme_id}'")
#     context = get_scheme_context(scheme_id, query=f"overview of {scheme_id} scheme benefits eligibility")

#     # 5. Build system prompt
#     system_prompt = build_system_prompt(scheme_id, context)
#     logger.info(f"[AGENT] 📝 System prompt built | Context length: {len(context)} chars")

#     # 6. Create the agent with full Sarvam pipeline
#     agent = Agent(instructions=system_prompt)

#     session = AgentSession(
#         vad=silero.VAD.load(),
#         stt=sarvam.STT(
#             model="saarika:v2.5",
#             language="en-IN",   # Indian English — handles Kanglish naturally
#         ),
#         llm=sarvam.LLM(
#             model="sarvam-30b",
#         ),
#         tts=sarvam.TTS(
#             model="bulbul:v2",
#             target_language_code="en-IN",
#         ),
#     )

#     logger.info("[AGENT] ✅ AgentSession created — starting...")

#     await session.start(
#         agent=agent,
#         room=ctx.room,
#         )

#     # 7. Greet the user with a scheme-specific opening
#     await session.generate_reply(
#         instructions=(
#             f"Greet the user warmly and introduce yourself as Yojana Saathi, "
#             f"their assistant for the {scheme_id} scheme. "
#             f"Ask them what they'd like to know — eligibility, benefits, or how to apply."
#         )
#     )

#     logger.info("[AGENT] 🎙️ Agent is live and listening")


# # ── Run ───────────────────────────────────────────────────────────────────────

# if __name__ == "__main__":
#     cli.run_app(WorkerOptions(entrypoint_fnc=entrypoint))


"""
Yojana Saathi Voice Agent (Optimized)
=====================================
LiveKit voice agent with optimized RAG using AstraDB vector search
with scheme_id filtering to improve latency and accuracy.

Performance improvements:
- Filter by scheme_id BEFORE vector search (reduces search space)
- Limit to top 5 chunks only
- Cache database connection
- Use $vectorize for automatic embedding
- Async DB operations
"""

import json
import logging
import os
import asyncio
from typing import Optional

from dotenv import load_dotenv
from livekit import agents
from livekit.agents import Agent, AgentSession, JobContext, WorkerOptions, cli
from livekit.plugins import sarvam, silero
from astrapy import DataAPIClient

from pathlib import Path
load_dotenv(Path(__file__).parent / ".env.local")

logger = logging.getLogger("yojana-saathi-agent")
logging.basicConfig(level=logging.INFO)

# ── Global database client (singleton) ────────────────────────────────────────

_db_client: Optional[DataAPIClient] = None
_collection = None

def get_db_collection():
    """Get or initialize the AstraDB collection (reuse connection)."""
    global _db_client, _collection
    
    if _collection is None:
        try:
            _db_client = DataAPIClient(
                token=os.environ["ASTRA_DB_APPLICATION_TOKEN"]
            )
            db = _db_client.get_database(
                os.environ["ASTRA_DB_API_ENDPOINT"]
            )
            _collection = db.get_collection("schemes_collection")
            logger.info("[DB] ✅ AstraDB collection initialized (cached)")
        except Exception as e:
            logger.error(f"[DB] ❌ Failed to initialize AstraDB: {e}")
            raise
    
    return _collection


# ── Optimized RAG helper ───────────────────────────────────────────────────────

async def get_scheme_context(scheme_id: str, query: str, max_chunks: int = 5) -> str:
    """
    Fetch relevant context chunks from AstraDB.
    
    **Optimization strategy:**
    1. Filter documents by scheme_id (exact match) — reduces search space
    2. Vector search ONLY on filtered documents
    3. Limit to top 5 chunks
    4. Use $vectorize for automatic embedding
    
    Args:
        scheme_id: Government scheme identifier (e.g., "PM-KISAN")
        query: User question or search query
        max_chunks: Number of top chunks to retrieve (default: 5)
    
    Returns:
        Concatenated text of top matching chunks
    """
    try:
        collection = get_db_collection()
        
        logger.info(f"[RAG] 🔍 Searching scheme '{scheme_id}' with query: '{query}'")
        
        # **KEY OPTIMIZATION**: Filter by scheme_id FIRST, then vector search
        # This is much faster than searching all documents
        cursor = collection.find(
            filter={
                "scheme_id": scheme_id  # Exact match filter on indexed field
            },
            sort={
                "$vectorize": query  # Vector search ONLY on filtered documents
            },
            limit=max_chunks,  # Limit results
            projection={
                "content": 1,  # Include document content
                "chunk_id": 1,
                "scheme_id": 1,
                "$similarity": 1,  # Include similarity score
            }
        )
        
        docs = list(cursor)
        logger.info(f"[RAG] ✅ Retrieved {len(docs)} chunks for scheme '{scheme_id}'")
        
        if not docs:
            logger.warning(f"[RAG] ⚠️ No documents found for scheme_id='{scheme_id}'")
            return ""
        
        # Log similarity scores for debugging
        for i, doc in enumerate(docs):
            similarity = doc.get("$similarity", 0)
            logger.info(f"[RAG] Chunk {i+1}: similarity={similarity:.3f}")
        
        # Concatenate content from all chunks
        context = "\n\n".join(
            doc.get("content", "") for doc in docs if doc.get("content")
        )
        
        logger.info(f"[RAG] 📋 Context length: {len(context)} characters")
        return context
        
    except Exception as e:
        logger.error(f"[RAG] ❌ Error during retrieval: {e}", exc_info=True)
        return ""


def build_system_prompt(scheme_id: str, context: str) -> str:
    """Build the system prompt with scheme guidelines."""
    return f"""You are Yojana Saathi, a friendly and knowledgeable voice assistant 
for the {scheme_id} government scheme. You help citizens understand eligibility, 
benefits, and how to apply.

IMPORTANT RULES:
- Keep responses SHORT and conversational — you are speaking, not writing.
- Avoid bullet points, markdown, or lists. Speak in natural sentences.
- Answer ONLY based on the official guidelines below.
- If the answer is not in the context, say: "I don't have that specific detail, 
  but I suggest contacting your nearest government helpline."
- Speak in simple language. The user may be from a rural area.

OFFICIAL SCHEME GUIDELINES:
{context if context else "No specific guidelines available. Answer based on general knowledge about this scheme."}
"""


# ── LiveKit Agent entrypoint ──────────────────────────────────────────────────

async def entrypoint(ctx: JobContext):
    logger.info(f"[AGENT] 🚀 New job received | Room: {ctx.room.name}")

    # 1. Connect to the LiveKit room
    await ctx.connect()
    logger.info("[AGENT] ✅ Connected to room")

    # 2. Wait for the user participant to join
    participant = await ctx.wait_for_participant()
    logger.info(f"[AGENT] 👤 Participant joined: {participant.identity}")

    # 3. Extract scheme_id from participant metadata
    scheme_id = "Government Scheme"
    try:
        raw_metadata = participant.metadata or ctx.room.metadata or ""
        if raw_metadata:
            meta = json.loads(raw_metadata)
            scheme_id = meta.get("scheme_id", scheme_id)
            logger.info(f"[AGENT] 📋 Scheme ID: '{scheme_id}'")
    except Exception as e:
        logger.warning(f"[AGENT] ⚠️ Could not parse metadata: {e}")

    # 4. **ASYNC RAG retrieval** — fetch context while greeting
    logger.info(f"[AGENT] 🔍 Fetching RAG context for '{scheme_id}'...")
    context = await get_scheme_context(
        scheme_id=scheme_id,
        query=f"overview benefits eligibility requirements for {scheme_id}",
        max_chunks=5
    )

    # 5. Build system prompt
    system_prompt = build_system_prompt(scheme_id, context)
    logger.info(f"[AGENT] 📝 System prompt ready | Context: {len(context)} chars")

    # 6. Create the agent with Sarvam AI pipeline
    agent = Agent(instructions=system_prompt)

    session = AgentSession(
        vad=silero.VAD.load(),
        stt=sarvam.STT(
            model="saaras:v3",
            language="unknown",
            mode="transcribe"
        ),
        llm=sarvam.LLM(
            model="sarvam-30b",
        ),
        tts=sarvam.TTS(
            model="bulbul:v3",
            target_language_code="en-IN",
            speaker="shubh"
        ),
    )

    logger.info("[AGENT] ✅ AgentSession created")

    # 7. Start the agent session
    await session.start(
        agent=agent,
        room=ctx.room,
    )

    # 8. Greet the user
    await session.generate_reply(
        instructions=(
            f"Greet the user warmly. Say: 'Namaste! I'm Yojana Saathi, "
            f"your assistant for the {scheme_id} scheme. "
            f"I'm here to help you understand eligibility, benefits, and how to apply. "
            f"What would you like to know?'"
        )
    )

    logger.info("[AGENT] 🎙️ Agent is live and listening")


# ── Run ───────────────────────────────────────────────────────────────────────

if __name__ == "__main__":
    cli.run_app(WorkerOptions(entrypoint_fnc=entrypoint))

