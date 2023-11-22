const express = require('express')

const mongoose = require('mongoose')

const categories = require("./routes/categories")

const students = require('./routes/students')

const courses = require('./routes/courses')

const app = express()


mongoose.connect('mongodb://127.0.0.1/TestDataBase')
    .then(() => console.log('Connection is successful to DataBase'))
    .catch(err => console.log('Couldnt connect to mongodb', err))


app.use(express.json());

app.use('/api/categories', categories)

app.use('/api/students', students)

app.use('/api/courses', courses)

const port = process.env.PORT || 3000;

app.listen(port, () => console.log(`Listening on port ${port}...`));
