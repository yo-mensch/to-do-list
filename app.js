const express = require("express");
const date = require("./date");
const mongoose = require("mongoose");

const app = express();

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
const item1 = new Item({
    content: "Welcome to your to do list!"
})
const item2 = new Item({
    content: "Hit the + button to add a new item"
})
const item3 = new Item({
    content: "<-- Hit this to delete an item"
})
const defaultItems = [item1, item2, item3];

app.get("/", function(req,res){

    Item.find((err, foundItems)=>{
        if(err) console.log(err);
        else {
            if(foundItems.length===0){
                Item.insertMany(defaultItems,(err)=>{
                    if(err){
                        console.log(err);
                    } else {
                        console.log("success!");
                    }
                })
                res.redirect('/');
            } else{
                res.render('list', {listTitle: date.getDate(), newTask: foundItems});
            }
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
    const newItem = new Item({
        content: req.body.newTask
    });
    Item.create({content: newItem.content},(err)=>{
        if(err) console.log(err);
    })
    res.redirect("/");
});

app.post("/delete",(req,res)=>{
    const checkedItemId = req.body.checkbox;
    Item.deleteOne({_id: checkedItemId},(err)=>{
        if(err) console.log(err);
    })
    res.redirect('/');
})

app.listen(3000, ()=>{
    console.log("hello, listening on port 3000");
});