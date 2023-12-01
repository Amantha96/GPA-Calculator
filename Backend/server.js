const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');



const app = express();
app.use(express.json());


//inport routes

const postRoutes = require('./routes/routes');

//app middleware
app.use(bodyParser.json());


app.use('/api', postRoutes);

const PORT = 8080;
const DB_URL = 'mongodb+srv://amantha96:amantha96@gpacluster.rpajrbo.mongodb.net/GPAcalculator?retryWrites=true&w=majority'


mongoose
.connect(DB_URL,{ useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {

        console.log('DB Connected')
    })
    .catch((err) => console.log('DB connection error', err));



app.listen(PORT, () => {

    console.log(`App is running ${PORT}`);
});