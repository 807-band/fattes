const db = require("../../config/db");
const { promise } = require("../../config/db");

/**
 * Admin Operations
 */

module.exports.create = async (req, res) => {
   db.execute('INSERT INTO Station (title, description, class) VALUES (?, ?, ?)',
      [req.body.title, req.body.description, req.body.rank],
      function (err, results, fields) {
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
   const to = req.body.order;
   const promisePool = db.promise();
   let station = await promisePool.query('SELECT level, class FROM Station WHERE sID=?', [sID]);
   station = JSON.stringify(station[0][0]);
   station = JSON.parse(station);
   const from = station.level;
   const currClass = station.class;

   // if item moved up
   if (from > to)
      db.promise().execute('UPDATE Station SET level = level + 1 WHERE level >= ? AND level < ? AND class = ?', [to, from, currClass]).then(() => {
         db.execute('UPDATE Station SET level = ? WHERE sID = ?', [to, sID]);
      });
   // if item moved down
   else if (to > from)
      db.promise().execute('UPDATE Station SET level = level - 1 WHERE level > ? AND level <= ? AND class = ?', [from, to, currClass]).then(() => {
         db.execute('UPDATE Station SET level = ? WHERE sID = ?', [to, sID]);
      });
   else
      db.promise().execute('UPDATE Station SET level = ? WHERE sID = ?', [to, sID]);

   res.end();
}

module.exports.delete = async (req, res) => {
   const promisePool = db.promise();
   const sID = req.params.id;

   let dStat = await promisePool.query('SELECT * FROM Station WHERE sID=?', [sID]);
   dStat = dStat[0][0];

   db.promise().execute('UPDATE Station SET level = level - 1 ' +
      'WHERE class=? AND level>?', [dStat.class, dStat.level]).then(() => {
         db.execute('DELETE FROM Station WHERE sID=?', [sID]);
      });
   res.end();
}
