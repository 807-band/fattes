const passport = require('passport');

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