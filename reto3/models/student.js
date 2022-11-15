const mongoose=require('mongoose');
const studentSchema=mongoose.Schema({
    idType: {
	type: String,
	required: true
    },
    identity: {
	type: Number,
	required: true
    },
    names: {
	type: String,
	required: true
    },
    surnames: {
	type: String,
	required: true
    },
    address: {
	type: String,
	required: true
    },
    email: {
	type: String,
	required: true
    },
    fixedPhone: {
	type: Number,
	required: true
    },
    cellphone: {
	type: Number,
	required: true
    },
    linkToTheChecking: {
	type: String,
	required: true
    },
    icfesCode: {
	type: String,
	required: true
    },
    doesAFamiliarStudyHere: {
	type: Number,
	required: true
    },
    socialLayer: {
	type: Number,
	required: true
    },
    publicOrNeighborhoodSchool: {
	type: Boolean,
	required: true
    }
});

module.exports = mongoose.model('Student', studentSchema);
