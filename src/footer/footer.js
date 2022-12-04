import { getElementBySelector } from "../helpers.js";
import date from "../date.js"

export default class Footer {
  constructor() {
    this.yearElement = getElementBySelector(".footer__text-year");

    this.showCurrentYear = this.showCurrentYear.bind(this);

    document.addEventListener("DOMContentLoaded", this.showCurrentYear);
  }

  showCurrentYear() {
    this.yearElement.textContent = date.getYear();
  }
}