import bodyParser from "body-parser";
import express from "express";
import iso from "i18n-iso-countries";
import WeatherAPI from "./src/WeatherAPI.js";

const expressApp = express();
const port = "9989";
const weatherAPI = new WeatherAPI();
const jsonParser = new bodyParser.json();

expressApp.use(express.static("./"));

expressApp.post("/listCities", jsonParser, async (req, res) => {
  const cityEntered = req.body.city;
  const citiesInfoLoaded = await weatherAPI.getListOfCities(cityEntered);
  if (citiesInfoLoaded.length) {
    const citiesList = citiesInfoLoaded.map(
      ({ name, country, state, lat, lon }) => {
        return {
          city: name,
          country: iso.getName(country, "en"),
          state: state,
          lat: lat,
          lon: lon,
        };
      }
    );
    return res.send(JSON.stringify(citiesList));
  }
  res.send(JSON.stringify("No cities found!"));
});

expressApp.post("/loadWeather", jsonParser, async (req, res) => {
  const coordinates = req.body;
  const weatherInfo = await weatherAPI.getWeather(coordinates);

  res.send(JSON.stringify({
    main: weatherInfo.weather[0].main,
    description: weatherInfo.weather[0].description,
    icon: weatherInfo.weather[0].icon,
    temp: weatherInfo.main.temp,
    tempMax: weatherInfo.main.temp_max,
    tempMin: weatherInfo.main.temp_min,
  }));
});

expressApp.listen(port);
