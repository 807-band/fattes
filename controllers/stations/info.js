const shortid = require("shortid");
const Station = require('../../models/Station');

/**
 * Info operations
 */

module.exports.updateInfo = async (req, res) => {
   try {
      let station = await Station.get(req.params.sid);
      if (station === undefined) return res.jsonp({"error": "station not found"});

      const infoIndex = station.information.findIndex(i => i.id === req.params.iid);
      if (infoIndex === -1) return res.jsonp({"error": "information group not found"});

      station.information[infoIndex].text = req.body["text"];

      await station.save((err, item) => {
         if (err) console.log(err);
         res.jsonp(item);
      });
   } catch (err) {
      console.log(err);
   }
}
