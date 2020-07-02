const dynamoose = require("dynamoose");
const Grouping = require('./Grouping');

const StationSchema = new dynamoose.Schema({
   "id": {
      "type": String,
      "required": true,
   },
   "title": {
      "type": String,
      "required": true,
   },
   "description": {
      "type": String,
   },
   "number": {
      "type": Number,
   },
   "level": {
      "type": Number,
   },
   "groupings": {
      "type": Array,
      "schema": [Grouping],
   }
});

module.exports = Station = dynamoose.model('station', StationSchema);
