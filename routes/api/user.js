/*
 * @Description: d登录接口
 * @Autor: 吕殿朝
 * @Date: 2020-03-22 21:39:42
 * @LastEditors: 吕殿朝
 * @LastEditTime: 2020-04-19 21:15:20
 */
const Router = require("koa-router");
const router = new Router();
const gravatar = require("gravatar");
const bcrypt = require("bcryptjs");
const tools = require("../../config/tools");
const jwt = require("jsonwebtoken");
const keys = require("../../config/keys");
const passport = require("koa-passport");
//引入验证
const validataRegisterInput = require("../../validation/register");

//引入User
const User = require("../../models/Users");

/**
 * @route GET api/users/test
 * @description 测试接口地址
 * @access 接口公开
 */
router.get("/test", async (ctx) => {
  ctx.status = 200;
  ctx.body = { msg: "user works.." };
});
/**
 * @route POST api/users/register
 * @description 注册接口地址
 * @access 接口公开
 */
router.post("/register", async (ctx) => {
  // console.log(ctx.request.body);

  //存储到数据库
  const findResult = await User.find({ email: ctx.request.body.email });
  // console.log(findResult);
  if (findResult.length > 0) {
    //查到邮箱重名
    ctx.stasus = 500;
    ctx.body = { email: "邮箱已被占用" };
  } else {
    // 全球公认头像
    const avatar = gravatar.url(ctx.request.body.email, {
      s: "200",
      r: "pg",
      d: "mm",
    });
    const newUser = new User({
      name: ctx.request.body.name,
      email: ctx.request.body.email,
      avatar,
      password: tools.enbcrypt(ctx.request.body.password),
    });

    // console.log(newUser);
    await newUser
      .save()
      .then((user) => {
        ctx.body = user;
      })
      .catch((err) => {
        // console.log(err);
      });

    //返回json 数据
    ctx.body = newUser;
  }
});

/**
 * @route POST api/users/login
 * @description 登录接口地址 返回token
 * @access 接口公开
 */

router.post("/login", async (ctx) => {
  // 查询
  const findResult = await User.find({ email: ctx.request.body.email });
  const user = findResult[0];
  const password = ctx.request.body.password;
  //判断查到了吗

  if (findResult.length === 0) {
    ctx.status = 404;
    ctx.body = { email: "用户不存在" };
  } else {
    // 查到验证
    const result = await bcrypt.compareSync(password, user.password);

    //验证通过
    if (result) {
      // 返回 token
      const payload = {
        id: user.id,
        name: user.name,
        avatar: user.avatar,
      };
      const token = jwt.sign(payload, keys.secretOrkey, { expiresIn: 3600 });
      ctx.status = 200;
      ctx.body = { success: true, token: "Bearer " + token };
    } else {
      ctx.status = 400;
      ctx.body = { password: "密码错误" };
    }
  }
});

/**
 * @route POST api/users/curren
 * @description 用户信息接口地址 返回token
 * @access 接口私有
 */
router.get(
  "/current",
  passport.authenticate("jwt", { session: false }),
  async (ctx) => {
    // ctx.body = ctx.state.user;
    console.log("111" + ctx.state.user);
    ctx.body = {
      id: ctx.state.user.id,
      name: ctx.state.user.name,
      email: ctx.state.user.email,
      avatar: ctx.state.user.avatar,
    };
  }
);

module.exports = router.routes();
