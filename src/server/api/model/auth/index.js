// imports
import express from 'express';
import Logger from '../../lib/Logger.js';
import passport from 'passport';
import passportLocal from 'passport-local';
const LocalStrategy = passportLocal.Strategy;

import CustomerDb from '../customer/CustomerDb.js';
const customerData = new CustomerDb();

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
        const customer = await customerData.findOne(username);
        // check if user is found
        if (!customer) {
            return done(null, false, {message: 'Customer not found in database'})
        }
        // check on valid pass
        if (!await isPasswordValid(password, customer.password)) {
            return done(null, false, { message: 'Password incorrect' })
        }
        // return the existing and authenticated used
        return done(null, customer);
    }
));

app.post('/login', (req, res) => {
    // do authentication
    console.log(req.body);
    passport.authenticate('local', (error, customer, info) => {
        if (error) {
            res.status(401).json(info)
        } else if (!customer) {
            res.status(401).json(info)
        } else {
            const jwtData = {
                id: customer.id,
                username: customer.username,
                email: customer.email,
                type: customer.type
            }
            const token = jwt.sign(jwtData, process.env.JWT_UNIQUE_KEY, {
                expiresIn: parseInt(process.env.JWT_LIFETIME)
            });

            res.status(200).json({
                succes: true,
                token: token,
                customer: {
                    id: customer.id,
                    username: customer.username,
                    email: customer.email,
                    type: customer.type
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

const isPasswordValid = async (customerPassword, dbPassword) => {
    const match = await bcrypt.compare(customerPassword, dbPassword);
    return match
}