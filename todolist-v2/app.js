//jshint esversion:6

const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require('mongoose');
const app = express();

app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(express.static("public"));


// database settings
mongoose.connect('mongodb://localhost:27017/todolistDB', {
  useNewUrlParser: true,
  useUnifiedTopology: true
});
const itemSchema = {
  name: String
};
const listSchema = {
  name: String,
  items: [itemSchema],
};
const List = mongoose.model("List", listSchema);
const Item = mongoose.model("Item", itemSchema);


// default items 
const item1 = new Item({
  name: "Welcome to your todolist!"
});
const item2 = new Item({
  name: "Hit the + button to aff a new item."
});
const item3 = new Item({
  name: "<--- hit this to delete an items"
});
const defaultItems = [item1, item2, item3];

// main list
app.get("/", function (req, res) {
  Item.find({}, function (err, result) {
    if (err) {
      console.log(err)
    } else {
      if (result.length == 0) {
        Item.insertMany(defaultItems, function (err) {
          if (err) {
            console.log(err);
          } else {
            console.log('Successfully Saved Default Items');
            res.redirect('/');
          }
        });
      } else {
        res.render("list", {
          listTitle: "Today",
          newListItems: result,
        });
      }
    }
  });
});

app.post("/", function (req, res) {
  const itemName = req.body.newItem;
  const item = new Item({
    name: itemName,
  });
  item.save();
  res.redirect('/');
});

app.post('/delete', function (req, res) {
  const checkedItem = req.body.checkbox;

  Item.findByIdAndRemove(checkedItem, function () {
    console.log('item removed')
  });

  res.redirect("/");
});


// custom list
app.get('/:customListName', function (req, res) {
  const dinamicUrl = req.params.customListName;

  List.findOne({name: dinamicUrl}, function (err, foundList) {
    if (!err) {
      if(!foundList){
        // created a list 
      }else{
        // read a list 
  }});
});


// additionas lists
app.get("/about", function (req, res) {
  res.render("about");
});

app.listen(3000, function () {
  console.log("Server started on port 3000");
});