import type { Metadata } from 'next';
import './globals.css';
export const metadata:Metadata={title:'Sukesh Varma | AI-Ready Full Stack Developer',description:'Full Stack Developer focused on AI, RAG, DevOps, React, Node.js, AWS and digital banking platforms.'};
export default function RootLayout({children}:{children:React.ReactNode}){return <html lang="en"><body className="font-sans radial">{children}</body></html>}
