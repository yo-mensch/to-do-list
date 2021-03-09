const express = require("express");
const date = require("./date");

const app = express();

let items = [];
let workItems=[];

app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(express.static(__dirname + '/public'));
app.set('view engine', 'ejs');

app.get("/", function(req,res){
    res.render('list', {listTitle: date(), newTask: items});
});

app.get("/work", (req,res)=>{
    res.render("list",{listTitle: "Work list", newTask: workItems});
});

app.get("/about", (req,res)=>{
    res.render("about");
})

app.post("/", (req,res)=>{
    if(req.body.list === "Work"){
        workItems.push(req.body.newTask);
        res.redirect("/work");
    }else{
        items.push(req.body.newTask);
        res.redirect("/");
    }
});

app.listen(3000, ()=>{
    console.log("hello, listening on port 3000");
});