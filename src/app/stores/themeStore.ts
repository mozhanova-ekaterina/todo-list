import { makeAutoObservable } from "mobx";
import { TTheme } from "../types";


class ThemeStore {
  theme: TTheme = "light";

  constructor() {
    makeAutoObservable(this);
    if (typeof window !== "undefined") {
      this.loadTheme();
    }
  }

  setTheme = (newTheme: TTheme) => {
    this.theme = newTheme;
    this.applyThemeToDOM();
    this.saveTheme();
  }

  get isDark() {
    return this.theme === "dark";
  }

  toggleTheme = () => {
    this.theme = this.theme === "light" ? "dark" : "light";
    this.saveTheme();
    this.applyThemeToDOM();
  };

  private loadTheme() {
    const savedTheme = localStorage.getItem("theme") as TTheme | null;
    if (savedTheme) {
      this.theme = savedTheme;
      this.applyThemeToDOM();
    }
  }

  private saveTheme() {
    localStorage.setItem("theme", this.theme);
  }

  private applyThemeToDOM() {
    if (this.isDark) {
      document.documentElement.dataset.theme = "dark";
    } else {
      document.documentElement.dataset.theme = "light";
    }
    console.log(this.theme);
  }
}

const themeStore = new ThemeStore();
export default themeStore;
