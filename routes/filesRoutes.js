const express=require('express');
const filesRouter=express.Router();
const { addReport}=require('../controllers/filesController');
const uploadFile=require('../middlewares/filesUpload')




filesRouter.post('/report',uploadFile.single('file'),addReport);


module.exports=filesRouter;