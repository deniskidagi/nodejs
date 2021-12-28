const express = require('express')

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
    res.send('hello ' + name)
})

app.listen(3000, function(req, res){
    console.log('app listening on port 3000');
})