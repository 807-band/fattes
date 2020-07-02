const dynamoose = require('dynamoose');
const Item = require('./Item');

const GroupingSchema = new dynamoose.Schema({
   "title": String,
   "items": {
      "type": Array,
      "schema": [Item]
   }
});

module.exports = Grouping = dynamoose.model('grouping', GroupingSchema);
