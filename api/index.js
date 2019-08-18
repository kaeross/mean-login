'use strict'

const express = require('express');
const User = require('../database/models').User;
const router = express.Router();
const bcrypt = require('bcrypt');
const saltRounds = 10;

router.post('/api/login', (req, res, next) => {
    const email = req.body.email.toLowerCase()
    const password = req.body.password;

    // Get user by email
    User.findOne().byEmail(email).exec(function (err, user) {
        if (err) return next(err)
        if (!user) {
            return res.send({ 
                newUser: true,
                loggedIn: false
             })
        } else {
            // Check password matches
            bcrypt
                .compare(password, user.password)
                .then(passwordMatch => {
                    // If password matches, log user in
                    if (passwordMatch) {
                        return res.send({ 
                            newUser: false,
                            passwordMatch: true,
                            loggedIn: true
                         })
                    } else {
                        return res.send({ 
                            newUser: false,
                            passwordMatch: false,
                            loggedIn: false
                         })
                    }
                })
                .catch(err => console.error(err.message));
        }
    });
});

router.post('/api/register', (req, res, next) => {
    const _req = req.body;
    // Check if user exists
    User.findOne().byEmail(_req.email.toLowerCase()).exec(function (err, user) {
        if (err) return next(err)
        if (!user) {
            // Create new user in database
            bcrypt
                .hash(_req.password, saltRounds)
                .then(hash => {
                    const user = new User({
                        firstName: _req.firstName,
                        lastName: _req.lastName,
                        email: _req.email.toLowerCase(),
                        dOb: _req.dOb,
                        password: hash
                    })

                    User.create(user, function (err, doc) {
                        if (err) {
                            return console.error(err)
                        }
                        console.log(doc)
                    })


                    // Store user session
                    return res.send({ 
                        newUser: true,
                        loggedIn: true
                     })
                })
                .catch(err => console.error(err.message));

        } else {
            return res.send({ 
                newUser: false,
                loggedIn: false
             })
        }
    })
});

module.exports = router