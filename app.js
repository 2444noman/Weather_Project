
const express = require("express");
const https = require("https");

const app = express();
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
    res.sendFile(__dirname + "/index.html");
});

app.post("/", (req, res) => {

    const query = req.body.cityName;
    const apiKey = "688666f345fd065b7d37cfda6afc6bb0";
    const unit = "metric";

    const url = `https://api.openweathermap.org/data/2.5/weather?q=${query}&units=${unit}&appid=${apiKey}`;
    https.get(url, (response) => {
        console.log(response.statusCode);

        response.on("data", (data) => {
            const weatherData = JSON.parse(data);

            const temp = weatherData.main.temp;
            const description = weatherData.weather[0].description;
            const icon = weatherData.weather[0].icon;

            res.write(`<p>The weather is currently ${description}.</p>`);
            res.write(`<h1>The temperature in ${query} is ${temp} degrees Celsius.</h1>`);
            res.write(`<img src="http://openweathermap.org/img/wn/${icon}@2x.png" alt="icon">`);

            res.send();
        });
    });
})




app.listen(3000, function() {
    console.log("Server 3000 is running");
});
