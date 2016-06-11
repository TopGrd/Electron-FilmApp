/**
 * UserController
 *
 * @description :: Server-side logic for managing users
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
    login: function(req, res) {
        console.log('reach');
        User.findOne({
            name: req.param('name'),
            password: req.param('password')
        }, function(err, user) {
            if (err) console.log(err);
            if (!user) {
                console.log("密码或用户名错误");
                return res.json({
                    message: 'not allow',
                    login: false
                });
            } else {
                console.log(user);
                //res.redirect('/yaya/1');
                res.json({
                    user: user,
                    login: true
                })
            }

        })
    }
};
