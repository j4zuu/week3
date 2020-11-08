'use strict';
const passport = require('passport');
const Strategy = require('passport-local').Strategy;
const userModel = require('../models/userModel');
const passportJWT = require('../models/userModel')
const JWTStrategy = passportJWT.Strategy
const ExtractJWT = passportJWT.ExtractJwt

// local strategy for username password login
passport.use(new Strategy(
    async (username, password, done) => {
      const params = [username];
      try {
        const [user] = await userModel.getUserLogin(params);
        console.log('Local strategy', user); // result is binary row
        if (user === undefined) {
          return done(null, false, {message: 'Incorrect credentials.'});
        }
        if (user.password !== password) {
          return done(null, false, {message: 'Incorrect credentials.'});
        }
        return done(null, {...user}, {message: 'Logged In Successfully'}); // use spread syntax to create shallow copy to get rid of binary row type
      } catch (err) {
        return done(err);
      }
    }));

passport.use(new JWTStrategy({
  jwtFromRequest : ExtractJWT.fromAuthHeaderAsBearerToken(),
  secretOrKey : 'your_jwt_secret'
},
    async (jwtPayload, done) => {
      try {
        if (jwtPayload === undefined) {
          return done(null, false, {message: 'Logged in successfully'}
          )
        }
        return done(null, false, {message: 'some job'})
      }
      catch (err){
        return done(err)
      }
    }
));


module.exports = passport;