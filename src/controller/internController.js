const internModel= require('../models/internModel')
const collegeModel = require("../models/collegeModel")
const validation= require("../validator/validation")

const  {isEmpty, isValidName,isValidMobile,isValidEmail} = validation


//..............................Post Api For Internship Application ...........................................................

const applyIntern= async function (req, res){
    try{
        if(Object.keys(req.body).length==0){
            return res.status(400).send({status:false,message:"Please enter the details in request."})
        }
       
        if(!req.body.name){
            return res.status(400).send({status:false,message:"name is required"})
        }
        if(!req.body.email){
            return res.status(400).send({status:false,message:"email is required"})
        }
        if(!req.body.mobile){
            return res.status(400).send({status:false,message:"mobile is required"})
        }
        if(!req.body.collegeName){
            return res.status(400).send({status:false,message:"collegeName is required"})
        }
        req.body.collegeName=req.body.collegeName.toLowerCase()
        req.body.collegeName=req.body.collegeName
        
        if(!isEmpty(req.body.name)){
            return res.status(400).send({status:false,message:"name can't be empty"})
        }
        if(!isEmpty(req.body.email)){
            return res.status(400).send({status:false,message:"eamil  can't be empty"})
        }
        if(!isEmpty(req.body.mobile)){
            return res.status(400).send({status:false,message:"mobile can't be empty"})
        }
        if(!isEmpty(req.body.collegeName)){
            return res.status(400).send({status:false,message:"collegeName  can't be empty"})
        }
        if(!isValidName(req.body.name)){
            return res.status(400).send({status:false,message:"please enter valid name"})
        }
        if(!isValidEmail(req.body.email)){
            return res.status(400).send({status:false,message:"please enter valid email"})
        }
        if(!isValidMobile(req.body.mobile)){
            return res.status(400).send({status:false,message:"please enter valid mobile"})
        }
        
       if(await internModel.findOne({$or:[{email:req.body.email},{mobile:req.body.mobile}]})){
        return res.status(400).send({status:false,message:"intern already exist"})
       }
       let findCollege= await collegeModel.findOne({$or:[{name:req.body.collegeName},{fullName:req.body.collegeName}]},{isDeleted:false})
       if(!findCollege){
        return res.status(404).send({status:false,message:"college not found"})} 
       
       req.body.collegeId=findCollege._id

       return res.status(201).send({status:true,data:await internModel.create(req.body)})}
    catch(error){
        return res.sendStatus(500)}}



module.exports.applyIntern=applyIntern



