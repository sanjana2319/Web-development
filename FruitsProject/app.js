const mongoose = require("mongoose");
const { GridFSBucketWriteStream } = require("mongodb");

mongoose.connect("mongodb://localhost:27017/fruitsDB", {
    useUnifiedTopology: true,
});

const fruitSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "Name is Required"],
    },
    rating: {
        type: Number,
        min: 1,
        max: 10,
    },
    review: String,
});

const Fruit = mongoose.model("Fruit", fruitSchema);

const fruit = new Fruit({
    name: "Apple",
    rating: 8,
    review: "Pretty solid",
});
// fruit.save();

const peopleSchema = new mongoose.Schema({
    name: String,
    age: Number,
});

const Person = mongoose.model("Person", peopleSchema);
const person = new Person({
    name: "John",
    age: 37,
});

// person.save();

// const kiwi = new Fruit({
//     name: "Kiwi",
//     score: 10,
//     review: "Awsome",
// });

// const orange = new Fruit({
//     name: "Orange",
//     score: 7,
//     review: "okeish",
// });

// const banana = new Fruit({
//     name: "Banana",
//     score: 8,
//     review: "Not Bad",
// });

// Fruit.insertMany([kiwi, orange, banana], function (err) {
//     if (err) {
//         console.log(err);
//     } else console.log("successfully added all the fruits");
// });

Fruit.find(function (err, fruits) {
    if (err) {
        console.log(err);
    } else {
        mongoose.connection.close();

        fruits.forEach(function (fruit) {
            console.log(fruit.name);
        });
    }
});

// Fruit.deleteOne({name : "Apples"}, function(err){
//     if(err){
//         console.log(err)
//     }else
//     console.log("Successfully eleted")
// })
Person.deleteMany({ name: "John" }, function (err) {
    if (err) {
        console.log(err);
    } else {
        console.log("Deleted Successfully!");
    }
});

const insertDocuments = function (db, callback) {
    // Get the documents collection
    const collection = db.collection("fruits");
    // Insert some documents
    collection.insertMany(
        [
            {
                name: "Apple",
                score: 8,
                review: "Great Fruit",
            },
            {
                name: "Orange",
                score: 6,
                review: "Kinda sour",
            },
            {
                name: "Banana",
                score: 9,
                review: "Great stuff!",
            },
        ],
        function (err, result) {
            assert.equal(err, null);
            assert.equal(3, result.result.n);
            assert.equal(3, result.ops.length);
            console.log("Inserted 3 documents into the collection");
            callback(result);
        }
    );
};

const findDocuments = function (db, callback) {
    // Get the documents collection
    const collection = db.collection("fruits");
    // Find some documents
    collection.find({}).toArray(function (err, fruits) {
        assert.equal(err, null);
        console.log("Found the following records");
        console.log(fruits);
        callback(fruits);
    });
};
