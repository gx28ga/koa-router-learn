import Router from "koa-router";
import util from "util";
import fs from "fs";

const router = new Router();
router.get("/slides", async (ctx) => {

    ctx.body = [
      "https://t1.picb.cc/uploads/2019/04/10/VTe9hG.jpg",
      "https://t1.picb.cc/uploads/2019/04/10/VTeRKg.jpg",
      "https://t1.picb.cc/uploads/2019/04/10/VTeswj.jpg",
      "https://t1.picb.cc/uploads/2019/04/10/VTeLLy.jpg",
      "https://t1.picb.cc/uploads/2019/04/10/VTePb8.jpg",
      "https://t1.picb.cc/uploads/2019/04/10/VTeTeX.jpg",
    ]
  })
  
  
  
  router.get("/hot", async (ctx) =>{
      const readAsync=util.promisify(fs.readFile);
      ctx.body=await readAsync("./static/book.json",{encoding:"utf8"}); 
      
      
  })

  
  export default router.routes();
  