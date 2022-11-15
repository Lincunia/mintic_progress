const express=require('express');
const studentSchema = require("../models/student"); const router=express.Router(); // MÉTODO PARA CREAR
router.post('/student', (req, res)=>{
    const student=studentSchema(req.body);
    student.save()
	.then((data)=>res.json(data))
	.catch((error)=>res.json({message: error}));
});
// MÉTODO PARA LEER
router.get("/student", (req, res) => {
    studentSchema.find()
	.then((data)=>res.json(data))
	.catch((error)=>res.json({message: error}));
});
// Lo mismo pero usando únicamente un ID
router.get("/student/:id", (req, res) => {
    const {id}=req.params;
    studentSchema
	.findById(id)
	.then((data)=>res.json(data))
	.catch((error)=>res.json({message: error}));
});
// MÉTODO PARA ELIMINAR
router.delete("/student/:id", (req, res) => {
    const {id}=req.params;
    studentSchema
	.remove({_id: id})
	.then((data)=>res.json(data))
	.catch((error)=>res.json({message: error}));
});
// MÉTODO PARA ACTUALIZAR
router.put("/student/:id", (req, res) => {
    const {id}=req.params;
    const {idType,
	identity,
	names,
	surnames,
	address,
	email,
	fixedPhone,
	cellphone,
	linkToTheChecking,
	icfesCode,
	doesAFamiliarStudyHere,
	socialLayer,
	publicOrNeighborhoodSchool}=req.body;
    studentSchema
	.updateOne({_id: id}, {$set: { idType,
	    identity,
	    names,
	    surnames,
	    address,
	    email,
	    fixedPhone,
	    cellphone,
	    linkToTheChecking,
	    icfesCode,
	    doesAFamiliarStudyHere,
	    socialLayer,
	    publicOrNeighborhoodSchool
	}})
	.then((data) => res.json(data))
	.catch((error) => res.json({message: error}));
});

module.exports=router;
