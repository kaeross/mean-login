'use strict'

const mongoose = require('mongoose')

var Schema = mongoose.Schema;

var UserSchema = new Schema({
    firstName: String,
    lastName: String,
    email: String,
    dOb: Date,
    password: String,
    createdAt: {type: Date, default: Date.now },
    updatedAt: {type: Date, default: Date.now }
})

UserSchema.query.byEmail = function(email) {
    return this.where({ 'email' : email })
}

const User = mongoose.model('User', UserSchema);

module.exports.User = User