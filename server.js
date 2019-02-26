const express = require('express');
const path = require('path');
const cors = require('cors')
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const app = express();
const port = process.env.PORT || 3001;
const dbURI = process.env.MONGODB_URI || 'mongodb://localhost/speeches'

const { Speech } = require('./models');
const { createSpeech, getSpeech } = require('./routeHandlers')


mongoose.connect(dbURI, {useNewUrlParser: true});

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'))
db.once('open', onDBConnected)

function onDBConnected(){
  console.log('we are connected to mongo db')
}
app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }))
app.get('/', getSpeech );
app.post('/', createSpeech);

app.listen(port, function(){
  console.log('we are running on ' + port);
})

