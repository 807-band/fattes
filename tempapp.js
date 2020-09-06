const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const path = require('path');
const cors = require('cors');
var passport = require('passport'), LocalStrategy = require('passport-local').Strategy;
const flash = require('express-flash');
const session = require('express-session');

const router = express.Router();

const connectToDB = require('./config/db.js');

const stationRoutes = require('./routes/stations.js');
const loginRoute = require('./routes/login.js');

router.get('/', (req, res) => {
   res.sendFile(path.join(__dirname + '/frontend/index.html'));
});

var port = process.env.PORT || 3001;

connectToDB();

passport.use(new LocalStrategy(
   function (username, password, done) {
      User.scan("username").eq(username).exec((err, user) => {
         if (err) { return done(err); }
         if (!user || !(user[0])) {
            return done(null, false, { message: 'Incorrect username.' });
         }
         if (!(password === user[0].password)) {
            return done(null, false, { message: 'Incorrect password.' });
         }
         return done(null, user[0]);
      });
   }
));
passport.serializeUser(function (user, done) {
   return done(null, user.id);
});
passport.deserializeUser(function (id, done) {
   User.query("id").eq(id).exec((err, user) => {
      if (err) { return done(err); }
      return done(null, user[0]);
   });
});

app.use(flash());
app.use(session({
   secret: "secret",
   resave: false,
   saveUninitialized: false,
   cookie: {
      domain: 'localhost'
   }
}));

app.use(passport.initialize());
app.use(passport.session());

app.use(cors({ origin: true, credentials: true }));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use('/', router);
app.use('/api/station/', stationRoutes);
app.use('/login/', loginRoute);
app.listen(port, () => console.log(`Server running on port ${port}`));
