/**
 * User.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/#!documentation/models
 */

module.exports = {

    attributes: {
        uid: {
            type: 'STRING',
            required: true,
            unique: true
        },
        password: {
            type: 'STRING',
            required: true
        },
        firstName: 'STRING',
        lastName: 'STRING',
        birthDate: 'DATE',
        phoneNumber: {
            type: 'STRING',
            defaultsTo: '111-222-3333'
        },
        emailAddress: {
            type: 'email',
            unique: true
        }
    },
    beforeCreate: function (attrs, next) {
        var bcrypt = require('bcryptjs');
        bcrypt.genSalt(10, function(err, salt) {
            if (err) return next(err);
            bcrypt.hash(attrs.password, salt, function(err, hash) {
                if (err) return next(err);

                attrs.password = hash;
                next();
            });
        });
    }
};

