const express = require("express");
const ejs = require("ejs");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");


const app = express();
app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static(__dirname));

mongoose.connect('mongodb://127.0.0.1:27017/todolistDB')
.then(
    () => console.log('Connected!'),
    (err) => console.log(err)
);

const Schema = mongoose.Schema;
const itemSchema = new Schema({
    item: {type: String, required: "Field is required!"}
});
const Item = mongoose.model("item", itemSchema);


app.get("/", (req, res) => {
    const date = new Date();
    const day = date.toLocaleDateString("en-US", {weekday: "long", day: "numeric", month: "long"});
    Item.find({}).exec((err, listItems) =>{
        if(err) {
            console.log(err)
        } else {
            console.log("Data transfered from DB successfully!");
            res.render("list", {day: day, listItems: listItems});
        }
    }); 
})

app.post("/", (req, res) => {
    const item = req.body.listItem;
    const newItem = new Item({item: item});
    newItem.save();
    res.redirect("/");
})

app.listen(process.env.PORT || 3000, () => console.log("Server is running in port 3000."));
