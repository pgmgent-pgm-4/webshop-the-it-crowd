/**
 * Creating Authentication middleware
 */
 import passport from 'passport';
 import passportJWT from 'passport-jwt';
 import dotenv from 'dotenv';
 import Logger from '../utils/Logger.js';
 
 dotenv.config();
 
 const JwtStrategy = passportJWT.Strategy;
 const ExtractJwt = passportJWT.ExtractJwt;
 
 // settings of options for passport jwt
 const jwtOptions = {
   jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
   secretOrKey: process.env.JWT_UNIQUE_KEY
 }
 
 //configuration of passport JWT
 passport.use(new JwtStrategy(jwtOptions, function (jwt_payload, done) {
   try {
     Logger.info(`${jwt_payload.username} is doing a request`);
     return done(null, jwt_payload);
   } catch (error) {
     return done(null, error);
   }
 }));
 
 export default (req, res, next) => {
 
   passport.authenticate('jwt', { session: false }, (error, user, info) => {
       if (error || !user) {
         res.status(401).send(info);
       }
       
       next()

     })(req, res, next)
 }