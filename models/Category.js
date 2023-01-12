const mongoose=require('mongoose')

const CategorySchema=new mongoose.Schema({
    category:{type:String,required:true,maxlength:50,trim:true,unique:true},
},{timestamps:true})

module.exports=mongoose.model('categories',CategorySchema)