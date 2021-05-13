// imports
import express from 'express';
import Logger from '../../lib/Logger.js';
import passport from 'passport';
import passportLocal from 'passport-local';
const LocalStrategy = passportLocal.Strategy;

import UserDb from '../User/index.js';
const userData = new UserDb();

import bcrypt from 'bcrypt';
import dotenv from 'dotenv';
import jwt from 'jsonwebtoken';

dotenv.config()

const app = express.Router();

//configuration of passport.js with local strategy
passport.use(new LocalStrategy({
        usernameField: 'username',
        passwordField: 'password'
    },
    async (username, password, done) => {
        Logger.info(username);

        // get user from db
        const user = await userData.findOne(username);
        // check if user is found
        if (!user) {
            return done(null, false, {message: 'User not found in database'})
        }
        // check on valid pass
        if (!await isPasswordValid(password, user.userpwd)) {
            return done(null, false, { message: 'Password incorrect' })
        }
        // return the existing and authenticated used
        return done(null, user);
    }
));

app.post('/login', (req, res) => {
    // do authentication
    console.log(req.body);
    passport.authenticate('local', (error, user, info) => {
        if (error) {
            res.status(401).json(info)
        } else if (!user) {
            res.status(401).json(info)
        } else {
            const jwtData = {
                id: user.id,
                username: user.username,
                email: user.email,
                type: user.type
            }
            const token = jwt.sign(jwtData, process.env.JWT_UNIQUE_KEY, {
                expiresIn: parseInt(process.env.JWT_LIFETIME)
            });

            res.status(200).json({
                succes: true,
                token: token,
                user: {
                    id: user.id,
                    username: user.username,
                    email: user.email
                }
            });
        }
    })(req, res);
});

app.post('/hashpass', (req, res) => {
    bcrypt.hash(req.body.password, parseInt(process.env.BCRYPT_SALT_ROUND), function (err, hash) {
        res.status(200).send(hash);
    })
});

export default app;

const isPasswordValid = async (userPassword, dbPassword) => {
    const match = await bcrypt.compare(userPassword, dbPassword);
    return match
}