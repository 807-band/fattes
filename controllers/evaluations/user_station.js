const db = require("../../config/db");

module.exports.progress = async (req, res) => {
  db.execute('SELECT title, class, level, MAX(passed) '
      + 'FROM Evaluation JOIN Station ON Evaluation.station=sID '
      + 'WHERE userID=? GROUP BY title, class, level '
      + 'ORDER BY class, level',
    [req.params.userid],
    function(err, results, fields) {
      if (err) console.log(err);
      res.jsonp(results);
    }
  );
}

module.exports.next = async (req, res) => {
  res.send();
}
