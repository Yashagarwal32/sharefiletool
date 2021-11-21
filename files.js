const router=require("express").Router();




const multer=require("multer");

let storage=multer.diskStorage({
    destination:(req,res,cb)=>cb(null,"uploads/"),
    filenmae:(req,file,cb)=>{
        const uniqueName=`${Date.now()}-${Math.round(Math.random()*1E9)}${path.extname(file.originalname)}`;
        cb(null,uniqueName)
    }
})


let upload=multer({
    storage,
    limit:{fileSize:1000000*100}
}).single("myfile");//nameattribute change 
router.post("/",(req,res)=>
{

    if(!req.file){
            return res.json({error : "All fields are required."});
            
    }
    //store file
    upload(req,res,(err)=>
    {
        if(err) return res.status(500).send({error: err.message});
        
    })
    // store to Database

    
});

let 

module.exports=router;
