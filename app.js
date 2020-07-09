const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const path = require('path');

const router = express.Router();

const connectToDB = require('./config/db.js');

const stationRoutes = require('./routes/stations.js');

router.get('/', (req, res) => {
   res.sendFile(path.join(__dirname+'/frontend/index.html'));
});

var port = process.env.PORT || 3001;

connectToDB();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use('/', router);
app.use('/api/station/', stationRoutes);
app.listen(port, () => console.log(`Server running on port ${port}`));
