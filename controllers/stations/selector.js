const shortid = require("shortid");
const Station = require('../../models/Station');

/**
 * Station selectors
 */

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

module.exports.getAllSorted = async (req, res) => {
   try {
      await Station.scan().attributes(["id", "title", "order", "rank"]).exec(function(err, response) {
         if (err) console.log(err);
         else {
            const beginnerStations = [], advancedStations = []
            response.forEach((station) => {
               if (station.rank == "beginner")
                   beginnerStations.push(station);
               else if (station.rank == "advanced")
                   advancedStations.push(station);
            });
       
            beginnerStations.sort((a, b) => (a.order > b.order) ? 1 : -1);
            advancedStations.sort((a, b) => (a.order > b.order) ? 1 : -1);

            res.jsonp({beginnerStations, advancedStations});
         }
      });
   } catch(err) {
      console.log(err);
   }
}

module.exports.getById = async (req, res) => {
   Station.query("id").eq(req.params.id).exec((err, results) => {
      if (err) console.log(err);
      else if (results.length === 0) return res.jsonp({"error": "station not found"});
      else res.jsonp(results[0]);
   });
}
