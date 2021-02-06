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
    const apiKey = 'your api key'

    console.log(req.body)
    const url = 'https://api.openweathermap.org/data/2.5/weather?q=Brasilia&units=metric&appid=' + apiKey

    res.send('Server is running')

    https.get(url, (response) => {
        console.log(response.statusCode)
        response.on('data', (data) => {
            const weatherData = JSON.parse(data)
            console.log('climate in brasilia:' + weatherData.main.temp)
        })
    })
})

app.listen(3000, () => {
    console.log('Server is running on door 3000.')
})
a