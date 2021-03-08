const express = require("express");
//const bodyParser = require("body-parser");
const https = require("https");

const app = express();

app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.set('view engine', 'ejs');

app.get("/", function(req,res){
    var today = new Date();
    if(today.getDay()===6||today.getDay()===0){
        res.sendFile(__dirname+"/index.html");
    } else {
        //res.sendFile(__dirname+"/index.html");
        console.log("darbo diena:(((");
    }
})

app.listen(3000, ()=>{
    console.log("hello, listening on port 3000");
})