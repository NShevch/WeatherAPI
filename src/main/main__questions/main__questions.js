import { getElementBySelector } from "../../helpers.js"

export default class Questions {
  constructor() {
    this.questionsSection = getElementBySelector(".main__questions-section");
    
    this.questionsSection.addEventListener("click", this.onQuestionClick);
  }

  onQuestionClick({target}) {
    if (target.classList.contains("main__questions__title")) {
      target.classList.toggle("main__questions_show");
    }
  }
}