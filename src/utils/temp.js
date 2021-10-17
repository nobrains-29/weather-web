require("dotenv").config();
const https = require("https");

const temp = (address, callback) => {
  const apiKey = process.env.API_KEY;
  const url =
    "https://api.openweathermap.org/data/2.5/weather?q=" +
    encodeURIComponent(address) +
    "&appid=" +
    apiKey +
    "&units=metric";

  https.get(url, function (response, error) {
    if (error) {
      callback("Unable to connect to location services!", undefined);
    } else if (response.statusCode === 200) {
      response.on("data", function (data) {
        const weatherData = JSON.parse(data);
        const temperature = {
          name: weatherData.name,
          t: weatherData.main.temp,
          d: weatherData.weather[0].description,
        };
        callback(undefined, temperature);
      });
    } else {
      callback("Location not Found. Try another Search.", undefined);
    }
  });
};

module.exports = temp;
