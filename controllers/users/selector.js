const db = require("../../config/db");

/**
 * User selectors
 */

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

module.exports.getById = async (req, res) => {
   await db.execute(
      'SELECT Users.*, SectionMembers.sectionID, Sections.name AS Section FROM Users '
      + 'JOIN SectionMembers ON Users.userID=SectionMembers.userID '
      + 'JOIN Sections ON SectionMembers.sectionID=Sections.sectionID '
      + 'WHERE Users.userID=?', [req.params.id],
      function(err, results, fields) {
         if(err) console.log(err);
         res.jsonp(results);
      }
   );
}