const express = require('express')
const fs = require("fs");
const { format } = require('path');

const app = express();

app.use(express.urlencoded({extended:true}))

app.get('/login',(req,res) =>{
    res.sendFile(__dirname + '/login.html')
})


app.post('/product',(req,res) =>{
    const message = req.body.message
    const username = req.body.username;
   
    let data = `${username} : ${message}\n`

    fs.appendFile("messages.txt",data,(err) =>{
        if(err){
            console.log(err)
            return res.status(500).send("Error saving message.");
        }
    })
    fs.readFile('messages.txt',(err,data)=>{
        if(err){
            console.log('No data exists')
            res.send("No chat exist")
        }
        res.send(`<pre>${data}</pre>
        <form action="/product" method="POST" onsubmit="document.getElementById('username').value= localStorage.getItem('username')">
        <input type="text" name="message" id="message">
        <input type="hidden" name="username" id="username" >
        <button type="submit">Submit</button>
        </form>`)
        ;
    
})
    
})
app.get('/product',(req,res) =>{
    res.sendFile(__dirname + '/product.html')
})

app.listen(3000,()=>{
    console.log('Server has started sucessfully')
})
