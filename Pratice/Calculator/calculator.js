//jshint esversion:7

const express = require("express");
const bodyParser = require("body-parser");

const app = express();
app.use(bodyParser.urlencoded({}));

app.get("/", function (req, res) {
  res.sendFile(__dirname + "/calculator.html");
  //   res.send("Thanks For Posting that");
});

app.post("/", function (req, res) {
  var num1 = Number(req.body.num1);
  var num2 = Number(req.body.num2);
  var result = Number(num1 + num2);

  res.send("The calculated result is " + result);
  //   console.log(req.body);
});
app.get("/bmicalculator", function (req, res) {
  res.sendFile(__dirname + "/bmiCalculator.html");
});
app.post("/bmicalculator", function (req, res) {
  var weight = Number(req.body.weight);
  var height = Number(req.body.height);

  var bmi = weight / (height + height);
  res.send("Your BMI is" + bmi);
});

app.listen(3000, function () {
  console.log("Server is running at port 3000");
});
