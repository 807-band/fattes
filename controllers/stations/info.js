const db = require("../../config/db");

/**
 * Info operations
 */

module.exports.updateInfo = async (req, res) => {
  const packetID = req.params.iid;
  console.log(packetID)
  db.execute('UPDATE StationPacket SET content=? WHERE packetID=?',
    [req.body.text, packetID],
    function(err, results, fields) {
      res.jsonp(req.body);
    }
  );
}
