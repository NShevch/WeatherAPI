import date from "./date.js";
import Footer from "./footer/footer.js";
import Header from "./header/header.js";
import Main from "./main/main.js";

class App {
  constructor() {
    this.header = new Header();
    this.main = new Main();
    this.footer = new Footer();

    this.chooseAppTheme = this.chooseAppTheme.bind(this);

    window.addEventListener("load", this.chooseAppTheme);
  }

  determineCurrentTime() {
    const hours = date.getHours();
    if (6 <= hours < 21) {
      return "light";
    } else {
      return "night";
    }
  }

  chooseAppTheme() {
    const dayTime = this.determineCurrentTime();
    if (dayTime === "night") {
      document.dispatchEvent(new Event("applyDarkTheme"));
    }
  }
  
}

const app = new App();
