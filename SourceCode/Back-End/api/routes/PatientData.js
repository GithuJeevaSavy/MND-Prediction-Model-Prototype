const express = require('express');
const router = express.Router();
const PatientData = require('../models/PatientRegister');
const ScoringData = require('../models/ScoringRegister');
//gets all posts
router.get('/', async(req, res) => {

    try {
        const patients = await PatientData.find();
        res.json(patients);
    } catch (err) {
        res.json({ errorMessage: err });
    }

});

// router.get('/', async(req, res) => {
//     try {
//         await PatientData.find().exec(async(err, docs) => {
//             let transformedDocs = docs.map((doc) => {
//                 return doc.toJSON();
//             });

//             transformedDocs.forEach(async td => {
//                 let scoringData = await ScorindData.find({ Patientid: td._id.toString() });
//                 scoringData = scoringData.map(sc => { return sc.toJSON() });
//                 td.scoringData = scoringData;
//             });

//             res.send(transformedDocs);

//         });
//     } catch (err) {
//         res.json({ message: err });
//     }
// });



//save patient records
//get new id

//create a new json with above patient id

//submit a post
router.post('/', async(req, res) => {
    const postPatientData = new PatientData({
        FirstName: req.body.FirstName,
        LastName: req.body.LastName,
        GeneratedID: req.body.GeneratedID,
        Gender: req.body.Gender,
        Dateofbirth: req.body.Dateofbirth,
        Age: req.body.Age,
        Address: req.body.Address,
        Street: req.body.Street,
        City: req.body.City,
        Postalcode: req.body.Postalcode,
        Country: req.body.Country,
        Phone1: req.body.Phone1,
        Phone2: req.body.Phone2,
        Cohort: req.body.Cohort,
        Date: req.body.Date,
        Registertype: req.body.Registertype,
        Elescorial: req.body.Elescorial,
        Siteofonset: req.body.Siteofonset,
        Dateofonset: req.body.Dateofonset,
        Presenceofdementia: req.body.Presenceofdementia,
        C9orf72: req.body.C9orf72,
        DateofDiagnosis: req.body.DateofDiagnosis,
        Dateofdeath: req.body.Dateofdeath,
        Onsettodiagnosis: req.body.Onsettodiagnosis,
        Onsettodeath: req.body.Onsettodeath,
        Diagnosistodeath: req.body.Diagnosistodeath,
    });

    try {
        const savedPost = await postPatientData.save();
        res.json(savedPost);

    } catch (err) {
        res.json({ errorMessage: err });
    }





});

router.get('/:postId', async(req, res) => {

    try {
        const patient = await PatientData.findById(req.params.postId);
        res.json(patient);
    } catch (err) {
        res.json({ errorMessage: err });
    }

});

router.patch('/:postId', async(req, res) => {

    try {
        const patientdata = await PatientData.updateOne({ _id: req.params.postId }, {
            $set: { Dateofdeath: req.body.Dateofdeath }
        }, );

        res.json(patientdata);
    } catch (err) {
        res.json({ errorMessage: err });
    }

});

module.exports = router;