const express=require('express');
const filesRouter=express.Router();
const { addReport, getAllData, getPxOyData, getNH4Data, getDataByYear}=require('../controllers/filesController');
const uploadFile=require('../middlewares/filesUpload')




filesRouter.post('/report',uploadFile.single('file'),addReport);

filesRouter.get('/data',getAllData);

filesRouter.get('/data/PxOy',getPxOyData);

filesRouter.get('/data/NH4',getNH4Data);

filesRouter.get('/data/data-year',getDataByYear);


module.exports=filesRouter;