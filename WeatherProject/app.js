const express = require('express');
const https = require('https');
const app = express();
const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({extended: true}));


app.get("/", function (req, res) {
    res.sendFile(__dirname + "/index.html")
});


app.post("/", requestToAPI);


app.listen(3000, function () {
    console.log('listen in 3000');
});


function requestToAPI(req, res){
    // basic settings for api
    const ApiKey = '48e5587fc82139d424e376a9485b03ac'
    var city = req.body.cityName
    var URL = "https://api.openweathermap.org/data/2.5/weather?q=" + city + "&units=imperial&appid=" + ApiKey
    
    // request for infor in api using body parser and json parse
    https.get(URL, function (response) {
        response.on("data", function (data) {
            const weatherData = JSON.parse(data);
            var temperatureNYC = weatherData.main.feels_like;
            var temperatureDescription = weatherData.weather[0].description;
            res.send('the temperature in ' + city + ' is ' + temperatureNYC + " and it is descripve as " + temperatureDescription)
        });
    });
}