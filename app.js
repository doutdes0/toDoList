const express = require("express");
const ejs = require("ejs");
const bodyParser = require("body-parser");

const app = express();
app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static(__dirname));

let listItems = [];

app.get("/", (req, res) => {
    const date = new Date();
    const day = date.toLocaleDateString("en-US", {weekday: "long", day: "numeric", month: "long"});
    
    res.render("list", {day: day, listItems: listItems});
})

app.post("/", (req, res) => {
    listItems.push(req.body.listItem);
    res.redirect("/");
})

app.listen(process.env.PORT || 3000, () => console.log("Server is running in port 3000."));
