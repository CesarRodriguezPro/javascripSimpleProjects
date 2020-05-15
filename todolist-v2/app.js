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

mongoose.connect('mongodb://localhost:27017/todolistDB', {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
const itemSchema = {
  name: String,
};

const Item = mongoose.model("Item", itemSchema)

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
        res.render("list", { listTitle: "Today", newListItems: result, });
      }
    }
  });
});

app.post("/", function (req, res) {
  const item = req.body.newItem;
  if (req.body.list === "Work") {
    workItems.push(item);
    res.redirect("/work");
  } else {


    // keep working in adding the data to the dababase.
    const 





    res.redirect("/");
  }
});

app.get("/work", function (req, res) {
  res.render("list", {
    listTitle: "Work List",
    newListItems: workItems
  });
});

app.get("/about", function (req, res) {
  res.render("about");
});

app.listen(3000, function () {
  console.log("Server started on port 3000");
});