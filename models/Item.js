const dynamoose = require('dynamoose');

const ItemSchema = new dynamoose.Schema({
   "title": String,
   "required": Boolean,
});

module.exports = Item = dynamoose.model('item', ItemSchema);
