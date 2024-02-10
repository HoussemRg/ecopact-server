const multer=require('multer');
const path=require('path');

// File Storage
const fileStorage=multer.diskStorage({
    destination:(req,file,callback)=>{
        callback(null,path.join(__dirname,'../files'))
    },
    filename:(req,file,callback)=>{
        if(file){
            callback(null,new Date().toISOString().replace(/:/g,'-')+ file.originalname);
        } 
        else{
            callback(null,false)
        };
    }
})

//file upload middleware

const uploadFile=multer({
    storage:multer.memoryStorage(),
    fileFilter:(req,file,callback)=>{
        if(file.mimetype ==='application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'){
            callback(null,true);
        } 
        else {
            callback({ message: "Only XLSX files are allowed" })
        }
    },
    limits:{fileSize:30 * 1024 * 1024}
})

module.exports=uploadFile

