require('dotenv').config();
const express = require('express');
const routes = require('./src/config/routes');
var cors = require('cors')
var bodyParser = require('body-parser');

var app = express();

app.use(cors());
app.use(bodyParser.json())
app.use('/', routes);

var sitePort = process.env.SITE_PORT;
app.listen(sitePort,(e)=>{
    console.log('connected on port: '+sitePort);
});