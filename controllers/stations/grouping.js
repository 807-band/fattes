const db = require("../../config/db");

/**
 * Grouping operations
 */

module.exports.createGrouping = async (req, res) => {
  db.execute('INSERT INTO StationGroup (stationID, title) VALUES (?, ?)',
    [req.params.id, req.body.title],
    function(err, results, fields) {
      req.body.gID = results.insertId;
      res.jsonp(req.body);
    }
  );
}

module.exports.updateGrouping = async (req, res) => {
}

module.exports.deleteGrouping = async (req, res) => {
}
