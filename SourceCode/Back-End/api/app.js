var PORT = process.env.PORT;

const express = require('express');
const app = express();
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');
require('dotenv/config');
require('dotenv').config({ path: 'ENV_FILENAME' });
//Import post routes
const postRoutes = require('./routes/post');
const PatientDataRoute = require('./routes/PatientData');
const ScoringDataRoute = require('./routes/ScoringData');
const LoginDataRoute = require('./routes/LoginData');

//Middleware
app.use(cors());
app.use(bodyParser.json());
app.use('/posts', postRoutes);
app.use('/PatientRegister', PatientDataRoute);
app.use('/ScoringRegister', ScoringDataRoute);
app.use('/LoginRegister', LoginDataRoute);




app.get('/', (req, res) => {
    res.send('Home');
});


//db connection

mongoose.connect('mongodb+srv://test:test1234@cluster0-tky7o.mongodb.net/test', { useNewUrlParser: true, useUnifiedTopology: true }, () => console.log('Connceted to Db'));


app.listen(PORT);