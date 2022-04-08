var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var articelSchema = new Schema({
    title:String,
    description:String,
    tags:[String],
    author:String,
    likes:{type: Number,default:0}
},{timestamps:true})

var Articel = mongoose.model('Artcel',articelSchema);
module.exports= Articel;