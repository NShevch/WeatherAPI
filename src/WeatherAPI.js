import axios from "axios";

const key = process.env.open_weather_api;

export default class WeatherAPI {
  async getWeather({ lat, lon }) {
    const responce = await axios.get(
      `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${key}&units=metric`
    )
    const weatherInfo = await responce.data;
    return weatherInfo;
  }

  async getListOfCities(cityName) {
    const responce = await axios.get(
      `http://api.openweathermap.org/geo/1.0/direct?q=${cityName}&limit=5&appid=${key}`
    );
    const json = await responce.data;
    return json;
  }
}
