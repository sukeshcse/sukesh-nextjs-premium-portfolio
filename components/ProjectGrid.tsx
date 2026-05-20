'use client';
import { useEffect, useState } from 'react';
import { Item, Stagger } from './Motion';
type Project={title:string;icon:string;summary:string;tags:string[];category:string;impact:string;links?:{label:string;href:string}[]};
export default function ProjectGrid(){
 const [projects,setProjects]=useState<Project[]>([]); const [filter,setFilter]=useState('All');
 useEffect(()=>{fetch('/api/projects').then(r=>r.json()).then(d=>setProjects(d.projects));},[]);
 const categories=['All',...Array.from(new Set(projects.map(p=>p.category)))];
 const visible=filter==='All'?projects:projects.filter(p=>p.category===filter);
 return <div>
  <div className="mb-8 flex flex-wrap gap-3">{categories.map(c=><button key={c} onClick={()=>setFilter(c)} className={`rounded-full border px-4 py-2 text-sm transition ${filter===c?'border-accent bg-accent text-white':'border-white/10 text-zinc-400 hover:text-white'}`}>{c}</button>)}</div>
  <Stagger className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">{visible.map(p=><Item key={p.title} className="glass card-hover rounded-2xl p-6">
    <div className="mb-4 text-3xl">{p.icon}</div><div className="mb-2 font-syne text-lg font-bold">{p.title}</div>
    <p className="mb-4 text-sm leading-7 text-zinc-400">{p.summary}</p><p className="mb-4 text-xs leading-6 text-zinc-500"><b className="text-zinc-300">Impact:</b> {p.impact}</p>
    <div className="flex flex-wrap gap-2">{p.tags.map(t=><span key={t} className="project-tag rounded-full px-3 py-1 text-xs">{t}</span>)}</div>
  </Item>)}</Stagger>
 </div>
}
