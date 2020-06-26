const dynamoose = require("dynamoose");

const StationSchema = new dynamoose.Schema({
   "id": String,
   "title": {
      "type": String,
      "required": true,
   },
   "description": {
      "type": String,
      "required": true,
   },
   "groupings": {
      "type": Array,
      "schema": [{
         "type": Object,
         // schema for a single grouping
         "schema": {
            "title": String,
            "items": {
               "type": Array,
               "schema": [{
                  "type": Object,
                  // schema for a single item
                  "schema": {
                     "title": String,
                     "required": Boolean,
                  }
               }]
            }
         }
      }]
   }
});

module.exports = Station = dynamoose.model('station', StationSchema);
