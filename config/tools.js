/*
 * @Description: t0ols
 * @Autor: 吕殿朝
 * @Date: 2020-03-23 22:10:12
 * @LastEditors: 吕殿朝
 * @LastEditTime: 2020-03-23 22:17:15
 */

const bcrypt = require("bcryptjs");

const tools = {
  enbcrypt(password) {
    const salt = bcrypt.genSaltSync(10),
      hash = bcrypt.hashSync(password, salt);
    return hash;
  }
};
module.exports = tools;
