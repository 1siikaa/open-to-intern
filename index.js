const express= require("express")
const mongoose= require("mongoose")
const route= require("./src/route/route")

const app= express()

app.use(express.json())

mongoose.connect("mongodb+srv://Vashika:Vanshikaa08@cluster0.on6mcgr.mongodb.net/test")
.then(()=>console.log("mongodb is connected"))
.catch(err=>console.log(err))

app.use("/",route)

app.listen(3000,function(){
    console.log("express app is running on this port " + 3000)
})