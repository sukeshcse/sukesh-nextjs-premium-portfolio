# Real RAG Project You Can Build in 1–2 Days

## Project: AI Document Assistant
A document Q&A app where a user uploads a PDF and asks questions. The app answers using the uploaded document as source context.

## Architecture
1. Frontend: Next.js chat UI + PDF upload
2. API: `/api/upload` extracts text and chunks it
3. Embeddings: OpenAI embeddings or local embeddings
4. Vector store: Supabase pgvector, Pinecone, or local memory for demo
5. Chat: retrieve top chunks, send context to LLM, return answer + sources

## MVP Features
- Upload PDF
- Extract text
- Chunk text into 800–1000 character pieces
- Generate embeddings
- Store/retrieve vectors
- Ask question
- Return grounded answer with source snippets

## Recommended Free Deployment
- Portfolio: Vercel
- RAG app frontend/API demo: Vercel
- Vector DB: Supabase free tier with pgvector or Pinecone free tier

## Environment Variables
```env
OPENAI_API_KEY=your_key
```

## Interview Explanation
“I built a RAG-based document assistant. Instead of relying only on the LLM’s training data, I retrieve relevant document chunks using embeddings and vector search, then pass that context to the LLM. This reduces hallucination and makes answers grounded in enterprise data.”
