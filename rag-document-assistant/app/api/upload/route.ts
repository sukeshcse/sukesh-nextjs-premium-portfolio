import { NextResponse } from 'next/server';
import OpenAI from 'openai';
import pdf from 'pdf-parse';
import { chunks, splitText } from '@/lib/store';
const openai=new OpenAI({apiKey:process.env.OPENAI_API_KEY});
export async function POST(req:Request){
 const form=await req.formData(); const file=form.get('file') as File | null;
 if(!file) return NextResponse.json({error:'PDF file is required'},{status:400});
 const buffer=Buffer.from(await file.arrayBuffer()); const parsed=await pdf(buffer);
 const parts=splitText(parsed.text); chunks.length=0;
 for(const [i,text] of parts.entries()){
  const emb=await openai.embeddings.create({model:'text-embedding-3-small',input:text});
  chunks.push({id:`chunk-${i+1}`,text,embedding:emb.data[0].embedding});
 }
 return NextResponse.json({message:'Uploaded and indexed',chunks:chunks.length});
}
