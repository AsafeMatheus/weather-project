const express = require('express')
const bodyParser = require('body-parser')
const https = require('https')

const app = express()

app.use(bodyParser.urlencoded({extended: true}))
app.use(express.static("public"))
app.set('view engine', 'ejs')

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html')
})
app.post('/', (req, res) => {
    const apiKey = 'your API key'
    const city = req.body.cityName

    const url = 'https://api.openweathermap.org/data/2.5/weather?q=' + city + '&units=metric&appid=' + apiKey

    https.get(url, (response) => {
        console.log('status code: ' +response.statusCode)
        response.on('data', (data) => {
            const weatherData = JSON.parse(data)
            const weatherCity = weatherData.name
            const weatherCountry = weatherData.sys.country
            const weatherTemperature = weatherData.main.temp
            const weatherFeelsLike = weatherData.main.feels_like
            const emoji = `http://openweathermap.org/img/wn/${weatherData.weather[0].icon}@2x.png`

            res.render('response', {
                weatheremoji: emoji,
                weatherCity: weatherCity,
                weatherCountry: weatherCountry,
                weatherTemperature: weatherTemperature,
                weatherFeelsLike: weatherFeelsLike
            })
        })
    })
})

app.listen(3000, () => {
    console.log('Server is running on door 3000.')
})