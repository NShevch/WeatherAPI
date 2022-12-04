import { getElementBySelector } from "../../helpers.js"

export default class PopularCities {
  constructor() {
    this.popularCitiesSection = getElementBySelector(".main__popular-cities");
    this.cities = {
      "New-York": {
        city: "New York County",
        country: "United States of America",
        lat: 40.7127281,
        lon: -74.0060152,
      },
      London: {
        city: "London",
        country: "United Kingdom",
        lat: 51.5073219,
        lon: -0.1276474,
      },
      Dubai: {
        city: "Dubai",
        country: "United Arab Emirates",
        lat: 25.2653471,
        lon: 55.2924914,
      },
      Paris: {
        city: "Paris",
        country: "France",
        lat: 48.8588897,
        lon: 2.3200410217200766,
      },
    };

    this.onPopularCityClick = this.onPopularCityClick.bind(this);

    this.popularCitiesSection.addEventListener("click", this.onPopularCityClick);
  }

  onPopularCityClick({ target }) {
    if (target.classList.contains("main__popular-cities")) return;
    const city = target.textContent.trim();
    const chosenCityInfo = this.cities[city];
    document.dispatchEvent(new CustomEvent("cityWasChosen", {detail: chosenCityInfo}));
  }
}