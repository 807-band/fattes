const express = require('express');
const router = express.Router();
const shortid = require("shortid");

const Station = require('../../models/Station');

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
   const stationInfo = {
      id: shortid.generate(), 
      title: req.body.stationName,
   };

   const newStation = new Station(stationInfo);

   await newStation.save((err, item) => {
      if (err) console.log(err);
   });
   res.jsonp(stationInfo);
});

router.delete('/', async (req, res) => {
   try {
      await Station.delete(req.body.stationID);
   } catch (err) {
      console.log(err);
   }
   res.end();
});

router.get('/:id', async (req, res) => {
   Station.query("id").eq(req.params.id).exec((err, results) => {
      if (err) console.log(err);
      else if (results.length === 0) res.jsonp({"error": "station not found"});
      else res.jsonp(results[0]);
   });
});

router.post('/:id', async (req, res) => {
   // TODO - waiting for new station model
});

module.exports = router;
