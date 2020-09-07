const db = require("../../config/db");

/**
 * Info operations
 */

module.exports.updateInfo = async (req, res) => {
  const packetID = req.params.iid;
  db.execute('UPDATE StationPacket SET content=? WHERE packetID=?',
    [req.body.text, packetID],
    function(err, results, fields) {
      res.jsonp(req.body);
    }
  );
}

module.exports.addInfoCard = async (req, res) => {
  db.execute('INSERT INTO StationPacket (stationID, role, info) VALUES (?, ?, ?)',
    [req.params.sid, req.params.role, req.params.info],
    function(err, results, fields) {
      res.jsonp({'packetID': results.insertId, 'content': ''});
    }
  );
}
