const shortid = require("shortid");
const Station = require('../../models/Station');

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
