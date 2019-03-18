import Router from "koa-router";
import bcrypt from "bcryptjs";
import gravatar from "gravatar";

const router = new Router();

//引入User
import User from "./../../models/User";

import tools from "./../../config/tools";
import { Mongoose } from "mongoose";



/**
 * @route GET api/users/test
 * @desc 测试接口地址
 * @access 接口是公开的
 */
router.get("/test", async (ctx, next) => {
  ctx.status = 200;
  ctx.body = { "msg": "user works" }
})

/**
 * @route GET api/users/register
 * @desc 注册接口地址
 * @access 接口是公开的
 */

router.post("/register", async (ctx, next) => {
  

  //存储到数据库
  const queryRes = await User.find({ email: ctx.request.body.email });
  if (queryRes.length > 0) {//查到记录
    ctx.status = 500;
    ctx.body = { "email": "邮箱已经被占用" }
  } else {
    const avatar = gravatar.url(ctx.request.body.email, { s: "200", r: "pg", d: "mm" })

    const user = new User({ //创建新用户
      name: ctx.request.body.name,
      email: ctx.request.body.email,
      avatar,
      password: tools.enbcrypt(ctx.request.body.password)
    })


    await user
      .save()
      .then(user => {
        ctx.body = user;
      }).catch(err => {
        console.log(err);
      })
  }


})

/**
 * @route GET api/users/login
 * @desc 登录接口地址 返回token
 * @access 接口是公开的
 */

router.post("/login", async (ctx, next) => {
  

  
  console.log(ctx.request.body)
  const queryRes = await User.find({ email: ctx.request.body.email });
  const pwd = ctx.request.body.password;

  let user = null;

  if (queryRes.length) {


    user = queryRes[0]
    let result = await bcrypt.compareSync(pwd, user.password);
    if (result) {
      ctx.status = 200;
      ctx.body = { "success": true }
    } else {
      ctx.staus = 400;
      ctx.body = { "password:": "密码错误" }
    }

  } else {
    ctx.status = 404;
    ctx.body = { "email": "用户不存在" }
  }
})

export default router.routes();

