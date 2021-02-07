const express = require('express')
const bodyParser = require('body-parser')
const https = require('https')

const app = express()

app.use(bodyParser.urlencoded({extended: true}))
app.use(express.static("public"))

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
            const emoji = `http://openweathermap.org/img/wn/${weatherData.weather[0].icon}@2x.png`

            res.send(`
            <!DOCTYPE html>
            <html lang="en">
            <head>
                <meta charset="UTF-8">
                <meta http-equiv="X-UA-Compatible" content="IE=edge">
                <meta name="viewport" content="width=device-width, initial-scale=1.0">
                <title>Weather Project</title>

                <link rel="stylesheet" href="style.css">
            </head>
            <body>
                <main>
                    <img src="${emoji}">
                    <h1>${weatherData.name} </h1>
                    <hr>
                    <ul>
                        <li>country: ${weatherData.sys.country}</li>
                        <li>temperature: ${weatherData.main.temp}°C</li>
                        <li>feels like: ${weatherData.main.feels_like}°C</li>
                    </ul>
                </main>
            </body>
            </html>
            `)
        })
    })
})

app.listen(3000, () => {
    console.log('Server is running on door 3000.')
})