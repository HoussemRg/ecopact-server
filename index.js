const express= require('express');
const cors=require('cors');
const bodyParser=require('body-parser');
const mongoose=require('mongoose');
require('dotenv').config();
const port=process.env.PORT || 3001;
const filesRoute=require('./routes/filesRoutes');
const path=require('path')
const {notFound,errorHandler}=require('./middlewares/errors.js')


const app=express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));
app.use(cors({
    origin:'http://localhost:3000'
}));

app.use(filesRoute)


//not found middleware
app.use(notFound);

//error handler middleware
app.use(errorHandler);

mongoose.connect(process.env.DB_URI).then(
    ()=>{
        app.listen(port,()=>{
            console.log(`connected to database`);
            console.log(`http://localhost:${port}`);
            
        })
    }
).catch((err)=> console.log(err.message));