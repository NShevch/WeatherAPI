const storage = {
  getInfo(key) {
    const result = localStorage.getItem(key);
		if (result !== null) {
      return JSON.parse(result);
    }
    return [];
  },
  save(key, value) {
    localStorage.setItem(key, JSON.stringify(value));
  },
  delete(key) {
    localStorage.removeItem(key);
  },
}

export default storage;