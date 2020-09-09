const mongoose = require('mongoose');
const ScoringRegister = require('./ScoringRegister');

const PatientSchema = mongoose.Schema({
    FirstName: {
        type: String,
        required: true
    },
    LastName: {
        type: String,
        required: true
    },
    GeneratedID: {
        type: String,
        required: true
    },
    Gender: {
        type: String,
        required: true
    },
    Dateofbirth: {
        // type:Date.now,
        type: String,
        required: true
    },
    Age: {
        type: Number,
        required: true
    },
    Address: {
        type: String,
        required: true
    },
    Street: {
        type: String,
        required: false
    },
    City: {
        type: String,
        required: true
    },
    Postalcode: {
        type: String,
        required: true
    },
    Country: {
        type: String,
        required: true
    },
    Phone1: {
        type: String,
        required: true
    },
    Phone2: {
        type: String,
        required: true
    },
    //Prediction Model Data
    Cohort: {
        type: String,
        required: true
    },
    Date: {
        type: String,
        required: true
    },
    Elescorial: {
        type: String,
        required: true
    },
    Siteofonset: {
        type: String,
        required: true
    },
    Dateofonset: {
        type: String,
        required: true
    },
    Registertype: {
        type: String,
        required: true
    },
    Presenceofdementia: {
        type: String,
        required: true
    },
    C9orf72: {
        type: String,
        required: true
    },

    DateofDiagnosis: {
        type: String,
        required: true
    },
    Dateofdeath: {
        type: String,
        required: false

    },
    Onsettodiagnosis: {
        type: Number,
        required: true
    },
    Onsettodeath: {
        type: Number,
        required: false
    },
    Diagnosistodeath: {
        type: Number,
        required: false
    }
}, { strict: false });

module.exports = mongoose.model('PatientRegister', PatientSchema);