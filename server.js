const express = require('express');
const path = require('path');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const app = express();
const port = process.env.PORT || 3001;
const dbURI = process.env.MONGODB_URI || 'mongodb://localhost/speeches' ;

const { Speech } = require('./models');
const { createSpeech, getSpeech, updateSpeech } = require('./routeHandlers');


mongoose.connect(dbURI, {useNewUrlParser: true});

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'))
db.once('open', onDBConnected)

function onDBConnected(){
  console.log('we are connected to mongo db')
}

if(process.env.NODE_ENV === "production"){
  app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', 'https://radio-mirror-front.herokuapp.com');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    res.header('Access-Control-Allow-Methods', 'POST, GET, PUT, DELETE');
    next();
  })
} else {
  const cors = require('cors')
  app.use(cors());
}

app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json());
app.get('/', getSpeech );
app.post('/', createSpeech);
app.put('/', updateSpeech);

app.listen(port, function(){
  console.log('we are running on ' + port);
})

