const express = require("express");
const date = require("./date");
const mongoose = require("mongoose");

const app = express();

//let items = [];
//let workItems=[];

app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(express.static(__dirname + '/public'));
app.set('view engine', 'ejs');

mongoose.connect("mongodb://localhost:27017/toDoListDB",{
    useNewUrlParser: true,
    useUnifiedTopology: true
})

const listItemSchema = new mongoose.Schema({
    content: String
})

const Item = new mongoose.model("item",listItemSchema);
//default items
/*const item1 = new Item({
    content: "Udemy kursus pribaigineti"
})
const item2 = new Item({
    content: "Sobolio egzui pasimokyti"
})

const defaultItems = [item1, item2];*/
/*Item.insertMany(defaultItems,(err)=>{
    if(err){
        console.log(err);
    } else {
        console.log("success!");
    }
})*/

app.get("/", function(req,res){
    Item.find((err, foundItems)=>{
        if(err) console.log(err);
        else {
            res.render('list', {listTitle: date.getDate(), newTask: foundItems});
        }
    })
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