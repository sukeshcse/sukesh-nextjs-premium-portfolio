import type { Metadata } from 'next';
import './globals.css';
export const metadata:Metadata={metadataBase:new URL('https://sukesh-varma-portfolio.vercel.app'),title:'Sukesh Varma | AI-Ready Full Stack Developer',description:'Full Stack Developer focused on AI, RAG, DevOps, React, Node.js, AWS and digital banking platforms.',alternates:{canonical:'/'},openGraph:{title:'Sukesh Varma | AI-Ready Full Stack Developer',description:'Full Stack Developer focused on AI, RAG, DevOps, React, Node.js, AWS and digital banking platforms.',url:'https://sukesh-varma-portfolio.vercel.app',siteName:'Sukesh Varma Portfolio',type:'website'}};
export default function RootLayout({children}:{children:React.ReactNode}){return <html lang="en"><body className="font-sans radial">{children}</body></html>}
