# Adding Scripts to package.json

Add these useful scripts to your `package.json` for easier development:

```json
{
  "scripts": {
    "dev": "next dev",
    "build": "next build",
    "start": "next start",
    "lint": "next lint",
    "populate-vectors": "python scripts/populate_vectors.py",
    "populate-vectors:watch": "nodemon --exec python scripts/populate_vectors.py --watch public/schemes"
  }
}
```

## Usage

### Start Development Server
```bash
npm run dev
```

### Populate Vector Database
```bash
npm run populate-vectors
```

### Re-populate on PDF Changes (Watch Mode)
```bash
npm run populate-vectors:watch
```
(Requires `nodemon`: `npm install --save-dev nodemon`)

## Script Guide

| Command | Purpose | Time |
|---------|---------|------|
| `npm run dev` | Start dev server | Instant |
| `npm run build` | Build for production | 2-3 min |
| `npm run start` | Run production build | Instant |
| `npm run lint` | Find code issues | 1-2 min |
| `npm run populate-vectors` | Load PDFs to Astra DB | 5-15 min ⏱️ |
| `npm run populate-vectors:watch` | Auto re-populate on changes | Continuous |

## First Time Setup

```bash
# 1. Install dependencies
npm install

# 2. Create .env.local with API keys
cp .env.local.example .env.local
# Edit .env.local and add your keys

# 3. Populate vector database
npm run populate-vectors

# 4. Start development server
npm run dev

# 5. Visit http://localhost:3000
```

## Continuous Development

After initial setup:

```bash
# Terminal 1: Dev server
npm run dev

# Terminal 2: Watch for PDF changes (optional)
npm run populate-vectors:watch

# Terminal 3: Linting (optional)
npm run lint
```

---

**Customization**: Edit `scripts` section in `package.json` to add more helpful commands!
