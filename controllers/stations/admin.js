const shortid = require("shortid");
const db = require("../../config/db");

/**
 * Admin Operations
 */

module.exports.create = async (req, res) => {
  db.execute('INSERT INTO Station (title, description, class) VALUES (?, ?, ?)',
    [req.body.title, req.body.description, req.body.rank],
    function(err, results, fields) {
      req.body.sID = results.insertId;
      res.jsonp(req.body);
    }
  );
}

module.exports.updateStation = async (req, res) => {
  const sID = req.params.id;
  let updates = "";

  // using ? notation is not ideal for variable length updates
  for (key in req.body) updates += key + "='" + req.body[key] + "', ";
  updates = updates.slice(0, -2);

  let SQL = `UPDATE Station SET ${updates} WHERE sID=${sID}`;
  db.execute(SQL);

  res.end();
}

module.exports.updateStationOrder = async (req, res) => {
  const sID = req.params.id;
  const newLoc = req.body.order;

  db.promise().execute('UPDATE Station SET level = level + 1 WHERE level >= ?',
    [newLoc]).then(() => {
      db.execute('UPDATE Station SET level = ? WHERE sID = ?', [newLoc, sID]);
    });

  res.end();
}

module.exports.delete = async (req, res) => {
  const promisePool = db.promise();
  const sID = req.params.id;

  let dStat = await promisePool.query('SELECT * FROM Station WHERE sID=?', [sID]);
  dStat = dStat[0][0];
  console.log(dStat, dStat.class);

  db.promise().execute('UPDATE Station SET level = level - 1 ' +
    'WHERE class=? AND level>?', [dStat.class, dStat.level]).then(() => {
      db.execute('DELETE FROM Station WHERE sID=?', [sID]);
    });
  res.end();
}
