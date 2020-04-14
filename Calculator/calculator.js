const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const route = 3000;

app.get('/', function(req, res){
res.sendFile(__dirname + "/index.html");
});

app.post('/', function(req, res){
    res.send('thank you for this');
    });

app.listen(route,function(){
    console.log('starting in port 3000');
});

