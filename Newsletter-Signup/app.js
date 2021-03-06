const express = require("express");
const bodyParser = require("body-parser");
const request = require("request");
const https = require("https");

const app = express();

app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", function (req, res) {
    res.sendFile(__dirname + "/signup.html");
});

app.post("/", function (req, res) {
    var firstName = req.body.fName;
    var lastName = req.body.lName;
    var email = req.body.email;

    var data = {
        members: [
            {
                email_address: email,
                status: "subscribed",
                merge_fields: {
                    FNAME: firstName,
                    LNAME: lastName,
                },
            },
        ],
    };

    var jsonData = JSON.stringify(data);

    var options = {
        url: "http://us18.api.mailchimp.com/3.0/lists/9c5bc8e891",
        method: "POST",
        headers: {
            "Authorization": "sanjana2319 1eac024ee0b790f5a00541b983c32668-us18",
        },
        body: jsonData,
    };

    request(options, function (error, response, body) {
        if (error) {
            console.log("error");
            res.sendFile(__dirname + "/failure.html");
        } else {
            if (response.statusCode === 200) {
                res.sendFile(__dirname + "/success.html");
            } else {
                console.log(response.statusCode);
                res.sendFile(__dirname + "/failure.html");
            }
        }
    });
});

app.post("/failure", function (req, res) {
    res.redirect("/");
});

app.listen(3000, function () {
    console.log("Server is running on port 3000");
});

// 1eac024ee0b790f5a00541b983c32668-us18
// 9c5bc8e891 List
