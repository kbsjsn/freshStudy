const express = require('express');
const app = express();
const path = require('path');
const PORT = 3000;
const bodyParser = require('body-parser');
const authController = require('./controllers/authController');
const databaseController = require('./controllers/databaseController');

app.use(bodyParser.json());

app.use('/', express.static(path.resolve(__dirname, '../client/assets')));

// // get questions request 
app.get('/questions', databaseController.getQuestions, (req, res) => {
    res.json(res.locals.qsAndAs);
});

// // post answers request
// app.post('/questions', databaseController.postAnswers, (req, res) => {

// });



app.use('*', (req, res, next) => {
    res.status(404).send('File is not found, Route is wrong')
});

app.use((error, req, res, next) => {
    const defaultErr = {
        log: 'Express error handler caught unknown middleware error',
        message: 'Error in server occurred'
    }
    const errorObj = Object.assign(defaultErr, error);
    console.error(defaultErr.log);
    res.status(500).send(errorObj.message)
});

app.listen(PORT, () => {
    console.log(`Listening port ${PORT} ^0^`);
});