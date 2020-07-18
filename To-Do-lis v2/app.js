const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const _ = require("lodash");

const app = express();

app.set("view engine", "ejs");

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

mongoose
    .connect("mongodb://localhost/todolistDB", {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    })
    .then(() => console.log("MongoDB Connected..."))
    .catch((err) => console.log(err));

const itemsSchema = {
    name: String,
};

const Item = mongoose.model("Item", itemsSchema);
const item1 = new Item({
    name: "Welcome to the to-do list",
});

const item2 = new Item({
    name: "Hit + to add items in your todo list",
});

const item3 = new Item({
    name: "<--Hit this to delete an item",
});

const defaultItems = [item1, item2, item3];

const listSchema = {
    name: String,
    items: [itemsSchema],
};

const List = mongoose.model("List", listSchema);

app.get("/", function (req, res) {
    Item.find({}, function (err, foundItems) {
        if (foundItems.length === 0) {
            Item.insertMany(defaultItems, function (err) {
                if (err) {
                    console.log(err);
                } else {
                    console.log("Successfully Added!");
                }
                res.redirect("/");
            });
        } else {
            res.render("list", {
                listTitle: "Today",
                newListItems: foundItems,
            });
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
        res.redirect("/");
    } else {
        List.findOne({ name: listName }, function (err, foundList) {
            foundList.items.push(item);
            foundList.save();
            res.redirect("/" + listName);
        });
    }
});

app.post("/delete", function (req, res) {
    const checkedItemId = req.body.checkbox;
    const listName = req.body.listName;

    if (listName === "Today") {
        Item.findByIdAndRemove(checkedItemId, function (err) {
            if (!err) {
                console.log("Successfully deleted");
                res.redirect("/");
            }
        });
    } else {
        List.findOneAndDelete(
            { name: listName },
            { $pull: { items: { _id: checkedItemId } } },
            function (err, foundList) {
                if (!err) {
                    res.redirect("/" + listName);
                }
            }
        );
    }
});

app.get("/:customListName", function (req, res) {
    const customListName = _.capitalize(req.params.customListName);
    List.findOne({ name: customListName }, function (err, foundLists) {
        if (!err) {
            if (!foundLists) {
                //Create New List
                const list = new List({
                    name: customListName,
                    items: defaultItems,
                });
                list.save();
                res.redirect("/" + customListName);
            } else {
                //Show existing list
                res.render("list", {
                    listTitle: foundLists.name,
                    newListItems: foundLists.items,
                });
            }
        }
    });
});

app.get("/about", function (req, res) {
    res.render("about");
});

app.listen(3000, function () {
    console.log("Server started on port 3000");
});
