const shortid = require("shortid");
const Station = require('../models/Station');

module.exports.getAll = async (req, res) => {
   try {
      await Station.scan().exec(function(err, response) {
         if (err) console.log(err);
         else res.jsonp(response);
      });
   } catch (err) {
      console.log(err);
   }
}

module.exports.post = async (req, res) => {
   const stationInfo = {
      id: shortid.generate(), 
      title: req.body.title,
   };

   const newStation = new Station(stationInfo);
   await newStation.save((err, item) => {
      if (err) console.log(err);
   });
   res.jsonp(stationInfo);
}

module.exports.delete = async (req, res) => {
   try {
      await Station.delete(req.body.id);
   } catch (err) {
      console.log(err);
   }
   res.end();
}

module.exports.getById = async (req, res) => {
   Station.query("id").eq(req.params.id).exec((err, results) => {
      if (err) console.log(err);
      else if (results.length === 0) return res.jsonp({"error": "station not found"});
      else res.jsonp(results[0]);
   });
}

module.exports.putById = async (req, res) => {
   try {
      let station = await Station.get(req.params.id);
      if (station === undefined) return res.jsonp({"error": "station not found"});
      for (let item in req.body)
         station[item] = req.body[item];

      await station.save((err, item) => {
         if (err) console.log(err);
         res.jsonp(item);
      });
   } catch (err) {
      console.log(err);
   }
}

module.exports.postGrouping = async (req, res) => {
   const groupingInfo = {
      id: shortid.generate(), 
      title: req.body.title,
   };
   
   try {
      let station = await Station.get(req.params.id);
      if (station === undefined) return res.jsonp({"error": "station not found"});
      if (station.groupings === undefined) station.groupings = [];
      groupingInfo.order = station.groupings.length;
      station.groupings.push(groupingInfo);
      await station.save((err, item) => {
         if (err) console.log(err);
      });

      res.jsonp(groupingInfo);
   } catch (err) {
      console.log(err);
   }
}

module.exports.deleteGrouping = async (req, res) => {
   try {
      const station = await Station.get(req.params.id);
      if (station === undefined) return res.jsonp({"error": "station not found"});

      const group = station.groupings.findIndex(g => g.id === req.body.groupID);
      if (group === -1) return res.jsonp({"error": "grouping not found"});
      delete station.groupings[group];
      await station.save((err, item) => {
         if (err) console.log(err);
      });
   } catch (err) {
      console.log(err);
   }
   res.end();
}
