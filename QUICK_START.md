# Quick Start: AI Chatbot Setup

Get your chatbot running in 3 minutes!

## Step 1: Get API Keys (2 min)

1. **Astra DB** (Vector Database)
   - Go to https://astra.datastax.com
   - Access your database
   - Copy: Database ID, Region, and Token

2. **Sarvam AI** (LLM)
   - Go to https://www.sarvam.ai/
   - Sign up and create API key
   - Copy API key

## Step 2: Configure Environment (1 min)

Create file: `.env.local`

```env
ASTRA_DB_ID=your_id_here
ASTRA_DB_REGION=us-east-1
ASTRA_DB_TOKEN=AstraCS:your_token_here
SARVAM_API_KEY=your_key_here
```

## Step 3: Test (1 min)

1. Start your dev server: `npm run dev`
2. Go to any scheme page
3. Click "Ask a Question"
4. Ask: "What are the eligibility criteria?"
5. 🎉 See AI respond!

---

## Troubleshooting

**Chatbot not appearing?**
- Check `.env.local` exists
- Restart dev server after adding env vars

**API errors?**
- Verify API keys are correct in `.env.local`
- Check credentials in Astra DB console
- Verify Sarvam AI API key is active

---

**Need detailed setup?** → Read `CHATBOT_SETUP.md`
**Want to customize?** → See `CHATBOT_IMPLEMENTATION.md`
