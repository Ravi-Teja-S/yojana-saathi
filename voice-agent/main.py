# # import json
# # import logging
# # import os
# # from typing import Optional

# # from dotenv import load_dotenv
# # from livekit.agents import JobContext, WorkerOptions, cli
# # from livekit.agents.voice import Agent, AgentSession
# # from livekit.plugins import openai, sarvam, silero
# # from astrapy import DataAPIClient

# # # Load environment variables
# # load_dotenv(".env.local")

# # # Set up logging
# # logger = logging.getLogger("yojana-saathi-agent")
# # logging.basicConfig(level=logging.INFO)

# # # ── AstraDB Global Client ───────────────────────────────────────────────────

# # _db_client: Optional[DataAPIClient] = None
# # _collection = None

# # def get_db_collection():
# #     global _db_client, _collection
# #     if _collection is None:
# #         try:
# #             _db_client = DataAPIClient(token=os.environ["ASTRA_DB_APPLICATION_TOKEN"])
# #             db = _db_client.get_database(os.environ["ASTRA_DB_API_ENDPOINT"])
# #             _collection = db.get_collection("schemes_collection")
# #             logger.info("[DB] ✅ AstraDB collection initialized")
# #         except Exception as e:
# #             logger.error(f"[DB] ❌ Failed to initialize AstraDB: {e}")
# #             raise
# #     return _collection

# # async def get_scheme_context(scheme_id: str, query: str) -> str:
# #     try:
# #         collection = get_db_collection()
# #         cursor = collection.find(
# #             filter={"scheme_id": scheme_id},
# #             sort={"$vectorize": query},
# #             limit=5,
# #             projection={"content": 1}
# #         )
# #         docs = list(cursor)
# #         return "\n\n".join(doc.get("content", "") for doc in docs)
# #     except Exception as e:
# #         logger.error(f"[RAG] ❌ Error: {e}")
# #         return ""

# # # ── Voice Agent Implementation ──────────────────────────────────────────────

# # class VoiceAgent(Agent):
# #     def __init__(self, scheme_id: str, initial_context: str) -> None:
# #         self.scheme_id = scheme_id
        
# #         super().__init__(
# #             instructions=f"""
# #                 You are Yojana Saathi, a friendly voice assistant for {scheme_id}.
# #                 Keep responses SHORT, natural, and conversational.
# #                 Answer ONLY based on the guidelines below.
                
# #                 OFFICIAL GUIDELINES:
# #                 {initial_context}
# #             """,
# #             # Use Saaras v3 for high-accuracy Indian language STT
# #             stt=sarvam.STT(
# #                 language="unknown", 
# #                 model="saaras:v3",
# #                 mode="transcribe"
# #             ),
# #             # Brain of the agent
# #             llm=sarvam.LLM(model="sarvam-30b"),
# #             # Bulbul v3 for natural Indian-accented speech
# #             tts=sarvam.TTS(
# #                 target_language_code="kn-IN",
# #                 model="bulbul:v3",
# #                 speaker="shubh"
# #             ),
# #             # Essential for voice agents to know when to stop/start
# #             vad=silero.VAD.load()
# #         )

# #     async def on_enter(self):
# #         """Called when user joins - agent starts the conversation instantly"""
# #         # Note: self.session is available once started
# #         self.session.generate_reply(
# #             instructions=f"Greet the user as Yojana Saathi for the {self.scheme_id} scheme."
# #         )

# # # ── LiveKit Entrypoint ──────────────────────────────────────────────────────

# # async def entrypoint(ctx: JobContext):
# #     logger.info(f"User connected to room: {ctx.room.name}")
# #     await ctx.connect()
    
# #     # 1. Wait for participant and get scheme_id from metadata
# #     participant = await ctx.wait_for_participant()
# #     scheme_id = "Government Scheme"
# #     try:
# #         meta = json.loads(participant.metadata or "{}")
# #         scheme_id = meta.get("scheme_id", scheme_id)
# #     except: pass

# #     # 2. Fetch initial context BEFORE creating the agent session
# #     # This ensures the agent is 'smart' from the very first word
# #     context = await get_scheme_context(scheme_id, f"overview of {scheme_id}")

# #     # 3. Create and start the session using the Sarvam template pattern
# #     session = AgentSession()
# #     await session.start(
# #         agent=VoiceAgent(scheme_id, context),
# #         room=ctx.room
# #     )
# #     logger.info("🎙️ Agent session started")

# # if __name__ == "__main__":
# #     cli.run_app(WorkerOptions(entrypoint_fnc=entrypoint))


# import json
# import logging
# import os
# from typing import Optional

# from dotenv import load_dotenv
# from livekit.agents import (
#     Agent, 
#     AgentSession, 
#     JobContext, 
#     RunContext, 
#     WorkerOptions, 
#     cli, 
#     function_tool
# )
# from livekit.plugins import openai, sarvam, silero
# from astrapy import DataAPIClient

# # Load environment variables
# load_dotenv(".env.local")

# # Set up logging
# logger = logging.getLogger("yojana-saathi-agent")
# logging.basicConfig(level=logging.INFO)

# # ── AstraDB Global Client ───────────────────────────────────────────────────

# _db_client: Optional[DataAPIClient] = None
# _collection = None

# def get_db_collection():
#     global _db_client, _collection
#     if _collection is None:
#         try:
#             _db_client = DataAPIClient(token=os.environ["ASTRA_DB_APPLICATION_TOKEN"])
#             db = _db_client.get_database(os.environ["ASTRA_DB_API_ENDPOINT"])
#             _collection = db.get_collection("schemes_collection")
#             logger.info("[DB] ✅ AstraDB collection initialized")
#         except Exception as e:
#             logger.error(f"[DB] ❌ Failed to initialize AstraDB: {e}")
#             raise
#     return _collection

# async def get_scheme_context(scheme_id: str, query: str) -> str:
#     try:
#         collection = get_db_collection()
#         cursor = collection.find(
#             filter={"scheme_id": scheme_id},
#             sort={"$vectorize": query},
#             limit=5,
#             projection={"content": 1}
#         )
#         docs = list(cursor)
#         return "\n\n".join(doc.get("content", "") for doc in docs)
#     except Exception as e:
#         logger.error(f"[RAG] ❌ Error: {e}")
#         return ""


# # ── LiveKit Entrypoint ──────────────────────────────────────────────────────

# async def entrypoint(ctx: JobContext):
#     logger.info(f"User connected to room: {ctx.room.name}")
#     await ctx.connect()
    
#     # 1. Wait for participant and get metadata
#     participant = await ctx.wait_for_participant()
#     scheme_id = "Government Scheme"
#     try:
#         meta = json.loads(participant.metadata or "{}")
#         scheme_id = meta.get("scheme_id", scheme_id)
#     except: pass

#     # 2. Fetch initial context
#     initial_context = await get_scheme_context(scheme_id, f"overview of {scheme_id}")

#     # ── NEW v1.0 TOOL DEFINITION ──
#     # Tools are now standard async functions decorated with @function_tool
#     # The first argument must be 'run_ctx: RunContext'
#     @function_tool
#     async def search_scheme_db(run_ctx: RunContext, query: str) -> str:
#         """
#         Search the official government database for specific eligibility, benefits, application processes, and required documents.
        
#         Args:
#             query: The specific question or topic to search for based on what the user asked.
#         """
#         logger.info(f"[TOOL] 🔍 LLM triggered search for: '{query}' in scheme '{scheme_id}'")
#         rag_context = await get_scheme_context(scheme_id, query)
        
#         if not rag_context:
#             return "No specific details found in the official records for this query."
#         return f"Official Information found: {rag_context}"

#     # 3. Initialize the Agent (Brain)
#     agent = Agent(
#         instructions=f"""
#             You are Yojana Saathi, a friendly voice assistant for the {scheme_id} scheme.
#             Keep responses SHORT, natural, and conversational.
            
#             CRITICAL VOICE FORMATTING RULES:
#                 1. NEVER use Markdown formatting.
#                 2. NEVER use asterisks (* or **), hashtags (#), or hyphens (-).
#                 3. NEVER output HTML tags (like <br>, <b>, <i>).
#                 4. Do not use bulleted or numbered lists. Convert all lists into flowing, natural spoken sentences with good modulations and punctuations
#                 5. Your output will be the input for TTS stream.So it is important to have natural spoken sentences with good modulations and punctuations
#                 6. Except for the dates and years, spell out numbers and symbols if needed for speech (e.g., say "percent" instead of "%").
#                 7. Keep responses SHORT and conversational.
            
#             CRITICAL INSTRUCTION: 
#             If the user asks a question that is not covered by the INITIAL GUIDELINES below, 
#             you MUST use the `search_scheme_db` tool to look up the answer before replying.
            
#             INITIAL GUIDELINES:
#             {initial_context}
#         """,
#         tools=[search_scheme_db] # Inject the tool here
#     )

#     # 4. Initialize the Session (Pipeline)
#     session = AgentSession(
#         stt=sarvam.STT(language="unknown", model="saaras:v3", mode="transcribe"),
#         llm=sarvam.LLM(model="sarvam-30b"), 
#         tts=sarvam.TTS(target_language_code="kn-IN", model="bulbul:v3", speaker="shubh"),
#         vad=silero.VAD.load()
#     )

#     # 5. Start the conversation
#     await session.start(agent=agent, room=ctx.room)
#     logger.info("🎙️ Agent session started with Function Calling enabled")
    
#     # Generate the initial greeting
#     await session.generate_reply(
#         instructions=f"Greet the user as Yojana Saathi for the {scheme_id} scheme."
#     )

# if __name__ == "__main__":
#     cli.run_app(WorkerOptions(entrypoint_fnc=entrypoint))

import json
import logging
import os
import sys
import re
from typing import Optional
import asyncio 

from dotenv import load_dotenv
from livekit.agents import (
    Agent, 
    AgentSession, 
    JobContext, 
    RunContext, 
    WorkerOptions, 
    cli, 
    function_tool
)
from livekit.plugins import openai, sarvam, silero

# PRODUCTION UPGRADE: Use the Async client so DB queries don't block the audio stream
from astrapy import DataAPIClient 

# Load environment variables (Local only; Production will inject these directly)
load_dotenv("../.env.local")

# ── 1. Production Logging & Validation ──────────────────────────────────────

logger = logging.getLogger("yojana-saathi-agent")
logging.basicConfig(
    level=logging.INFO,
    format="%(asctime)s - %(levelname)s - %(name)s - %(message)s"
)

REQUIRED_ENV_VARS = [
    "LIVEKIT_URL", "LIVEKIT_API_KEY", "LIVEKIT_API_SECRET", 
    "SARVAM_API_KEY", "ASTRA_DB_API_ENDPOINT", "ASTRA_DB_APPLICATION_TOKEN"
]

for var in REQUIRED_ENV_VARS:
    if not os.getenv(var):
        logger.critical(f"❌ Missing required environment variable: {var}")
        sys.exit(1) # Fail fast in production

# ── 2. Async AstraDB Global Client ──────────────────────────────────────────

_db_client: Optional[DataAPIClient] = None
_collection = None

async def get_db_collection():
    """Gets or initializes the Async AstraDB collection."""
    global _db_client, _collection
    if _collection is None:
        try:
            _db_client = DataAPIClient(token=os.environ["ASTRA_DB_APPLICATION_TOKEN"])
            db = _db_client.get_async_database(os.environ["ASTRA_DB_API_ENDPOINT"])
            _collection = db.get_collection("schemes_collection")
            logger.info("[DB] ✅ Async AstraDB collection initialized")
        except Exception as e:
            logger.error(f"[DB] ❌ Failed to initialize AstraDB: {e}")
            raise
    return _collection

def sanitize_for_tts(text: str) -> str:
    """Removes HTML and Markdown so the TTS engine speaks naturally."""
    if not text:
        return ""
    text = re.sub(r'<[^>]+>', ' ', text)  # Remove HTML tags like <br>
    text = re.sub(r'[*#_`]', '', text)    # Remove markdown formatting
    text = re.sub(r'\s+', ' ', text).strip() # Normalize whitespace
    return text

async def get_scheme_context(scheme_id: str, query: str) -> str:
    """Fetches and sanitizes RAG context from AstraDB."""
    try:
        collection = await get_db_collection()
        # Using async find
        cursor = collection.find(
            filter={"scheme_id": scheme_id},
            sort={"$vectorize": query},
            limit=5,
            projection={"$vectorize": 1}
        )
        
        # In async astrapy, we iterate over an async generator or use to_list()
        docs = await cursor.to_list()
        
        raw_text = "\n\n".join(doc.get("$vectorize", "") for doc in docs)
        return sanitize_for_tts(raw_text)
        
    except Exception as e:
        logger.error(f"[RAG] ❌ Error fetching context: {e}")
        return ""

# ── 3. LiveKit Entrypoint ───────────────────────────────────────────────────




async def entrypoint(ctx: JobContext):
    logger.info(f"User connected to room: {ctx.room.name}")
    await ctx.connect()
    
    # --- NEW: AUTO-DISCONNECT LISTENER ---
    @ctx.room.on("participant_disconnected")
    def on_participant_disconnected(participant):
        logger.info(f"Participant {participant.identity} left the room.")
        
        # If there are no remote participants left, the agent is alone
        if not ctx.room.remote_participants:
            logger.info("Room is empty. Flushing buffers before disconnecting...")
            
            # Create a graceful shutdown task
            async def delayed_disconnect():
                # Give Sarvam 2 seconds to send final text/audio before killing the engine
                await asyncio.sleep(2) 
                await ctx.room.disconnect()
                
            asyncio.create_task(delayed_disconnect())
    # -------------------------------------
    
    try:
        # Wait for participant and parse metadata safely
        participant = await ctx.wait_for_participant()
        scheme_id = "Government Scheme"
        if participant.metadata:
            try:
                meta = json.loads(participant.metadata)
                scheme_id = meta.get("scheme_id", scheme_id)
                logger.info(f"Scheme ID from metadata: {scheme_id}")
            except json.JSONDecodeError:
                logger.warning(f"Invalid JSON metadata for participant {participant.identity}")

        # Fetch initial context asynchronously
        logger.info(f"Fetching initial context for {scheme_id}...")
        initial_context = await get_scheme_context(scheme_id, f"overview of {scheme_id} eligibility and benefits")

        # Define the function tool
        @function_tool
        async def search_scheme_db(run_ctx: RunContext, query: str) -> str:
            """
            Search the official government database for specific eligibility, benefits, application processes, and required documents.
            Args:
                query: The specific question or topic to search for based on what the user asked.
            """
            logger.info(f"[TOOL] 🔍 LLM triggered search for: '{query}'")
            rag_context = await get_scheme_context(scheme_id, query)
            
            if not rag_context:
                return "No specific details found in the official records for this query."
            return f"Official Information found: {rag_context}"

        # Initialize the Agent
        agent = Agent(
            instructions=f"""
                You are Yojana Saathi, a friendly voice assistant for the {scheme_id} scheme.
                Keep responses SHORT, natural, and conversational.
                
                CRITICAL VOICE FORMATTING RULES:
                1. NEVER use Markdown formatting.
                2. NEVER use asterisks (* or **), hashtags (#), or hyphens (-).
                3. NEVER output HTML tags (like <br>, <b>, <i>).
                4. Do not use bulleted or numbered lists. Convert all lists into flowing, natural spoken sentences.
                5. Use natural pauses and punctuation to optimize the TTS output.
                6. Except for dates and years, spell out numbers and symbols (e.g., say "percent" instead of "%").
                
                CRITICAL INSTRUCTION: 
                If the user asks a question that is not explicitly covered by the INITIAL GUIDELINES below, 
                you MUST use the `search_scheme_db` tool to look up the answer.
                Never speak for more than 2 sentences at a time. Summarize the database findings into a maximum of 30 words. Ask a follow-up question immediately.
                
                INITIAL GUIDELINES:
                {initial_context}
            """,
            tools=[search_scheme_db]
        )

        # Initialize the Pipeline
        session = AgentSession(
            stt=sarvam.STT(language="unknown", model="saaras:v3", mode="transcribe"),
            llm=sarvam.LLM(model="sarvam-30b"), 
            tts=sarvam.TTS(target_language_code="kn-IN", model="bulbul:v3", speaker="shubh", pace=0.9),
            vad=silero.VAD.load(
                activation_threshold=0.8,  
                min_speech_duration=0.1,  
                min_silence_duration=1   
            )
        )

        # Start the session
        await session.start(agent=agent, room=ctx.room)
        logger.info(f"🎙️ Agent session fully active for {scheme_id}")
        
        # Trigger greeting
        await session.generate_reply(
            instructions=f"Greet the user as Yojana Saathi for the {scheme_id} scheme and ask how you can help."
        )

    except Exception as e:
        # Production Safety: Disconnect gracefully if the initialization fails
        logger.error(f"❌ Fatal error in entrypoint: {e}", exc_info=True)
        await ctx.room.disconnect()
if __name__ == "__main__":
    cli.run_app(WorkerOptions(entrypoint_fnc=entrypoint))