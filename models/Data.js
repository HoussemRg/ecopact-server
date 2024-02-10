const mongoose=require('mongoose');
const Joi=require('joi');

const dataSchema=new mongoose.Schema({
    code:{
        type:String,
        required:true,
        minlegth:6,
        maxlength:6,
        trim:true
    },
    date:{
        type:Date,
        required:true
    },
    NH4:{
        type:Number,
        default:0
    },
    PxOy:{
        type:Number,
        default:0
    },
    ID_Client:{
        type:String,
        required:true,
        minlegth:6,
        maxlength:6,
        trim:true
    }
},{timestamps:true})

const validateData=(obj)=>{
    const schema=Joi.object({
        code:Joi.string().required().min(6).max(6).trim(),
        date:Joi.date().required(),
        NH4:Joi.number(),
        PxOy:Joi.number(),
        ID_Client:Joi.string().required().min(6).max(6).trim(),
    })
    return schema.validate(obj);
}


const Data=mongoose.model("Data",dataSchema);

module.exports={Data,validateData}