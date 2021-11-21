const express=require("express");
const app=express();
const PORT = process.env.PORT || 3000;
const connectdb=require("./config/db");
connectdb();


app.use("/api/files",require("./routes/files"));
app.use("/files",require("./routes/show"));
app.listen(PORT,(err)=>
{
    console.log("Listening on port : ",PORT);
})