const path = require('path')    //to work with various paths, directories
const express = require('express')  //library
const hbs = require('hbs')          //hbs is a express.js wrapper for handlebars.js
                                // using which working with html becomes easier for dynamic rendering of web pages
const geocode = require('./utils/geocode')  //code for getting latitude and longitude of location
const forecast = require('./utils/forecast')  // code for getting weather forecast

const app = express()       //initializing express

const port = process.env.PORT || 3000
const viewsPath = path.join(__dirname, '../templates/views')  //directory to hbs views
const publicDirPath = path.join(__dirname, '../public')       //consists of static html, css, js
const partialsPath = path.join(__dirname, '../templates/partials')//Handlebars allows for template reuse through partials.
                        // Partials are normal Handlebars templates that may be called directly by other templates

hbs.registerPartials(partialsPath)  //to indicate location to partials 
app.set('views', viewsPath)         //to set location to views directory
app.set('view engine', 'hbs')       //to set view engine as hbs
app.use(express.static(publicDirPath))//to set location for static files 


//Routes HTTP GET requests to the specified path with the specified callback functions.
app.get('',(rew, res)=>{
    res.render('index',{        //Renders a view and sends the rendered HTML string to the client.
        // Object passed as arguments
        title:'Weather app',
        name: 'Abhishek Anavekar'
    })
})

app.get('/about',(req, res)=>{
    res.render('about', {
        title:'About me',
        name: 'Abhishek Anavekar'   
    })
})

app.get('/help',(req, res)=>{
    res.render('help', {
        title:'Help',
        name: 'Abhishek Anavekar',
        helpMessage: 'This is help page'
    })
})

app.get('/weather', (req, res)=>{
    if(!req.query.address){                 //req.query returns an object from the url string sent by users.
        return res.send({
            error: 'Address must be provided'
        })
    }

    geocode(req.query.address, (geoError, {latitude, longitude, location} = {})=>{
        forecast(latitude, longitude, (forecastError, forecastData)=>{
            if(forecastError){
                return res.send({ error:forecastError })
            }
            res.send({
                forecast: forecastData,
                location: location,
                address: req.query.address
            })
        })
    })

})

app.get('/products',(req,res)=>{
    if(!req.query.search){
        return res.send({
            error: 'You must provide a search term'
        })
    }
    console.log(req.query)
    res.send({
        products:[]
    })
})

app.get('/help/*', (req, res)=>{
    res.render('404', {
        title:'404 page',
        name: 'Abhishek Anavekar',
        errorMessage: 'Help article not found'
    })
})

app.get('*',(req, res)=>{
    res.render('404',{
        title:'404 page',
        name: 'Abhishek Anavekar',
        errorMessage: 'Page not found'
    })
})

//Binds and listens for connections on the specified host and port.
//This method is identical to Node’s http.Server.listen().
app.listen(port, ()=>{
    console.log('Server is running! at '+port)
})