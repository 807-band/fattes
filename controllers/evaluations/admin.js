const db = require("../../config/db");

module.exports.submit = async (req, res) => {
   const passed = isPassed(req.body.itemMap, req.body.maxFailed);
   db.execute('INSERT INTO Evaluation (userID, evaluatorID, station, passed) '
      + 'VALUES (?, ?, ?, ?)',
      [req.params.userid, req.body.evaluatorid, req.params.stationid, passed]
   );
   res.end();
}

// TODO: check if required items are failed
function isPassed(itemMap, maxFailed) {
   var numFailed = 0;
   for(key in itemMap) {
      if(!itemMap[key])
         numFailed++;
   }
   return numFailed <= maxFailed;
}