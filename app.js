const express = require("express");
const bodyParser = require('body-parser');
const https = require("https");

const app = express();

var items = [];

app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(express.static(__dirname + '/public'));
app.set('view engine', 'ejs');

app.get("/", function(req,res){

    var options = {weekday: 'long', 
    year: 'numeric', 
    month: 'long', 
    day: 'numeric'};

    var today = new Date();
    var day = today.toLocaleDateString("en-US",options);
    //var day = new Intl.DateTimeFormat('en-US',options).format(today);
    res.render('list', {kindOfDay: day, newTask: items});
})

app.post("/", (req,res)=>{
    items.push(req.body.newTask);
    res.redirect("/");
})

app.listen(3000, ()=>{
    console.log("hello, listening on port 3000");
})