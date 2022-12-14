const express = require('express')
const router= express.Router()
const collegeController= require('../controller/collegeController')
const internController= require('../controller/internController')


//.......................................... Post Api For College Entry ........................................................


router.post('/functionup/colleges', collegeController.createCollege)


//.......................................... Post Api For Intern Entry ........................................................


router.post('/functionup/interns', internController.applyIntern)


//.......................................... Get Api For College Details ........................................................


router.get('/functionup/collegeDetails', collegeController.collegeDetails)




module.exports= router