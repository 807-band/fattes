const db = require("../../config/db");
const bcrypt = require('bcrypt');

/**
 * Admin Operations
 */

module.exports.create = async (req, res) => {
   bcrypt.hash(req.body.password, 10, function (err, hashedPW) {
      if (err) console.log(err);
      db.execute('INSERT INTO Users (username, password, name) VALUES (?, ?, ?)',
         [req.body.username, hashedPW, req.body.name],
         function (err, results, fields) {
            if (err) console.log(err);
            req.body.userID = results.insertId;
            if (req.body.sectionID)
               db.execute('INSERT INTO SectionMembers (userID, sectionID) VALUES (?, ?)',
                  [results.insertId, req.body.sectionID]);
            if (req.body.permission)
               db.execute('INSERT INTO Permissions (userID, permission) VALUES (?, ?)',
                  [results.insertId, req.body.permission]
               );
            res.jsonp(req.body);
         }
      );
   });
}

module.exports.delete = async (req, res) => {
   await db.execute('DELETE FROM Users WHERE userID=?', [req.params.id]);
   res.end();
}