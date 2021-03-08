const express = require("express");
//const bodyParser = require("body-parser");
const https = require("https");

const app = express();

app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.set('view engine', 'ejs');

app.get("/", function(req,res){
    var today = new Date();
    var day="";
    day = new Intl.DateTimeFormat('en-US',{ weekday: 'long'}).format(today);
    res.render('list', {kindOfDay: day});
})

app.listen(3000, ()=>{
    console.log("hello, listening on port 3000");
})