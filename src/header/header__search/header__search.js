import { getElementBySelector } from "../../helpers.js";
import storage from "../../storage.js";

export default class Search {
  constructor() {
    this.search = getElementBySelector(".header__search__input");
    this.searchButton = getElementBySelector(".header__search__button");
    this.searchAnswer = getElementBySelector(".header__search__answer");
    this.searchRecentCities = getElementBySelector(".header__search__recent-cities");
    this.currentCitiesList = null;
    this.recentCitiesList = [];
    this.theme = "light";

    this.onSearchButtonClick = this.onSearchButtonClick.bind(this);
    this.onCityInListClick = this.onCityInListClick.bind(this);
    this.prepareSearchInfo = this.prepareSearchInfo.bind(this);
    this.onRecentCityClick = this.onRecentCityClick.bind(this);
    this.applyDarkTheme = this.applyDarkTheme.bind(this);

    this.searchButton.addEventListener("click", this.onSearchButtonClick);
    this.search.addEventListener("keyup", this.onSearchButtonClick);
    this.searchRecentCities.addEventListener("click", this.onRecentCityClick);
    document.addEventListener("DOMContentLoaded", this.prepareSearchInfo);    
    document.addEventListener("applyDarkTheme", this.applyDarkTheme);
  }

  applyDarkTheme() {
    this.searchButton.classList.add("dark-theme");
    this.theme = "dark-theme";
  }

  applyDarkThemeOnSearchAnswerItems(itemElem) {
    itemElem.classList.add("dark-theme");
  }

  getWeatherOfChosenCity(cityInfo) {
    document.dispatchEvent(new CustomEvent("cityWasChosen", { detail: cityInfo}));
  }

  onRecentCityClick({target}) {
    const cityName = target.textContent;
    const cityInfo = this.recentCitiesList.find((city) => city.city === cityName);
    this.getWeatherOfChosenCity(cityInfo);
  }

  prepareSearchInfo() {
    this.recentCitiesList = storage.getInfo("recentCities");
    if (this.recentCitiesList.length === 0) return;
    this.recentCitiesList.forEach(({city}) => {
      this.createRecentCityElement(city);
    });
    this.showRecentCities();
  }

  getInfoAboutChosenCity(target) {
    const index = target.getAttribute("key");
    return {
      city: this.currentCitiesList[index].city,
      country: this.currentCitiesList[index].country,
      lat: this.currentCitiesList[index].lat,
      lon: this.currentCitiesList[index].lon,
    };
  }

  clearSearch() {
    this.search.value = "";
  }

  createRecentCityElement(cityName) {
    const cityElem = document.createElement("span");
    cityElem.classList.add("header__search__recent-cities__city");
    cityElem.textContent = cityName;
    this.searchRecentCities.append(cityElem);
  }

  showRecentCities() {
    this.searchRecentCities.style.display = "flex";
  }

  checkAmountOfRecentCities() {
    if (this.recentCitiesList.length > 5) {
      this.recentCitiesList.shift();
      this.searchRecentCities.children[0].remove();
    }
  }

  saveRecentCitiesList(cityInfo) {
    const ifCitySaved = this.recentCitiesList.find((city) => city.city === cityInfo.city);
    if (ifCitySaved) return;
    this.recentCitiesList.push(cityInfo);
    this.checkAmountOfRecentCities();
    storage.save("recentCities", this.recentCitiesList);
    return "saved";
  }

  onCityInListClick({target}) {
    this.hideListOfCitiesElements();
    this.clearSearch();

    const cityInfo = this.getInfoAboutChosenCity(target);
    this.getWeatherOfChosenCity(cityInfo);
    
    const ifSaved = this.saveRecentCitiesList(cityInfo);  
    if (!ifSaved) return;  
    this.createRecentCityElement(cityInfo.city);
    this.showRecentCities();
  }

  createListOfCitiesElements(listOfCities) {
    if (typeof listOfCities === "string") {
      this.searchAnswer.textContent = listOfCities;
      return;
    }
    listOfCities.forEach(({ city, country = "", state = "" }, index) => {
      const cityElement = document.createElement("div");
      cityElement.classList.add("header__search__answer__item");
      if (this.theme === "dark-theme") this.applyDarkThemeOnSearchAnswerItems(cityElement);
      cityElement.setAttribute("key", index);
      cityElement.addEventListener("click", this.onCityInListClick);

      if (city && country && state) {
        cityElement.textContent = `
          ${city}, ${country}, ${state}
        `;
      } else if (city && country) {
        cityElement.textContent = `
          ${city}, ${country}
        `;
      } else {
        cityElement.textContent = `
          ${city}
        `;
      }

      this.searchAnswer.append(cityElement);
    });
  }

  showListOfCitiesElements() {
    this.searchAnswer.style.display = "block";
  }

  hideListOfCitiesElements() {
    this.searchAnswer.style.display = "none";
  }

  clearListOfCitiesElements() {
    this.searchAnswer.textContent = "";
  }

  saveCurrentListOFCities(listOfCities) {
    this.currentCitiesList = listOfCities;
  }

  async onSearchButtonClick(event) {
    this.clearListOfCitiesElements();
    this.hideListOfCitiesElements();

    if (
      (event.type === "click" || event.code === "Enter") 
      && this.search.value.trim() !== ""
    ) {
      try {
        const responce = await fetch("/listCities", {
          method: "POST",
          body: JSON.stringify({ city: this.search.value }),
          headers: {
            "Content-Type": "application/json",
          },
        });

        const listOfCities = await responce.json();

        this.createListOfCitiesElements(listOfCities);
        this.saveCurrentListOFCities(listOfCities);
      } catch (error) {
        alert(`Error loading cities: ${error}`);
      }

      this.showListOfCitiesElements();
    }
  }
}
