const asyncHandler=require('express-async-handler');
const xlsx=require('xlsx');
const {Data,validateData}=require('../models/Data');

/**---------------------------------
 * @desc upload new report
 * @route /report
 * @resquest Post
 * @acess public
 ------------------------------------*/
const addReport=asyncHandler(async(req,res)=>{
    if(!req.file){
        return res.status(400).send("no file provided");
     }
     const workbook=xlsx.read(req.file.buffer);
     const sheet = workbook.Sheets[workbook.SheetNames[0]];
     const jsonData = xlsx.utils.sheet_to_json(sheet, { raw: true });
     for(const data of jsonData){
        const {error}=validateData(data);
        if(error) res.status(400).send(`${error.details[0].message} in a field of your data`);
        const timeSerie= new Data({
           code:data.code,
           date:data.date,
           NH4:data.NH4,
           PxOy:data.PxOy,
           ID_Client:data.ID_Client 
        })
        await timeSerie.save();
     }
    res.status(200).send("file uploaded successfully");
})

/**---------------------------------
 * @desc get all data
 * @route /data
 * @resquest GET
 * @acess public
 ------------------------------------*/

 const getAllData=asyncHandler(async (req,res)=>{
    const data=await Data.find();
    res.status(200).send(data);
 })

/**---------------------------------
 * @desc get data of PxOy
 * @route /data/PxOy
 * @resquest GET
 * @acess public
 ------------------------------------*/

 const getPxOyData=asyncHandler(async (req,res)=>{
    const data=await Data.find().select("Date PxOy");
    res.status(200).send(data);
 })
 /**---------------------------------
 * @desc get data of NH4
 * @route /data/NH4
 * @resquest GET
 * @acess public
 ------------------------------------*/

 const getNH4Data=asyncHandler(async (req,res)=>{
    const data=await Data.find().select("Date NH4");
    res.status(200).send(data);
 })

 /**---------------------------------
 * @desc get data by month
 * @route /data/NH4
 * @resquest GET
 * @acess public
 ------------------------------------*/
 const getDataByYear=asyncHandler(async (req,res)=>{
    const data=await Data.find();
    const newData=data.filter(item => item.date.getFullYear() === req.body.year);
    console.log(req.body)
    res.status(200).send(newData);
 })

module.exports={addReport,getAllData,getPxOyData,getNH4Data,getDataByYear};