const db = require("../../config/db");

module.exports.getAll = async (req, res) => {
  await db.execute(
    'SELECT Users.*, SectionMembers.sectionID, Sections.name AS Section FROM Users '
      + 'JOIN SectionMembers ON Users.userID=SectionMembers.userID '
      + 'JOIN Sections ON SectionMembers.sectionID=Sections.sectionID '
      + 'ORDER BY sectionID',
    function(err, results, fields) {
      if (err) console.log(err);
      res.jsonp(results);
    }
  );
}

module.exports.getAllSections = async (req, res) => {
   await db.execute('SELECT * FROM Sections', 
      function(err, results, fields) {
         if(err) console.log(err);
         res.jsonp(results);
      }
   );
}