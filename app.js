const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const path = require('path');
const cors = require('cors');

const router = express.Router();

const db = require('./config/db.js');
var port = process.env.PORT || 3001;

const stationRoutes = require('./routes/stations.js');
const userRoutes = require('./routes/users.js');
const sectionRoutes = require('./routes/sections.js');
const evalRoutes = require('./routes/evaluations.js');

app.use(cors({ origin: true, credentials: true }));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use('/', router);
app.use('/api/station/', stationRoutes);
app.use('/api/user/', userRoutes);
app.use('/api/section/', sectionRoutes);
app.use('/api/evaluations/', evalRoutes);
app.listen(port, () => console.log(`Server running on port ${port}`));
