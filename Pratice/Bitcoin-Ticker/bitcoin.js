const express = require("express");
const bodyParser = require("body-parser");
const request = require("request");

const app = express();
app.use(bodyParser.urlencoded({}));

app.get("/", function (req, res) {
  res.sendFile(__dirname + "/bitcoin.html");
});

app.post("/", function (req, res) {
  //   console.log(req.body.crypto);
  var crypto = req.body.crypto;
  var fiat = req.body.fiat;

  var amount = req.body.amount;

    var options = {
      url: "https:apiv2.bitcoinaverage.com/indices/global/ticker/all?crypto=BTC&fiat=USD,EUR",
      method: "GET", 
      qs: {
        from: crypto
        to: fiat,
        amount: amount
      }

    }

  var finalUrl = baseUrl + crypto + fiat;

  request(options, function (error, response, body) {
    //   console.log(response.statusCode);
    //   console.log(body);
    var data = JSON.parse(body);
    var price = data.price;

    var currentDate = date.display_timestamp;
    res.write("The current date is" + currentDate);
    res.write(
      "<h1>The Price of the " + crypto + " is" + price + fiat + " USD</h1>"
    );
    //   console.log(price);
    res.send();
  });
});

app.listen(3000, function () {
  console.log("Server is running at port 3000");
});
