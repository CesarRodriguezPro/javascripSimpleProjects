const express = require('express');
const bodyParser = require('body-parser');
const app = express();

app.use(bodyParser.urlencoded({extended:true}));
app.use(express.static("public"));
app.set('view engine', 'ejs');

var inputValue;
var items = [];


app.listen(3000, function(){
    console.log('Server Is Running');
});


app.get('/', function(req, res){

    var today = new Date();
    var options = {
        weekday:'long',
        day: "numeric",
        month:"long",
    }
    var day = today.toLocaleDateString("en-US", options);
    res.render('lists',{kindOfDay:day, newListItem:items});
});


app.post('/', function(req, res){
    inputValue = req.body.newItem;
    items.push(inputValue);
    res.redirect('/');
});

