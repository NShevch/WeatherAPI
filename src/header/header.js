import { getElementBySelector } from "../helpers.js";
import storage from "../storage.js";
import Card from "./header__card/header__card.js";
import Search from "./header__search/header__search.js";

export default class Header {
  constructor() {
    this.search = new Search();
    this.card = new Card();
    this.headerSection = getElementBySelector(".header");

    this.applyDarkTheme = this.applyDarkTheme.bind(this);

    document.addEventListener("applyDarkTheme", this.applyDarkTheme);
  }

  applyDarkTheme() {
    this.headerSection.classList.add("dark-theme");
  }
}
