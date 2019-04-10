import Router from "koa-router";


const router = new Router();

//请求图书列表
router.get("getbooks", async (ctx) => {
    console.log(1)
    ctx.body = 123;
})

//增加
router.post("/add", async (ctx) => {

    console.log(ctx.request.body)


    ctx.body = 123;
})

export default router.routes();