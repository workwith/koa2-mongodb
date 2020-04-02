/*
 * @Description:appjs
 * @Autor: 吕殿朝
 * @Date: 2020-03-22 19:30:12
 * @LastEditors: 吕殿朝
 * @LastEditTime: 2020-03-26 22:34:22
 */

const Koa = require("koa");
const Router = require("koa-router");
const mongoose = require("mongoose");
const bodyParser = require("koa-bodyparser");
const passport = require('koa-passport');

const app = new Koa();
const router = new Router();
app.use(bodyParser());

// 引入user.js
const users = require("./routes/api/user");
//路由
router.get("/", async ctx => {
  ctx.body = { msg: "Hell koa" };
});

//连接数据库
const db = require("./config/keys").mongoURI;
mongoose
  .connect(db, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log("数据库连接成功");
  })
  .catch(error => {
    console.log(error);
  });


app.use(passport.initialize())
app.use(passport.session())

//回调到config文件中 passport.js
require("./config/passport")(passport)

// 配置路由地址
router.use("/api/users", users);

//配置路由
app.use(router.routes()).use(router.allowedMethods());

const prot = process.env.PORT || 5000;

app.listen(prot, () => {
  console.log(`server started on ${prot}!`);
});
