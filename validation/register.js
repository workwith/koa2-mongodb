/*
 * @Description:
 * @Autor: 吕殿朝
 * @Date: 2020-04-17 23:51:37
 * @LastEditors: 吕殿朝
 * @LastEditTime: 2020-04-18 00:10:44
 */
const Validator = require("validator");
const isEmpty = require("./is-empty");

module.exports = function validataRegisterInput(data) {
  let errors = {};
  if (!Validator.isLength(data.name, { min: 2, max: 30 })) {
    errors.name = "name 长度不能小于2或超过30";
  }
  return {
    errors,
    isValid: isEmpty(errors),
  };
};
