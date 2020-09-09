const mongoose = require('mongoose');


const ScoringSchema = mongoose.Schema({

    PatientFirstName: {
        type: String,
        required: true
    },
    PatientLastName: {
        type: String,
        required: true
    },
    Patientid: {
        type: String,
        required: true
    },
    Questioner: {
        type: String,
        required: true
    },
    Designation: {
        type: String,
        required: true
    },
    QuestionerLocation: {
        type: String,
        required: false
    },
    Answerer: {
        type: String,
        required: true
    },
    Relation: {
        type: String,
        required: false
    },
    Dateofentry: {
        type: String,
        required: true
    },
    ALSFRS_1: {
        type: Number,
        required: true
    },
    ALSFRS_2: {
        // type:Date.now,
        type: Number,
        required: true
    },
    ALSFRS_3: {
        type: Number,
        required: true
    },
    ALSFRS_4: {
        type: Number,
        required: true
    },
    ALSFRS_5a: {
        type: Number,
        required: false
    },
    ALSFRS_5b: {
        type: Number,
        required: false
    },
    ALSFRS_6: {
        type: Number,
        required: true
    },
    ALSFRS_7: {
        type: Number,
        required: true
    },
    ALSFRS_8: {
        type: Number,
        required: true
    },
    ALSFRS_9: {
        type: Number,
        required: true
    },
    ALSFRS_10: {
        type: Number,
        required: true
    },
    ALSFRS_11: {
        type: Number,
        required: true
    },
    ALSFRS_12: {
        type: Number,
        required: true
    },
    Bulbar: {
        type: Number,
        required: true
    },
    Motor: {
        type: Number,
        required: true
    },
    Respiratory: {
        type: Number,
        required: true
    },
    Total: {
        type: Number,
        required: true
    },
    FVC: {
        type: Number,
        required: false
    },
    SNIP_O: {
        type: Number,
        required: false
    },
    SNIP_NO: {
        type: Number,
        required: false
    },
    Comments: {
        type: String,
        required: false
    },


});

module.exports = mongoose.model('ScoringRegister', ScoringSchema);