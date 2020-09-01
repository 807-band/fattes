const db = require("../../config/db");

module.exports.submit = async (req, res) => {
   const passed = await isPassed(req.body.itemMap, req.body.maxFailed);
   db.execute('INSERT INTO Evaluation (userID, evaluatorID, station, passed) '
      + 'VALUES (?, ?, ?, ?)',
      [req.params.userid, req.body.evaluatorid, req.params.stationid, passed],
      function(err, results, fields) {
         if(err) console.log(err);
         for(key in req.body.itemMap) {
            db.execute('INSERT INTO EvaluationItems (evalID, itemID, status) '
               + 'VALUES (?, ?, ?)',
               [results.insertId, key, req.body.itemMap[key]]
            );
         }
      }
   );
   res.end();
}

async function isPassed(itemMap, maxFailed) {
   const promisePool = db.promise();
   var numFailed = 0;
   for(key in itemMap) {
      if(!itemMap[key]) {
         numFailed++;
         if(numFailed > maxFailed) return false;
         let dStat = await promisePool.query('SELECT required FROM StationItem WHERE itemID=?',
            [key]
         );
         if(dStat[0][0].required) return false;
      }
   }
   return numFailed <= maxFailed;
}