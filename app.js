const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const {engine} = require('express-handlebars');
const dbo = require('./db');
const path = require('path');
const ObjectID = dbo.ObjectID;
const PORT = 4600; 

app.engine('hbs',engine({extname:'.hbs',layoutsDir:'views',defaultLayout:"main"}));
app.set('view engine','hbs');
app.set('views',path.join(__dirname,'views'));

app.use(express.static(path.join(__dirname,'public')));
app.use(bodyParser.urlencoded({extended:false}));

app.post('/storedData',async (req,res)=>{
    let database = await dbo.getDatabase();
    const collection = database.collection('books');
    let book = {title:req.body.title,author:req.body.author};

    await collection.insertOne(book);
    res.redirect('/?status=1');
});



app.post('/editData/:edit_id',async (req,res)=>{

    let database = await dbo.getDatabase();
    const collection = database.collection('books');
   let book = {title:req.body.title,author:req.body.author};
   let edit_id = req.params.edit_id;
    await collection.updateOne({_id: new ObjectID(edit_id)},{$set:book});
    return res.redirect('/?status=2');

});

app.get('/',async (req,res)=>{
    let message = '';
    let database =await dbo.getDatabase();
    const collection = database.collection('books');
    let cursor = collection.find({});
    let book = await cursor.toArray();
    
    let edit_id,edit_book; 

    if(req.query.edit_id){
        edit_id = req.query.edit_id;
        edit_book = await collection.findOne({ _id: new ObjectID(edit_id) });        
    }
    if(req.query.delete_id){
        delete_id = req.query.delete_id;
        await collection.deleteOne({_id: new ObjectID(delete_id)});
        return res.redirect('/?status=3');    
    }
    switch(req.query.status){
    case '1':
        message="Inserted Successfully!";
    break;
    case '2':
        message="Updated Successfully!";
    break;
    case '3':
        message="Deleted Successfully!";
    break;
    default:    
        
    break;
    }

    res.render('main',{message,book,edit_id,edit_book});

});


app.listen(PORT,()=>{
    console.log(PORT+" is running");
});