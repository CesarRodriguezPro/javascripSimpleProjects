//jshint esversion:6

const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require('mongoose');
const _ = require('lodash');
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
    const listName = req.body.list;
    const item = new Item({
        name: itemName,
    });
    if (listName === "Today") {
        item.save();
        res.redirect('/');

    } else {
        List.findOne({
            name: listName
        }, function (err, foundList) {
            foundList.items.push(item);
            foundList.save();
            res.redirect('/' + listName);
        });
    }
});


// delete items from lists
app.post('/delete', function (req, res) {
    const checkedItem = req.body.checkbox;
    const listName = req.body.listName;

    if (listName === "Today") {
        Item.findByIdAndRemove(checkedItem, function () {
            console.log('item removed')
        });
        res.redirect("/");
    } else {
        List.findOneAndUpdate({
            name: listName
        }, {
            $pull: {
                items: {
                    _id: checkedItem
                }
            }
        }, function (err, foundList) {
            if (!err) {
                res.redirect('/' + listName)
            }
        });
    }
});


// custom list
app.get('/:customListName', function (req, res) {
    const dinamicUrl = _.capitalize(req.params.customListName);

    List.findOne({
        name: dinamicUrl
    }, function (err, foundList) {
        if (!err) {
            if (!foundList) {
                const list = new List({
                    name: dinamicUrl,
                    items: defaultItems,
                });
                list.save();
                res.redirect('/' + dinamicUrl);
            } else {
                res.render("list", {
                    listTitle: foundList.name,
                    newListItems: foundList.items
                });
            }

        };
    });
});


// additionas lists
app.get("/about", function (req, res) {
    res.render("about");
});

app.listen(3000, function () {
    console.log("Server started on port 3000");
});