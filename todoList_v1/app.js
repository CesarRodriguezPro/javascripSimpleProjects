const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const date = require(__dirname+"/date.js");

app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(express.static("public"));
app.set('view engine', 'ejs');

var inputValue;
var items = [];
var workItems = [];


app.listen(3000, function () {
    console.log('Server Is Running');
});


app.get('/', function (req, res) {
    let day = date.GetDate();
    res.render("lists", {
        listTitle: day,
        newListItem: items
    });
});


app.get('/work', function (req, res) {
    res.render("lists", {
        listTitle: "Work List",
        newListItem: workItems
    })
});


app.post('/', function (req, res) {
    inputValue = req.body.newItem;
    let valueOfList = req.body.list

    if (valueOfList === "Work") {
        workItems.push(inputValue);
        res.redirect("/work");
    } else {
        items.push(inputValue);
        res.redirect("/")
    }
});


app.get('/about', function(req, res){
    res.render("about")
});