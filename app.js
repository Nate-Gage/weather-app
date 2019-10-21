const path = require('path')
const express = require('express')
const geocode = require('./src/geocode')
const forecast = require('./src/forecast')
const hbs = require('hbs')


const app = express()

//Paths for express configuration
const staticDirectory = path.join(__dirname, 'front-end')
const viewsPath = path.join(__dirname, 'templates/views')
const partialsPath = path.join(__dirname, 'templates/partials')

//Setup hbs engine and views location
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

//Directory serving static files
app.use(express.static(staticDirectory))

app.get('', (req, res) => {
    res.render('index', {
        title: 'CHECK THE FORECAST',
        name: 'Nate Gage'
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About Page',
        body: 'this is the body content of the about page',
        name: 'Nate Gage'
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        title: 'Help Page',
        body: 'Weather data is collected from the darksky API (www.darksky.net)',
        name: 'Nate Gage'
    })
})

app.get('/weather-data', (req, res) => {

    geocode(req.query.city, (error, { latitude, longitude, location }) => {

        if (error) {
            return console.log(error)
        }
        forecast(latitude, longitude, (error, forecastData) => {
            if (error) {
                return console.log(error)
            }

            console.log(location, forecastData)
            res.send('You are in ' + location + '. ' + forecastData + ' Have a great day.')
        })
    })

})

app.get('/help/*', (req, res) => {
    res.send('Help article not found')
})

//Express check for everything else NEEDS TO BE AT BOTTOM OF app.get calls
app.get('*', (req, res) => {
    res.render('404', {
        errorMsg: 'This page is 404'
    })
})

const PORT = process.env.PORT || 3000

app.listen(PORT, () => {
    console.log('server is up on port 3000.')
})
