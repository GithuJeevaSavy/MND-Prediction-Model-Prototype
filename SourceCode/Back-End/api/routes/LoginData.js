const express = require('express');
const router = express.Router();
const LoginData = require('../models/login');

router.get('/', async(req, res) => {

    try {
        const logginginfo = await LoginData.find();
        // if (logginginfo.UserName == "test" && logginginfo.Password == "mndtest")

        res.json(logginginfo);
    } catch (err) {
        res.json({ errorMessage: err });
    }

});

// router.post('/', async(req, res) => {
//     const postPatientData = new LoginData({
//         UserName: req.body.UserName,
//         Password: req.body.Password,
//     });

//     try {
//         const savedPost = await postPatientData.save();
//         res.json(savedPost);

//     } catch (err) {
//         res.json({ errorMessage: err });
//     }


// });
module.exports = router;