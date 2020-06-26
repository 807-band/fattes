const express = require('express');
const router = express.Router();

const Station = require('../../models/Station');

// router.get('/test', (req, res) => res.send('station route testing!'));

// GET “/” - home
// POST “/station/:id” - add station
// DELETE “/station/:id” - delete station
// GET “/station/:id” - get station id
// POST “/station/:id/item” - add item

router.get('/', async (req, res) => {
   try {
     await Book.scan().exec(function (err, response) {
        if(err) {
           console.log(err);
        }
        else {
           res.jsonp(response);
        }
     });
  }
  catch (err) {
     console.log(err);
  }
});

router.post('/station/:id', async (req, res) => {

});

router.delete('/station/:id', async (req, res) => {

});

router.get('/station/:id', async (req, res) => {

});

router.post('/station/:id/item', async (req, res) => {

});

module.exports = router;
