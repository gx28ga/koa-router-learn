import Koa from "koa";
import Router from "koa-router";
import bodyParser from "koa-bodyparser";
import cors from "koa2-cors";
import util from "util";
import fs from "fs";

import users from './routes/api/users';
import home from "./routes/api/home";
import books from "./routes/api/books";

const app = new Koa();
app.use(bodyParser());




//跨域
app.use(cors({
  origin: function (ctx) {
    return "*"; // 允许来自所有域名请求
    
  },
  exposeHeaders: ['WWW-Authenticate', 'Server-Authorization'],
  maxAge: 5,
  credentials: true,
  allowMethods: ['GET', 'POST'],
  allowHeaders: ['Content-Type', 'Authorization', 'Accept'],
}))

// import initDB from './database/init';
// const connect = initDB.connect;

// (async () => {
//   await connect();
// })();


const router = new Router();



router.get("/", async (ctx) => {

  ctx.body = "hello"
})





// router.use("/api/users", users);

router.use("/api/home", home);
router.use("/api/books", books);

app
  .use(router.routes())
  .use(router.allowedMethods());

const port = process.env.PORT || 9999;
app.listen(port, () => {
  console.log(`http://192.168.1.101:${port}`);
});