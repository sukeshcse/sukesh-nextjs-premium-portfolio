'use client';
import { motion } from 'framer-motion';
export const FadeUp=({children,delay=0,className=''}:{children:React.ReactNode;delay?:number;className?:string})=>(
  <motion.div initial={{opacity:0,y:26}} whileInView={{opacity:1,y:0}} viewport={{once:true,margin:'-80px'}} transition={{duration:.55,delay,ease:'easeOut'}} className={className}>{children}</motion.div>
);
export const Stagger=({children,className=''}:{children:React.ReactNode;className?:string})=>(
  <motion.div initial="hidden" whileInView="show" viewport={{once:true,margin:'-80px'}} variants={{hidden:{},show:{transition:{staggerChildren:.08}}}} className={className}>{children}</motion.div>
);
export const Item=({children,className=''}:{children:React.ReactNode;className?:string})=>(
  <motion.div variants={{hidden:{opacity:0,y:18},show:{opacity:1,y:0,transition:{duration:.45}}}} className={className}>{children}</motion.div>
);
