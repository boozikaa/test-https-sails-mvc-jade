/**
 * AuthenticationController
 *
 * @description :: Server-side logic for managing Authentications
 * @help        :: See http://links.sailsjs.org/docs/controllers
 */

module.exports = {
    login: function (req, res) {
        console.log('loginnnnnnnn');
        //res.send('login');
        //view: '',
        res.view();
        //res.render('authentication/login', { title: 'login'});
        //res.view();
    },
    process: function (req, res) {
        console.log('login' + req.body.userid);
        var bcrypt = require('bcryptjs');
        //console.log(User.findOneByUid(req.body.userid));

        User.findOneByUid(req.body.userid, function (err, user) {
            if (err) res.json({ error: 'DB error' }, 500);
            if (user) {
                //console.log(user);
                bcrypt.compare(req.body.password, user.password, function (err, match) {
                    if (err) {
                        //res.json({ error: 'Server error' }, 500);
                        res.status(500);
                        res.view('authentication/login',
                            { userid: req.body.userid, error: 'Server error' }
                        );
                    }

                    if (match) {
                        // password match
                        req.session.user = user.id;
                        req.session.authenticated = user;
                        res.ok(user);
                    } else {
                        // invalid password
                        //if (req.session.user) req.session.user = null;
                        if (req.session.authenticated) req.session.authenticated = null;
                        res.status(400);
                        res.view('authentication/login',
                            { userid: req.body.userid,
                                error: 'Invalid password' }
                        );
                    }
                });
            } else {
                res.status(404);
                res.view('authentication/login',
                    { userid: req.body.userid, error: 'User not found' }
                );
            }
        });

    },
    logout: function (req, res) {
        //if (req.session.user) req.session.user = null;
        if (req.session.authenticated) req.session.authenticated = null;
        console.log(req.session.authenticated);//req.logout();
        res.send('logout successful');
    }
};

