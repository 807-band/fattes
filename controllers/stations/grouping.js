const shortid = require("shortid");
const Station = require('../../models/Station');

/**
 * Grouping operations
 */

module.exports.createGrouping = async (req, res) => {
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

module.exports.updateGrouping = async (req, res) => {
   try {
      let station = await Station.get(req.params.sid);
      if (station === undefined) return res.jsonp({"error": "station not found"});

      const group = station.groupings.findIndex(g => g.id === req.params.gid);
      if (group === -1) return res.jsonp({"error": "grouping not found"});

      for (let item in req.body) {
         if (item === "order") req.body[item] = Number(req.body[item]);
         station.groupings[group][item] = req.body[item];
      }

      await station.save((err, item) => {
         if (err) console.log(err);
         res.jsonp(item);
      });
   } catch (err) {
      console.log(err);
   }
}

module.exports.deleteGrouping = async (req, res) => {
   try {
      const station = await Station.get(req.params.sid);
      if (station === undefined) return res.jsonp({"error": "station not found"});

      const group = station.groupings.findIndex(g => g.id === req.params.gid);
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
