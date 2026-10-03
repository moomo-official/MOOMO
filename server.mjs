import http from "node:http";
import { readFile } from "node:fs/promises";
import { join } from "node:path";
const port = Number(process.env.PORT || 8080);
const root = process.cwd();
http.createServer(async (req,res)=>{
  try{
    const path = (req.url || "/").split("?")[0];
    const file = path === "/" ? "index.html" : path.replace(/^\//,"");
    const body = await readFile(join(root,file));
    const type = file.endsWith(".html") ? "text/html; charset=utf-8" : "application/octet-stream";
    res.writeHead(200,{"content-type":type,"cache-control":"no-cache"});
    res.end(body);
  }catch{res.writeHead(404,{"content-type":"text/plain"});res.end("Not found");}
}).listen(port,"0.0.0.0",()=>console.log("MOOMO listening on "+port));