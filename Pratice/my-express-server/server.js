const express = require("express");

const app = express();

app.get("/", function (request, response) {
  response.send("<h1>Hello</h1>");
});

app.get("/contact", function (req, res) {
  res.send("Contact me at sanjana@gmail.com");
});

app.get("/about", function (req, res) {
  res.send("Im Sanjana Jain");
});

app.get("/hobbies", function (req, res) {
  res.send("My hobby is window shopping.");
});

app.listen(3000, function () {
  console.log("Server started at port  3000");
});
