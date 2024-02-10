const asyncHandler=require('express-async-handler');

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
    console.log(req.file);
    res.status(200).send("file uploaded successfully");
})

module.exports={addReport};