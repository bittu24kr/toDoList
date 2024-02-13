const express = require("express");
const bodyParser = require("body-parser");

const app = express();
let items = [ "Practice Japanese","Learn Web Development","Read Book"];
let workItems = [];
app.set("view engine", "ejs");

app.use(bodyParser.urlencoded({extended:true}));
app.use(express.static("public"));

app.get("/", function (req, res) {
    let today  = new Date();
    let currentDate = today.getDate();

    let day = "";

    let options = { 
        weekday: 'long', 
        year: 'numeric', 
        month: 'long', 
        day: 'numeric' 
    };

    res.render("list", { listTitle: today.toLocaleDateString("en-US",options), newListItems:items });
    // res.sendFile(__dirname + "/index.html");
});

app.post("/", function(req,res){
    let item = req.body.newItem;

    if(req.body.list == "Work"){
        workItems.push(item);
        res.redirect("/work");
    }else{  
    items.push(item);
    res.redirect("/");
    }    
});

app.get("/work", function(req,res){
    res.render("list", {listTitle:"Work List", newListItems: workItems})
});

app.get("/about", function(req,res){
    res.render("about");
});

app.listen(3000, function () {
    console.log("server is running on port 3000.")
});