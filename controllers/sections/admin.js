const db = require("../../config/db");

/**
 * Admin Operations
 */

module.exports.create = async (req, res) => {
   await db.execute('INSERT INTO Sections (name) VALUES (?)',
      [req.body.name],
      function (err, results, fields) {
         if(err) console.log(err);
         req.body.sectionID = results.insertId;
         res.jsonp(req.body);
      }
   );
}

module.exports.delete = async (req, res) => {
   await db.execute('DELETE FROM Sections WHERE sectionID=?', [req.params.id]);
   res.end();
}