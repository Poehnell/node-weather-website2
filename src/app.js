const path = require('path')
const express = require('express')
const hbs = require('hbs')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')

const app = express()
const port = process.env.PORT || 3000

//Define paths for express config
const publicDirectory = path.join(__dirname,'../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

//Setup handlebars and views location
app.set('view engine','hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

//setup static directory to serve
app.use(express.static(publicDirectory))

//HOME PAGE
app.get('',(req,res)=>{
    res.render('index', {
        title: 'Weather',
        name: 'Ty Poe'
    })
})

//ABOUT
app.get('/about', (req, res)=>{
        res.render('about', {
            title: 'About Page',
            name: 'Ty Poe'
        })
})

//HELP
app.get('/help', (req, res)=>{
    res.render('help', {
        title: 'The not so helpful Help Page',
        name: 'Ty Poe'
    })
})

//WEATHER
app.get('/weather',(req, res)=>{
    if (!req.query.address){
        return res.send({
            error: 'Please enter a location'
        })
    }

    geocode(req.query.address, (error, {latitude, longitude, location} = {}) => {
        if (error){
            return res.send({
                error: error
            })
            }else {
            forecast( latitude, longitude, (error, forecastData)=>{
                if (error){
                    return res.send({
                        error: error
                    })
                } else{
                    res.send({
                        weather: forecastData,
                        location,
                        address: req.query.address
                    })
                }
            })
        }
    })
})

app.get('/products', (req, res)=>{
    if (!req.query.search){
        return res.send({
            error: 'You must provide a search term'
        })
    }

    console.log(req.query.search)
    res.send({
        products: []
    })
})

app.get('/help/*', (req,res)=>{
    res.render('error404', {
        title: '404',
        name: 'Ty Poe',
        errorMessage: 'Help Article not found.'
    })
})

//ERROR 404
app.get('*', (req,res)=>{
    res.render('error404', {
        title: '404',
        name: 'Ty Poe',
        errorMessage: 'Page not found.'
    })
})

app.listen(port, ()=> {
    console.log('Server is up on port '+ port)
})
