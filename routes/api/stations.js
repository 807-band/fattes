const express = require('express');
const router = express.Router();
const shortid = require("shortid");

const Station = require('../../models/Station');

// GET “/station/” - get all stations
// POST “/station/” - add station
// DELETE “/station/” - delete station
// GET “/station/:id” - get station id
// POST “/station/:id” - add item

router.get('/', async (req, res) => {
   try {
      await Station.scan().exec(function(err, response) {
         if (err) console.log(err);
         else res.jsonp(response);
      });
   } catch (err) {
      console.log(err);
   }
});

router.post('/', async (req, res) => {
   const newStation = new Station({
      id: shortid.generate(), 
      title: req.body.stationName,
   });

   await newStation.save((err, item) => {
      if (err) console.log(err);
      else console.log(newStation.id);
   });
   res.redirect(newStation.id); // may want to change this? 
});

router.delete('/', async (req, res) => {
   Station.get(req.body.stationID).delete((err) => {
      if (err) console.log(err);
   });
   res.redirect('/'); // may want to change this?
});

router.get('/:id', async (req, res) => {
   Station.query("id").eq(req.params.id).exec((err, results) => {
      if (err) console.log(err);
      else {
         res.jsonp(results);
      }
   });
});

router.post('/:id', async (req, res) => {
   // TODO - waiting for react frontend
});

module.exports = router;
