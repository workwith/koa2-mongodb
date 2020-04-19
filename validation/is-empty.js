/*
 * @Description:
 * @Autor: 吕殿朝
 * @Date: 2020-04-18 00:05:29
 * @LastEditors: 吕殿朝
 * @LastEditTime: 2020-04-18 00:10:23
 */
const isEmpty = (value) => {
  return (
    value == undefined ||
    value === null ||
    (typeof value === "object" && Object.keys(value).length === 0) ||
    (typeof value === "String" && value.trim().length === 0)
  );
};
module.exports = isEmpty;
