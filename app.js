const fs = require('fs')
const express = require('express')
const path = require('path')
const ejs = require('ejs')

const app = express()

app.use(express.urlencoded({extended: false}))


app.set('views', path.join(__dirname, "views"))
app.set('view engine', 'ejs')

app.use(express.static('public'))
app.get('/', function(req, res){
    res.render('index')
})


app.get('/restaurants', function(req, res){
    const filePath = path.join(__dirname, "data", "restaurants.json")
    const data = fs.readFileSync(filePath)
    const foundRestaurants = JSON.parse(data)
    res.render('restaurants', {numberOfRestaurants: foundRestaurants.length, restaurants: foundRestaurants})
})

app.get('/confirm', function(req, res){
    res.render('confirm')
})


app.get('/recommend', function(req, res){
    res.render('recommend')
})

app.post('/recommend', function(req, res){
    const restaurant = req.body;

    const filePath = path.join(__dirname, "data", "restaurants.json")

    const fileData = fs.readFileSync(filePath)
    const storedRestaurants = JSON.parse(fileData)

    storedRestaurants.push(restaurant)

    fs.writeFileSync(filePath, JSON.stringify(storedRestaurants))

    res.redirect('/confirm')

})

app.get('/about', function(req, res){
   res.render('about')
})
app.listen(3000, function(){
    console.log('app listening on port 3000');
})
    
