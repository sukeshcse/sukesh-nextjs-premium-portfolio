import { NextResponse } from 'next/server';
import OpenAI from 'openai';
import { chunks, cosine } from '@/lib/store';
const openai=new OpenAI({apiKey:process.env.OPENAI_API_KEY});
export async function POST(req:Request){
 const {question}=await req.json();
 if(!question) return NextResponse.json({error:'Question is required'},{status:400});
 const qEmb=await openai.embeddings.create({model:'text-embedding-3-small',input:question});
 const ranked=chunks.map(c=>({...c,score:cosine(qEmb.data[0].embedding,c.embedding)})).sort((a,b)=>b.score-a.score).slice(0,4);
 const context=ranked.map((c,i)=>`Source ${i+1}: ${c.text}`).join('\n\n');
 const chat=await openai.chat.completions.create({model:'gpt-4o-mini',messages:[{role:'system',content:'Answer only from the provided context. If missing, say you do not know.'},{role:'user',content:`Context:\n${context}\n\nQuestion: ${question}`} ]});
 return NextResponse.json({answer:chat.choices[0].message.content,sources:ranked.map(r=>r.text.slice(0,220))});
}
