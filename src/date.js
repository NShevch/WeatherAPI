const date = {
  getHours() {
    return new Date().getHours();
  },
  getDate() {
    return new Date().getDate();
  },
  getMonth() {
    return new Date().getMonth();
  },
  getMonthFormatted() {
    const monthNumber = this.getMonth();
    const month = (
      monthNumber === 0 ? "January" :
      monthNumber === 1 ? "February" :
      monthNumber === 2 ? "March" :
      monthNumber === 3 ? "April" :
      monthNumber === 4 ? "May" :
      monthNumber === 5 ? "June" :
      monthNumber === 6 ? "July" :
      monthNumber === 7 ? "August" :
      monthNumber === 8 ? "September" :
      monthNumber === 9 ? "October" :
      monthNumber === 10 ? "November" :
      "December"
    );
    return month;
  },
  getYear() {
    return new Date().getFullYear();
  },
  getDateMonthYearFormatted() {
    const date = this.getDate();
    const month = this.getMonthFormatted();
    const year = this.getYear();

    return {date, month, year};
  }
}

export default date;