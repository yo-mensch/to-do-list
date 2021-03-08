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
    var options = { weekday: 'long'};
    if(today.getDay()===6||today.getDay()===0){
        day = new Intl.DateTimeFormat('en-US',options).format(today);
        res.render('list', {kindOfDay: day});
    } else {
        //res.sendFile(__dirname+"/index.html");
        day = new Intl.DateTimeFormat('en-US',options).format(today);
        res.render('list', {kindOfDay: day});
        console.log("darbo diena:(((");
    }
})

app.listen(3000, ()=>{
    console.log("hello, listening on port 3000");
})