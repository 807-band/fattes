const db = require("../../config/db");

module.exports.getAll = async (req, res) => {
   await db.execute('SELECT * FROM Sections', 
      function(err, results, fields) {
         if(err) console.log(err);
         res.jsonp(results);
      }
   );
}

module.exports.getById = async (req, res) => {
   await db.execute('SELECT * FROM Sections WHERE sectionID=?',
      [req.params.id], 
      function(err, results, fields) {
         if(err) console.log(err);
         res.jsonp(results);
      }
   );
}