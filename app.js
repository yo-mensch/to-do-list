const express = require("express");
const date = require("./date");
const mongoose = require("mongoose");
const _ = require("lodash");

const app = express();

app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(express.static(__dirname + '/public'));
app.set('view engine', 'ejs');

mongoose.connect("mongodb+srv://admin-rarsa:Test866524434@todolist.kwn0c.mongodb.net/toDoListDB",{
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify:false
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

const listSchema = new mongoose.Schema({
    name: String,
    items: [listItemSchema]
})

const List = new mongoose.model("list", listSchema);

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

app.get("/:customListName",(req,res)=>{
    const customListName = _.capitalize(req.params.customListName);

    List.findOne({name: customListName},(err, foundList)=>{
        if(err) console.log(err);
        else{
            if(!foundList){
                const list =new List({
                    name: customListName,
                    items: defaultItems
                });
            
                list.save();
                res.redirect("/"+customListName);
            } else{
                res.render("list", {listTitle: customListName, newTask: foundList.items});
            }
        }
    })
    
})

app.post("/", (req,res)=>{
    const listName = req.body.list;
    const newItem = new Item({
        content: req.body.newTask
    });

    if(listName===date.getDate()){
        Item.create({content: newItem.content},(err)=>{
            if(err) console.log(err);
        })
        res.redirect("/");
    } else {
        List.findOne({name: listName},(err,foundList)=>{
            if(err) console.log(err);
            foundList.items.push(newItem);
            foundList.save();
            res.redirect("/"+listName);
        })
    }

    
});

app.post("/delete",(req,res)=>{
    const checkedItemId = req.body.checkbox;
    const listName = req.body.listName;
    //console.log(checkedItemId+" "+listName);
    if(listName===date.getDate()){
        Item.deleteOne({_id: checkedItemId},(err)=>{
            if(err) console.log(err);
        })
        res.redirect('/');
    } else {
        List.findOneAndUpdate({name: listName},
            {$pull:{items :{_id: checkedItemId}}},
            (err,foundList)=>{
            if(err) console.log(err);
            else res.redirect("/"+listName);
        })
    }
})

app.listen(3000, ()=>{
    console.log("hello, listening on port 3000");
});