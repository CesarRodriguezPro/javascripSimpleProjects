
const express = require('express');
const https = require('https')
const app = express();

const ApiKey = '48e5587fc82139d424e376a9485b03ac'
const city = 'new york'
var URL = "https://api.openweathermap.org/data/2.5/weather?q="+city+"&units=imperial&appid="+ApiKey



app.get("/", function(req, res){
    https.get(URL, function(response){
        console.log(response.statusCode)
        response.on("data", function(data){
            const weatherData = JSON.parse(data);
            var temperatureNYC = weatherData.main.feels_like; 
            var temperatureDescription =  weatherData.weather[0].description;
            res.send('the temperature in NYC is '+ temperatureNYC+" and it is descripve as "+temperatureDescription)
        });
    });
    
});


app.listen(3000, function(){
    console.log('listen in 3000');
});