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
<<<<<<< HEAD
    process: function (req, res) {
=======
    process: function(req, res){
>>>>>>> eedc7f85c219ee3c0b400a74d12ec26a698e6a72
        console.log('login' + req.body.userid);
        var bcrypt = require('bcryptjs');
        //console.log(User.findOneByUid(req.body.userid));

        User.findOneByUid(req.body.userid, function (err, user) {
            if (err) res.json({ error: 'DB error' }, 500);
            if (user) {
<<<<<<< HEAD
                //console.log(user);
                bcrypt.compare(req.body.password, user.password, function (err, match) {
                    if (err) {
                        //res.json({ error: 'Server error' }, 500);
                        res.status(500);
                        res.view('authentication/login',
                            { userid: req.body.userid, error: 'Server error' }
                        );
                    }
=======
                console.log(user);
                bcrypt.compare(req.body.password, user.password, function (err, match) {
                    if (err) res.json({ error: 'Server error' }, 500);
>>>>>>> eedc7f85c219ee3c0b400a74d12ec26a698e6a72

                    if (match) {
                        // password match
                        req.session.user = user.id;
<<<<<<< HEAD
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
=======
                        res.json(user);
                    } else {
                        // invalid password
                        if (req.session.user) req.session.user = null;
                        res.json({ error: 'Invalid password' }, 400);
                    }
                });
            } else {
                res.json({ error: 'User not found' }, 404);
>>>>>>> eedc7f85c219ee3c0b400a74d12ec26a698e6a72
            }
        });

    },
<<<<<<< HEAD
    logout: function (req, res) {
        //if (req.session.user) req.session.user = null;
        if (req.session.authenticated) req.session.authenticated = null;
        console.log(req.session.authenticated);//req.logout();
=======
    logout: function (req,res){
        req.logout();
>>>>>>> eedc7f85c219ee3c0b400a74d12ec26a698e6a72
        res.send('logout successful');
    }
};

