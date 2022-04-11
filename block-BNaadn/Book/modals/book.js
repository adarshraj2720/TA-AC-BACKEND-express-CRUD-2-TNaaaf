var mongoose = require('mongoose');
var Schema = mongoose.Schema

var bookSchema = new Schema({
    title:String,
    summary:String,
    pages:Number,
    publication:String,
    coverImage:String,
    authorID:[{type:Schema.Types.ObjectId,ref:"Author"}],
    categoryID:[{type:Schema.Types.ObjectId,ref:"Category"}]
})

var Book = mongoose.model('Book',bookSchema);
module.exports=Book;
