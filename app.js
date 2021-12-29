const express = require('express')
const fs = require('fs')
const path = require('path')

const app = express()

app.use(express.urlencoded({extended: false}))

app.get('/', function(req, res){
    res.send('welcome to homepage')
})

app.get('/currentTime', function(req, res){
    res.send("<form action='/store-user' method='post'><label>Your Name</label><input type='text' name='username'><button>submit</button></form>")
})

app.post('/store-user', function(req, res){
    const name = req.body.username

    const filepath = path.join(__dirname , "data", "users.json")

    const filedata = fs.readFileSync(filepath)
    const existingUsers = JSON.parse(filedata)
    existingUsers.push(name)
    fs.writeFileSync(filepath, JSON.stringify(existingUsers))
    res.send('hello ' + name)
})

app.get('/users', function(req, res){
    const filepath = path.join(__dirname , "data", "users.json")

    const filedata = fs.readFileSync(filepath)
    const existingUsers = JSON.parse(filedata)

    let responseData = "<ul>"

    for (let user in existingUsers){
        responseData += "<li>" + user + "</li>"
    }

    responseData += "</ul>"
    res.send(responseData)
})

app.listen(3000, function(req, res){
    console.log('app listening on port 3000');
})