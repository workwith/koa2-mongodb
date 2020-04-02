/*
 * @Description: 模型
 * @Autor: 吕殿朝
 * @Date: 2020-03-22 21:53:53
 * @LastEditors: 吕殿朝
 * @LastEditTime: 2020-03-23 21:45:35
 */
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

//实例化数据模板
const UserScheam = new Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  avatar: {
    type: String
  },
  date: {
    type: Date,
    default: Date.now
  }
});

module.exports = User = mongoose.model("users", UserScheam);
