const shortid = require("shortid");
const Station = require('../../models/Station');

/**
 * Admin Operations
 */

 module.exports.create = async (req, res) => {
   const infoSection = [{
         id: shortid.generate(),
         role: "instructor",
         info: "setup"
      },
      {
         id: shortid.generate(),
         role: "instructor",
         info: "script"
      },
      {
         id: shortid.generate(),
         role: "evaluator",
         info: "setup"
      },
      {
         id: shortid.generate(),
         role: "evaluator",
         info: "script"
      }
   ]
      
   const stationInfo = {
      id: shortid.generate(), 
      title: req.body.title,
      description: req.body.description,
      rank: req.body.rank,
      order: req.body.order,
      information: infoSection,
      groupings: []
   };

   const newStation = new Station(stationInfo);
   await newStation.save((err, item) => {
      if (err) console.log(err);
   });
   res.jsonp(stationInfo);
}

module.exports.updateStation = async (req, res) => {
   try {
      let station = await Station.get(req.params.id);
      if (station === undefined) return res.jsonp({"error": "station not found"});

      for (let item in req.body) {
         if (item === "order" || item === "maxFailed") req.body[item] = Number(req.body[item]);
         station[item] = req.body[item];
      }

      await station.save((err, item) => {
         if (err) console.log(err);
         res.jsonp(item);
      });
   } catch (err) {
      console.log(err);
   }
}

module.exports.updateStationOrder = async (req, res) => {
   Station.update({"id": req.params.id}, {"order": req.body.order}, (err, results) => {
      if (err) console.error(err);
      else res.end();
  });
}

module.exports.delete = async (req, res) => {
   try {
      await Station.delete(req.params.id);
   } catch (err) {
      console.log(err);
   }
   res.end();
}
