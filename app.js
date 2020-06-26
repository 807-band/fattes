const express = require('express');
const app = express();
const router = express.Router();

const connectToDB = require('./config/db.js');

router.get('/', (req, res) => {
   res.send("Hello World!");
});

var port = process.env.PORT || 3000;

connectToDB();
app.use('/', router);
app.listen(port, () => console.log(`Server running on port ${port}`));
