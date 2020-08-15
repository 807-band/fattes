const db = require("../../config/db");

/**
 * Info operations
 */

module.exports.updateInfo = async (req, res) => {
  const packetID = req.params.iid;
  db.execut('UPDATE StationPacket SET content=? WHERE packetID=?',
    [req.body.text, packetID],
    function(err, results, fields) {
      res.jsonp(req.body);
    }
  );
}
