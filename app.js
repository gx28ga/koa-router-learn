import Koa from "koa";
import Router from "koa-router";
import bodyParser from "koa-bodyparser";
import users from './routes/api/users';


const app = new Koa();
app.use(bodyParser());

import initDB from './database/init';
const connect = initDB.connect;

(async () => {
  await connect();
})();


const router = new Router();

router.get("/", async (ctx) => {
  
  ctx.body = { "title": "yes yes yes" };
})

router.use("/api/users", users);

app.use(router.routes()).use(router.allowedMethods());

const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log(`https://192.168.0.107:${port}`);
});