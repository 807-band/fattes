const dynamoose = require("dynamoose");

const StationSchema = new dynamoose.Schema({
   "id": { "type": String, "required": true },
   "title": { "type": String, "required": true },
   "description": String,
   "rank": String,
   "order": Number,
   "maxFailed": Number,
   "groupings": {
      "type": Array,
      "schema": [{
         "type": Object,
         "schema": {
            // groupings
            "id": { "type": String, "required": true },
            "title": { "type": String, "required": true },
            "order": Number,
            "items": {
               "type": Array,
               "schema": [{
                  "type": Object,
                  "schema": {
                     // items
                     "id": { "type": String, "required": true },
                     "title": { "type": String, "required": true },
                     "isRequired": Boolean,
                     "order": Number
                  }
               }]
            }
         }
      }]
   },
   "information": {
      "type": Array,
      "schema": [{
         "type": Object,
         "schema": {
            "id": { "type": String, "required": true },
            "role": String,
            "info": String,
            "text": String
         }
      }]
   }
});

module.exports = Station = dynamoose.model(process.env.ENVIRONMENT + "-station" , StationSchema);
