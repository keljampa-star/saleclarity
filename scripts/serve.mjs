import http from 'node:http';
import fs from 'node:fs';
import {DatabaseSync} from 'node:sqlite';
import worker from '../worker/index.js';
fs.mkdirSync('.data',{recursive:true});
const db=new DatabaseSync('.data/usage.sqlite');
if(!db.prepare("SELECT name FROM sqlite_master WHERE type='table' AND name='ai_usage'").get())db.exec(fs.readFileSync(new URL('../migrations/0001_ai_usage.sql',import.meta.url),'utf8'));
const DB={prepare(sql){return{bind(...values){const statement=db.prepare(sql);return{async first(){return statement.get(...values)},async run(){return statement.run(...values)}}}}}};
const port=Number(process.env.PORT||3000);
const server=http.createServer(async(req,res)=>{
 try{
  const chunks=[];let size=0;
  for await(const chunk of req){size+=chunk.length;if(size>20000){res.writeHead(413);res.end('Request too large');return;}chunks.push(chunk)}
  const headers=new Headers();for(const [name,value] of Object.entries(req.headers))if(value!==undefined)headers.set(name,Array.isArray(value)?value.join(','):value);
  // Never trust a caller-supplied client-IP header. A production proxy adapter must
  // obtain its client identity only from a trusted edge, not arbitrary forwarding headers.
  headers.set('CF-Connecting-IP',req.socket.remoteAddress||'local');
  const request=new Request(`http://localhost:${port}${req.url}`,{method:req.method,headers,...(!['GET','HEAD'].includes(req.method)?{body:Buffer.concat(chunks)}:{})});
  const response=await worker.fetch(request,{...process.env,DB});
  res.writeHead(response.status,Object.fromEntries(response.headers));res.end(Buffer.from(await response.arrayBuffer()));
 }catch{res.writeHead(500,{'Content-Type':'text/plain'});res.end('The demo could not complete this request.');}
});
server.listen(port,'127.0.0.1',()=>console.log(`SaleClarity running at http://localhost:${port}. AI requires OPENAI_API_KEY in .dev.vars.`));
