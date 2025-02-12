import { makeAutoObservable } from "mobx";
import { ITag, ITask, TFilter } from "../types";

class TaskStore {
  tasks: ITask[] = [];
  currentFilter: TFilter = "all";
  selectedTags: ITag[] = [];
  searchQuery: string = "";

  constructor() {
    makeAutoObservable(this);
    this.loadFromLocalStorage();
    // this.saveToLocalStorage()
    // Если хотите использовать обычные методы >>
    // this.deleteTask = this.deleteTask.bind(this);
  }

  private loadFromLocalStorage() {
    const savedTasks = localStorage.getItem("tasks");
    if (savedTasks) {
      this.tasks = JSON.parse(savedTasks);
    }
  }

  private saveToLocalStorage() {
    localStorage.setItem("tasks", JSON.stringify(this.tasks));
  }

  addTask = (task: ITask) => {
    this.tasks.push(task);
    this.saveToLocalStorage();
  };

  updateTask = (task: ITask) => {
    this.tasks = this.tasks.map((t) => (t.id === task.id ? task : t));
    this.saveToLocalStorage();
  };

  deleteTask = (id: string) => {
    this.tasks = this.tasks.filter((task) => task.id !== id);
    this.saveToLocalStorage();
  };

  toggleTaskCompletion = (id: string) => {
    this.tasks = this.tasks.map((task) =>
      task.id === id ? { ...task, isCompleted: !task.isCompleted } : task
    );
    this.saveToLocalStorage();
  };

  setFilter = (filter: TFilter) => {
    this.currentFilter = filter;
  };

  setSearchQuery = (query: string) => {
    this.searchQuery = query;
  };

  setSelectedTags = (tags: ITag[]) => {
    this.selectedTags = tags;
  };

  get filteredTasks() {
    return this.tasks.filter((task) => {
      const matchesStatus =
        this.currentFilter === "all" ||
        (this.currentFilter === "active" && !task.isCompleted) ||
        (this.currentFilter === "completed" && task.isCompleted);

      const matchesTags =
        this.selectedTags.length === 0 ||
        (task.tags && task.tags.some((tag) => this.selectedTags.includes(tag)));

      const matchesSearch = task.title
        .toLowerCase()
        .includes(this.searchQuery.toLowerCase());

      return matchesStatus && matchesTags && matchesSearch;
    });
  }

  get completedTasksList() {
    return this.tasks.filter((task) => task.isCompleted);
  }
}

const taskStore = new TaskStore();
export default taskStore;

// Когда использовать что?
// Стрелочные функции:

// Всегда, когда методы передаются как колбэки

// Для MobX-стора это предпочтительный вариант

// Обычные методы:

// Если нужно наследование и переопределение методов

// Когда метод не покидает контекст класса
