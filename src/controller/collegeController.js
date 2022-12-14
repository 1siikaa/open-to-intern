const collegeModel = require("../models/collegeModel")
const internModel= require('../models/internModel')
const  {isEmpty, isValidName}= require("../validator/validation")


//.....................................Post Api For College  ........................................


const createCollege= async function(req,res){
    try{
   if(Object.keys(req.body).length==0){
   return res.status(400).send({status:false,message:"data is not present"})}

   if(!req.body.name){
      return res.status(400).send({status:false,message:"name is required"})}

   req.body.name=req.body.name.toLowerCase()
   if(!req.body.fullName){
   return res.status(400).send({status:false,message:"fullName is required"})}

   if(!req.body.logoLink){
   return res.status(400).send({status:false,message:"logoLink is required"})}

   if(!isEmpty(req.body.name)){
       return res.status(400).send({status:false,message:"name can't be empty"})}

    if(!isValidName(req.body.name)){
         return res.status(400).send({status:false,message:"please enter valid name"})}

     if(!isEmpty(req.body.fullName)){
        return res.status(400).send({status:false,message:"fullName can't be empty"})}

    if(await collegeModel.findOne({name:req.body.name})){  
      return res.status(400).send({status:false,message:"college is already present "})}

   
   return res.status(201).send({status:true,data:await collegeModel.create(req.body)})}
   catch(error){return res.sendStatus(500)}}

//................................ Get Api for college details with query params ...........................................................


const collegeDetails= async function (req, res){
   try{
       if(req.query.collegeName && Object.keys(req.query).length === 1){
           let checkCollege = await collegeModel.findOne ({ name: req.query.collegeName.toLowerCase()})
           if (!checkCollege) return res.status(404).send({ status: false, message: "collegeName not found"})

           const { name, fullName, logoLink} = checkCollege

           const interns = await internModel.find({ collegeId: checkCollege._id}).select({name: 1,email: 1 , mobile: 1})

           if(interns.length==0) return res.status(404).send({status: false, message: "no intern are there"})

           const data ={ name,fullName, logoLink ,interns}
       
           return res.status(200).send({status: true, count: interns.length, data: data})}

        return res.status(400).send({status: false, message: "Please provide filter and it should be collegeName only"})}
      catch(error){
      return res.sendStatus(500)}}


module.exports.collegeDetails= collegeDetails
module.exports.createCollege=createCollege


 