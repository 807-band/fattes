const shortid = require("shortid");
const Station = require('../models/Station');

/**
 * General station operations
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

module.exports.create = async (req, res) => {
   const stationInfo = {
      id: shortid.generate(), 
      title: req.body.title,
      description: req.body.description,
      rank: req.body.rank,
      order: req.body.order,
   };

   const newStation = new Station(stationInfo);
   await newStation.save((err, item) => {
      if (err) console.log(err);
   });
   res.jsonp(stationInfo);
}

/**
 * Station specific operations
 */

module.exports.getById = async (req, res) => {
   Station.query("id").eq(req.params.id).exec((err, results) => {
      if (err) console.log(err);
      else if (results.length === 0) return res.jsonp({"error": "station not found"});
      else res.jsonp(results[0]);
   });
}

//TODO: I probably broke this when I changed rank to String, make sure it works soon
module.exports.updateStation = async (req, res) => {
   try {
      let station = await Station.get(req.params.id);
      if (station === undefined) return res.jsonp({"error": "station not found"});

      for (let item in req.body) {
         if (item === "order" || item === "rank") req.body[item] = Number(req.body[item]);
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

module.exports.delete = async (req, res) => {
   try {
      await Station.delete(req.params.id);
   } catch (err) {
      console.log(err);
   }
   res.end();
}

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

/**
 * Item operations
 */

module.exports.createItem = async (req, res) => {
   const itemInfo = {
      id: shortid.generate(), 
      title: req.body.title,
   };
   
   try {
      let station = await Station.get(req.params.sid);
      if (station === undefined) return res.jsonp({"error": "station not found"});

      const group = station.groupings.findIndex(g => g.id === req.params.gid);
      if (group === -1) return res.jsonp({"error": "grouping not found"});

      if (station.groupings[group].items === undefined) station.groupings[group].items = [];
      itemInfo.order = station.groupings[group].items.length;
      station.groupings[group].items.push(itemInfo);

      await station.save((err, item) => {
         if (err) console.log(err);
         res.jsonp(item);
      });
   } catch (err) {
      console.log(err);
   }
}

module.exports.updateItem = async (req, res) => {
   try {
      let station = await Station.get(req.params.sid);
      if (station === undefined) return res.jsonp({"error": "station not found"});

      const group = station.groupings.findIndex(g => g.id === req.params.gid);
      if (group === -1) return res.jsonp({"error": "grouping not found"});

      const item = station.groupings[group].items.findIndex(item => item.id === req.params.iid);
      if (item === -1) return res.jsonp({"error": "item not found"});

      for (let change in req.body) {
         if (change === "order") req.body[change] = Number(req.body[change]);
         if (change === "isRequired") req.body[change] = (req.body[change] == 'true');
         station.groupings[group].items[item][change] = req.body[change];
      }

      await station.save((err, item) => {
         if (err) console.log(err);
         res.jsonp(item);
      });
   } catch (err) {
      console.log(err);
   }
}
module.exports.deleteItem = async (req, res) => {
   try {
      let station = await Station.get(req.params.sid);
      if (station === undefined) return res.jsonp({"error": "station not found"});

      const group = station.groupings.findIndex(g => g.id === req.params.gid);
      if (group === -1) return res.jsonp({"error": "grouping not found"});

      const item = station.groupings[group].items.findIndex(item => item.id === req.params.iid);
      if (item === -1) return res.jsonp({"error": "item not found"});

      delete station.groupings[group].items[item];
      await station.save((err, item) => {
         if (err) console.log(err);
      });
   } catch (err) {
      console.log(err);
   }
}
