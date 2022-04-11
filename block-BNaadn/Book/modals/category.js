var mongoose = require('mongoose');
var Schema = mongoose.Schema

var categorySchema = new Schema({
    fiction:String,
    adventure:String,
    technology:String,
    motivation:String
})

var Category = mongoose.model('Category',categorySchema);
module.exports=Category;