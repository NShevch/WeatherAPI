import dateFunctionality from "../../date.js";
import { getElementBySelector } from "../../helpers.js";

export default class Card {
  constructor() {
    this.cardInfoWeather = getElementBySelector(".header__card__info__weather");
    this.cardInfoCityAndDate = getElementBySelector(
      ".header__card__info__city-and-date"
    );
    this.cardTemperature = getElementBySelector(".header__card__temperature");
    this.card = {
      icon: this.cardInfoWeather.children[0],
      temperature: this.cardInfoWeather.children[1].children[0],
      weather: this.cardInfoWeather.children[1].children[1],
      weatherDescription: this.cardInfoWeather.children[1].children[2],
      temperatureMin: this.cardTemperature.children[0].children[1],
      temperatureMax: this.cardTemperature.children[1].children[1],
      city: this.cardInfoCityAndDate.children[0],
      date: this.cardInfoCityAndDate.children[1],
    };
    this.defaultCity = {
      city: "Odesa",
      country: "Ukraine",
      lat: "46.4843023",
      lon: "30.7322878",
    };
    this.theme = "light";

    this.loadAndShowWeatherOfChosenCity = this.loadAndShowWeatherOfChosenCity.bind(this);
    this.applyDarkTheme = this.applyDarkTheme.bind(this);

    window.addEventListener("load", this.loadAndShowWeatherOfChosenCity);
    document.addEventListener("cityWasChosen", this.loadAndShowWeatherOfChosenCity);
    document.addEventListener("applyDarkTheme", this.applyDarkTheme);
  }

  applyDarkTheme() {
    this.theme = "dark-theme";
  }

  applyDarkThemeOnWeatherIcons(icon) {
    const iconCode = icon.substring(0, 2);
    return (
      (iconCode === "01" || iconCode === "02" || iconCode === "10") ? 
      `url(../../../assets/images/weather_icons/${iconCode}n.png)` :
      `url(../../../assets/images/weather_icons/${iconCode}d.png)`
    );
  }

  getCurrentDate() {
    return dateFunctionality.getDateMonthYearFormatted();
  }

  formatTemperature({temp, tempMax, tempMin}) {   
    temp = Math.round(temp);
    tempMax = Math.round(tempMax);
    tempMin = Math.round(tempMin);

    return {temp, tempMax, tempMin} = {
      temp: temp > 0 ? `+${temp}` : temp,
      tempMax: tempMax > 0 ? `+${tempMax}` : tempMax,
      tempMin: tempMin > 0 ? `+${tempMin}` : tempMin,
    };
  }

  showWeatherOfChosenCity({ city, country, icon, temp, main, description, tempMin, tempMax}) {
    const {date, month, year} = this.getCurrentDate();
    const temperature = this.formatTemperature({temp, tempMax, tempMin});

    this.card.icon.style.backgroundImage = 
      this.theme === "dark-theme" ?
      this.applyDarkThemeOnWeatherIcons(icon) :
      `url(../../../assets/images/weather_icons/${icon.substring(0, 2)}d.png)`;
    this.card.temperature.textContent = temperature.temp + "°C";
    this.card.weather.textContent = main;
    this.card.weatherDescription.textContent = description;
    this.card.temperatureMin.textContent = temperature.tempMin + "°C";
    this.card.temperatureMax.textContent = temperature.tempMax + "°C";
    this.card.city.textContent = city + ", " + country;
    this.card.date.textContent = `
      ${date} ${month} ${year}
    `;
  }

  async loadAndShowWeatherOfChosenCity(event) {
    const cityInfo = event.detail || this.defaultCity;
    const coordinates = {
      lat: cityInfo.lat,
      lon: cityInfo.lon,
    };

    try {
      const responce = await fetch("/loadWeather", {
        method: "POST",
        body: JSON.stringify(coordinates),
        headers: {
          "Content-Type": "application/json",
        },
      });
      const weather = await responce.json();

      this.showWeatherOfChosenCity({
        city: cityInfo.city,
        country: cityInfo.country,
        ...weather
      });

    } catch (error) {
      alert(`Error loading weather: ${error}`);
    }
  }
}
