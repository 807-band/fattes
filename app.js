const express = require('express');
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
      if (!results[0][0]) {
         return done(null, false, { message: 'incorrectUsername' });
      }
      if (!(password === results[0][0].password)) {
         return done(null, false, { message: 'incorrectPassword' });
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
   return done(null, results[0][0]);
});

const stationRoutes = require('./routes/stations.js');
const userRoutes = require('./routes/users.js');
const sectionRoutes = require('./routes/sections.js');
const evalRoutes = require('./routes/evaluations.js');
const { runInNewContext } = require('vm');

app.use(cors({ origin: true, credentials: true }));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(express.static('public'));
app.use(cookieParser());

app.use(passport.initialize());

app.use('/', router);
app.use('/api/station/', stationRoutes);
app.use('/api/user/', userRoutes);
app.use('/api/section/', sectionRoutes);
app.use('/api/evaluations/', evalRoutes);

app.listen(port, () => console.log(`Server running on port ${port}`));