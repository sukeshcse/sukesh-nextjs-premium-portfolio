import type { Config } from 'tailwindcss';
const config: Config = {content:['./app/**/*.{ts,tsx}','./components/**/*.{ts,tsx}'],theme:{extend:{fontFamily:{syne:['Syne','Avenir Next','Segoe UI','sans-serif'],sans:['DM Sans','Inter','Avenir Next','Segoe UI','sans-serif']},colors:{bg:'#0a0a0f',surface:'#12121a',surface2:'#1a1a26',accent:'#6C63FF',accent2:'#00D4AA'}}},plugins:[]};
export default config;
