# AI Chatbot Setup Guide

This guide explains how to set up the AI-powered chatbot with RAG (Retrieval Augmented Generation) for scheme-specific queries.

## Overview

The chatbot system consists of two main components:

1. **Vector Database (Astra DB)** - Stores PDF content as vectors with scheme metadata and handles vectorization natively using `nvidia/nv-embedqa-e5-v5`
2. **LLM (Sarvam AI)** - Generates contextual responses based on retrieved documents

## Prerequisites

- Astra DB account with populated scheme PDFs (https://astra.datastax.com)
- Sarvam AI API key (https://www.sarvam.ai/)

## Setup Instructions

### 1. Astra DB Configuration

Your Astra DB instance should already have:
- Database named `govt_schemes` 
- Collection named `schemes_collection` with 768-dimensional vectors
- Pre-populated scheme PDFs with metadata (scheme_id field)

#### Get Credentials:
From Astra DB console:
- Copy your **Database ID** → `ASTRA_DB_ID`
- Note your **Region** → `ASTRA_DB_REGION`
- Generate **Application Token** → `ASTRA_DB_TOKEN`

### 2. Sarvam AI Setup

1. Visit https://www.sarvam.ai/
2. Sign up and get API credentials
3. Copy your API Key → `SARVAM_API_KEY`

**Available Models:**
- `OpenChat-3.5` - General purpose (recommended)
- `Mantra` - Alternative option

### 3. Environment Variables

Create `.env.local` file in project root:

```env
# Astra DB
ASTRA_DB_ID=your-database-id
ASTRA_DB_REGION=us-east-1
ASTRA_DB_TOKEN=AstraCS:xxxxxxxxxxxxx

# Sarvam AI
SARVAM_API_KEY=your-sarvam-api-key
```

## How It Works

### Query Flow:

```
User Query
    ↓
Send Query to Astra DB (with scheme_id filter)
    ↓
Astra DB Vectorizes Query (using nvidia/nv-embedqa-e5-v5)
    ↓
Retrieve Top 3 Relevant Chunks
    ↓
Send to Sarvam AI with Context
    ↓
Generate Response
    ↓
Display in Chatbot
```

### Key Features:

1. **Scheme-Specific Filtering**
   - Uses `scheme_id` to filter vectors
   - Only retrieves context from current scheme
   - Prevents cross-scheme contamination

2. **Native Vectorization**
   - Astra DB handles all embedding computations
   - Uses `nvidia/nv-embedqa-e5-v5` model automatically
   - No external embedding service needed

3. **Vector Matching**
   - Cosine similarity search
   - Finds most relevant content chunks
   - Returns top 3 results

4. **Context-Aware Responses**
   - Sarvam AI uses retrieved context
   - Generates scheme-specific answers
   - Includes confidence indicators

## API Endpoints

### POST `/api/chatbot`

Request:
```json
{
  "query": "What are the eligibility criteria?",
  "schemeId": "Arivu Education Loan Scheme",
  "conversationHistory": []
}
```

Response:
```json
{
  "response": "Based on the scheme guidelines...",
  "context": [
    "chunk 1...",
    "chunk 2...",
    "chunk 3..."
  ]
}
```

## Troubleshooting

### Issue: "Module not found" for react-pdf
**Solution:** Removed in favor of iframe-based PDF viewer

### Issue: Astra DB connection fails
**Solution:** Check:
- Database ID and Region match console
- Token is valid and not expired
- Network allows HTTPS to Astra DB endpoints

### Issue: Sarvam AI rate limits
**Solution:** 
- Check API quota in Sarvam console
- Implement request throttling if needed
- Use caching for repeated queries

## Scheme ID Mapping

The `scheme_id` in vectors must exactly match the PDF filename (without .pdf):

```
Arivu Education Loan Scheme.pdf → scheme_id: "Arivu Education Loan Scheme"
PM awas yojana.pdf → scheme_id: "PM awas yojana"
Karnataka Gruha Jyothi Scheme Guidelines.pdf → scheme_id: "Karnataka Gruha Jyothi Scheme Guidelines"
```

## Performance Optimization

1. **Vector DB Indexing:** Astra DB automatically indexes vectors
2. **Caching:** Consider caching frequent queries
3. **Chunk Size:** PDFs already chunked optimally in Astra DB
4. **Native Vectorization:** Astra DB handles all embedding operations efficiently

## Security Notes

- Keep API keys in `.env.local` (never commit)
- Use HTTPS only for API calls
- Validate user inputs before sending to APIs
- Rate limit chatbot requests server-side

## Next Steps

1. Verify all environment variables are set correctly
2. Test chatbot on a scheme detail page
3. Monitor performance and optimize as needed

For questions, refer to:
- Astra DB Docs: https://docs.datastax.com/en/astra/
- Sarvam AI Docs: https://docs.sarvam.ai/
