const mongoose = require('mongoose');
const prescriptionScheema=new mongoose.Schema({
    "complaints":String,
    "observation":String,
    "advise":String,
    "treatment":String
},{_id:false});

function prescriptionObject(complaints,observation,advise,treatment){
this.complaints=complaints;
this.observation=observation;
this.advise=advise;
this.treatment=treatment;
}

module.exports={prescriptionScheema,prescriptionObject};

