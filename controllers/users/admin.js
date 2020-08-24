const db = require("../../config/db");

/**
 * Admin Operations
 */

module.exports.create = async (req, res) => {
   await db.execute('INSERT INTO Users (username, password, name) VALUES (?, ?, ?)',
      [req.body.username, req.body.password, req.body.name],
      function (err, results, fields) {
         if(err) console.log(err);
         req.body.userID = results.insertId;
         db.execute('INSERT INTO SectionMembers (userID, sectionID) VALUES (?, ?)',
         [results.insertId, req.body.sectionID]);
         res.jsonp(req.body);
      }
   );
}

module.exports.delete = async (req, res) => {
   await db.execute('DELETE FROM Users WHERE userID=?', [req.params.id]);
   res.end();
}