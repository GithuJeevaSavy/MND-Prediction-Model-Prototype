const express = require('express');
const router = express.Router();
const ScoringData = require('../models/ScoringRegister');

router.get('/', async(req, res) => {

    try {
        const scoring = await ScoringData.find();
        res.json(scoring);
    } catch (err) {
        res.json({ errorMessage: err });
    }

});

//submit a post
router.post('/', async(req, res) => {
    const postScoringData = new ScoringData({
        PatientFirstName: req.body.PatientFirstName,
        PatientLastName: req.body.PatientLastName,

        Patientid: req.body.Patientid,
        Questioner: req.body.Questioner,
        Designation: req.body.Designation,
        QuestionerLocation: req.body.QuestionerLocation,
        Answerer: req.body.Answerer,
        Relation: req.body.Relation,
        Dateofentry: req.body.Dateofentry,
        ALSFRS_1: req.body.ALSFRS_1,
        ALSFRS_2: req.body.ALSFRS_2,
        ALSFRS_3: req.body.ALSFRS_3,
        ALSFRS_4: req.body.ALSFRS_4,
        ALSFRS_5a: req.body.ALSFRS_5a,
        ALSFRS_5b: req.body.ALSFRS_5b,
        ALSFRS_6: req.body.ALSFRS_6,
        ALSFRS_7: req.body.ALSFRS_7,
        ALSFRS_8: req.body.ALSFRS_8,
        ALSFRS_9: req.body.ALSFRS_9,
        ALSFRS_10: req.body.ALSFRS_10,
        ALSFRS_11: req.body.ALSFRS_11,
        ALSFRS_12: req.body.ALSFRS_12,
        Bulbar: req.body.Bulbar,
        Motor: req.body.Motor,
        Respiratory: req.body.Respiratory,
        Total: req.body.Total,
        FVC: req.body.FVC,
        SNIP_O: req.body.SNIP_O,
        SNIP_NO: req.body.SNIP_NO,
        Comments: req.body.Comments
    });
    try {
        const savedScoringData = await postScoringData.save();
        res.json(savedScoringData);
    } catch (err) {
        res.json({ errorMessage: err });
    }

});

router.get('/:postId', async(req, res) => {

    try {
        const patientscore = await ScoringData.find({ Patientid: req.params.postId });
        res.json(patientscore);
    } catch (err) {
        res.json({ errorMessage: err });
    }

});
module.exports = router;