const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const { response } = require("express");

const app = express();
app.set("view engine", "ejs");

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

mongoose
    .connect("mongodb://localhost/wikiDB", {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    })
    .then(() => console.log("MongoDB Connected..."))
    .catch((err) => console.log(err));

const articleSchema = {
    title: "String",
    content: "String",
};

const Article = mongoose.model("Article", articleSchema);

app.route("/article")
    .get(function (req, res) {
        Article.find(function (err, foundArticles) {
            if (!err) {
                console.log(foundArticles);
            } else {
                console.log(err);
            }
        });
    })
    .post(function (req, res) {
        const newArticle = new Article({
            title: req.body.title,
            content: req.body.content,
        });

        newArticle.save(function (err) {
            if (!err) {
                res.send("Successfully added a new artile");
            } else {
                res.send(err);
            }
        });
    })
    .delete(function (req, res) {
        Article.deleteMany({}, function (err) {
            if (!err) {
                res.send("Successfully deleted all articles");
            } else {
                res.send(err);
            }
        });
    });

app.route("/article/:articleTitle")
    .get(function (req, res) {
        Article.findOne({ title: req.params.articleTitle }, function (
            err,
            foundArticle
        ) {
            if (foundArticle) {
                res.send(foundArticle);
            } else {
                res.send("No article matching!");
            }
        });
    })
    .put(function (req, res) {
        Article.update(
            { title: req.param.articleTitle },
            { title: req.body.title, content: req.body.content },
            { overwrite: true },
            function (err) {
                if (!err) {
                    res.send("Successfully updated article.");
                } else {
                    res.send(err);
                }
            }
        );
    })
    .patch(function (req, res) {
        Article.update(
            { title: req.params.articleTitle },
            { $set: req.body },
            function (err) {
                if (!err) {
                    res.send("Successfully updated article");
                } else {
                    res.send(err);
                }
            }
        );
    })
    .delete(function (req, res) {
        Article.deleteOne({ title: req.params.articleTitle }, function (err) {
            if (!err) {
                res.send("Successfully deleted");
            } else {
                res.send(err);
            }
        });
    });

app.listen(3000, function () {
    console.log("Server started at port 3000");
});
