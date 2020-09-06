const express = require('express');
const session = require('express-session');
const cookieParser = require('cookie-parser')
const bodyParser = require('body-parser');
const app = express();
const path = require('path');
var passport = require('passport'), LocalStrategy = require('passport-local').Strategy;
const cors = require('cors');

const router = express.Router();

const db = require('./config/db.js');
var port = process.env.PORT || 3001;

passport.use(new LocalStrategy(
   async function (username, password, done) {
      const promisePool = db.promise();
      const results = await promisePool.query('SELECT * FROM Users '
         + 'WHERE username=?',
         [username]);
      //if (err) { return done(err); }
      if (!results[0][0]) {
         return done(null, false, { message: 'Incorrect username.' });
      }
      if (!(password === results[0][0].password)) {
         return done(null, false, { message: 'Incorrect password.' });
      }
      return done(null, results[0][0]);
   }
));
passport.serializeUser(function (user, done) {
   return done(null, user.userID);
});
passport.deserializeUser(async function (id, done) {
   const promisePool = db.promise();
   const results = await promisePool.query('SELECT * FROM Users '
      + 'WHERE userID=?',
      [id]);
   //if (err) { return done(err); }
   return done(null, results[0][0]);
});

const stationRoutes = require('./routes/stations.js');
const userRoutes = require('./routes/users.js');
const sectionRoutes = require('./routes/sections.js');
const evalRoutes = require('./routes/evaluations.js');
const { runInNewContext } = require('vm');

app.use(cors({ origin: 'http://localhost', credentials: true }));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(express.static('public'));
app.use(cookieParser());
app.use(session({
   secret: "secret",
   resave: false,
   saveUninitialized: false,
   cookie: {
      secure: false,
      httpOnly: true
   }
}));

app.use(function (req, res, next) {

   res.header('Access-Control-Allow-Credentials', true);
   res.header('Access-Control-Allow-Methods', 'GET, PUT, POST, DELETE');
   res.header("Access-Control-Allow-Origin", 'http://localhost');
   res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
   next();
});

app.use(passport.initialize());
app.use(passport.session());

app.use('/', router);
app.use('/api/station/', stationRoutes);
app.use('/api/user/', userRoutes);
app.use('/api/section/', sectionRoutes);
app.use('/api/evaluations/', evalRoutes);

// app.post('/login', 
//    passport.authenticate('local', {
//       successRedirect: 'http://localhost',
//       failureRedirect: 'http://localhost/stations'
//    })
// );

router.post('/login', function (req, res, next) {
   passport.authenticate('local', function (err, user, info) {
      if (err) { return next(err); }
      if (!user) { return res.redirect('http://localhost/stations'); }
      req.logIn(user, function (err) {
         if (err) { return next(err); }
         // req.session.user = user;
         // req.session.cookie.user = user;
         return res.cookie('currUserID', user.userID).send();
      });
   })(req, res, next);
});

router.get('/logout', (req, res) => {
   res.clearCookie('currUserID').send();
})

router.get('/clear', (req, res) => {
   res.clearCookie('foo').send();
})

app.listen(port, () => console.log(`Server running on port ${port}`));
