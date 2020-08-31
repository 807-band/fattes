const db = require("../../config/db");

module.exports.progress = async (req, res) => {
   db.execute('SELECT sID, title, class, level, MAX(passed) AS passed '
      + 'FROM Station LEFT JOIN Evaluation '
      + 'ON Evaluation.station=sID AND userID=? '
      + 'GROUP BY sID, title, class, level '
      + 'ORDER BY class, level',
      [req.params.userid],
      function (err, results, fields) {
         if (err) console.log(err);
         res.jsonp(results);
      }
   );
}

module.exports.next = async (req, res) => {
   db.execute('SELECT Station.sID, level, class '
      + 'FROM Evaluation JOIN Station '
      + 'ON Station.sID=Evaluation.station AND Evaluation.passed=true '
      + 'WHERE Evaluation.userID=? '
      + 'ORDER BY class, level',
      [req.params.userid],
      function (err, results, fields) {
         const lastCompleted = results[results.length - 1];
         db.execute('SELECT * FROM Station ORDER BY class, level',
            function(err, results, fields) {
               if(!lastCompleted) {
                  res.jsonp(results[0]);
                  return;
               }
               const i = results.findIndex((station) => station.sID == lastCompleted.sID);
               res.jsonp(results[i+1]);
            }
         );
      }
   );
}
