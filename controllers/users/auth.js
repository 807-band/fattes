const passport = require('passport');
const bcrypt = require('bcrypt');
const db = require('../../config/db');

/**
 * User Auth Operations
 */

module.exports.login = async function (req, res, next) {
   passport.authenticate('local', function (err, user, info) {
      if (err) { return next(err); }
      if (!user) { return res.send(info.message); }
      req.logIn(user, function (err) {
         if (err) { return next(err); }
         return res.cookie('currUserID', user.userID).jsonp('success');
      });
   })(req, res, next);
}

module.exports.logout = async (req, res) => {
   res.clearCookie('currUserID').send();
}

module.exports.updatePassword = async (req, res) => {
   bcrypt.hash(req.body.password, 10, function (err, hashedPW) {
      if(err) console.log(err);
      db.execute('UPDATE Users SET password=? WHERE userID=?',
      [hashedPW, req.body.userID]
      );
   });
   res.end();
}