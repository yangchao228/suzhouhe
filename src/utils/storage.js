// storage.js
const STORAGE_KEY = 'suzhou_river_app';

export const storage = {
  getData() {
    const data = localStorage.getItem(STORAGE_KEY);
    return data ? JSON.parse(data) : null;
  },

  setData(data) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
  },

  clearData() {
    localStorage.removeItem(STORAGE_KEY);
  }
};