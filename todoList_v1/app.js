const express = require('express');
const bodyParser = require('body-parser');
const app = express();

app.use(bodyParser.urlencoded({extended:true}));
app.use(express.static("public"));
app.set('view engine', 'ejs');

var inputValue;
var items = [];
var workItems = [];


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
    res.render('lists',{listTitle:day, newListItem:items});
});


app.post('/', function(req, res){
    inputValue = req.body.newItem;
    if(res.body.list === "Work"){
        workItems.push(item);
        res.redirect('/work');
    }else{
        items.push(inputValue);
        res.redirect('/');
    }});


app.get('/work', function(req,res){
    res.render("lists", {listTitle:"Work List", newListItem:workItems})
});
