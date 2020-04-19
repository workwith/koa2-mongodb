/*
 * @Description:
 * @Autor: 吕殿朝
 * @Date: 2020-04-17 22:23:13
 * @LastEditors: 吕殿朝
 * @LastEditTime: 2020-04-19 21:20:58
 */
const JwtStrategy = require("passport-jwt").Strategy,
  ExtractJwt = require("passport-jwt").ExtractJwt,
  keys = require("../config/keys");
const opts = {};
opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
opts.secretOrKey = keys.secretOrkey;
const mongoose = require("mongoose");
const User = mongoose.model("users");
module.exports = (passport) => {
  // console.log(passport);
  passport.use(
    new JwtStrategy(opts, async function (jwt_payload, done) {
      const user = await User.findById(jwt_payload.id);
      if (user) {
        return done(null, user);
      } else {
        return done(null, false);
      }
      // User.findOne({id: jwt_payload.sub}, function(err, user) {
      //     if (err) {
      //         return done(err, false);
      //     }
      //     if (user) {
      //         return done(null, user);
      //     } else {
      //         return done(null, false);
      //         // or you could create a new account
      //     }
      // });
    })
  );
};
