import Router from "koa-router";
const router = new Router();

/**
 * @route GET api/users/test
 */
router.get("/test", async (ctx, next) => {
    ctx.status = 200; 
    ctx.body = {"msg" : "user works"}
})

export default router.routes();

