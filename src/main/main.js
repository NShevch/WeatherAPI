import PopularCities from "./main__popular-cities/main__popular-cities.js";
import Questions from "./main__questions/main__questions.js";

export default class Main {
  constructor() {
    this.popularCities = new PopularCities();
    this.popularCities = new Questions();
  }
}