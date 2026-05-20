export type Chunk={id:string;text:string;embedding:number[]};
export const chunks:Chunk[]=[];
export function cosine(a:number[],b:number[]){let dot=0,na=0,nb=0;for(let i=0;i<a.length;i++){dot+=a[i]*b[i];na+=a[i]*a[i];nb+=b[i]*b[i];}return dot/(Math.sqrt(na)*Math.sqrt(nb));}
export function splitText(text:string,size=900,overlap=120){const clean=text.replace(/\s+/g,' ').trim();const out:string[]=[];for(let i=0;i<clean.length;i+=size-overlap)out.push(clean.slice(i,i+size));return out.filter(Boolean);}
