const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const path = require('path');
require('dotenv').config();

const app = express();

app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

const port = process.env.PORT || 4000;
const uri = process.env.ATLAS_URI;

//Routes        
const tasksRoute = require('./routes/tasks');
const userRoute = require('./routes/users');
app.use('/tasks', tasksRoute);
app.use('/user', userRoute);

if (process.env.NODE_ENV === 'production') {
    app.use(express.static('client/build'));

    app.get('*', (req, res) => {
        res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
    });
}


//connect to DB
mongoose.connect(uri, { 
    useNewUrlParser: true,
    useUnifiedTopology: true, 
    useFindAndModify: false, 
    reconnectTries: 30, 
    reconnectInterval: 500
});
const connection = mongoose.connection;
connection.once('open', () => console.log("MongoDB database connection established successfully"));

app.listen(port, () => console.log('Server running'));