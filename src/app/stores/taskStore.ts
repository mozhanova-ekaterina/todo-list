import { makeAutoObservable } from "mobx";
import { ITag, ITask, TSortKey, TSortOrder, TFilter } from "../types";
import { differenceInMinutes, isToday } from "date-fns";

class TaskStore {
  tasks: ITask[] = [];
  currentFilter: TFilter = "all";
  selectedTags: ITag[] = [];
  searchQuery: string = "";
  sortKey: TSortKey = "none";
  sortOrder: TSortOrder = "asc";

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

  private sortByPriority(a: ITask, b: ITask) {
    const priorityOrder = { low: 1, medium: 2, high: 3 };
    return priorityOrder[a.priority] - priorityOrder[b.priority];
  }

  private sortByDate(a: ITask, b: ITask) {
    const dateA = new Date(a.dueDate).getTime() || Infinity;
    const dateB = new Date(b.dueDate).getTime() || Infinity;
    return dateA - dateB;
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

  setSorting = (key: TSortKey) => {
    if (this.sortKey === key) {
      this.sortOrder = this.sortOrder === "asc" ? "desc" : "asc";
    } else {
      this.sortKey = key;
      this.sortOrder = "asc";
    }
  };

  get sortedTasks() {
    const sorted = [...this.filteredTasks];
    if (this.sortKey === "none") return sorted;

    return sorted.sort((a, b) => {
      const modifier = this.sortOrder === "asc" ? 1 : -1;

      switch (this.sortKey) {
        case "priority":
          return this.sortByPriority(a, b) * modifier;

        case "dueDate":
          return this.sortByDate(a, b) * modifier;

        default:
          return 0;
      }
    });
  }

  get filteredTasks() {
    return this.tasks.filter((task) => {
      const matchesStatus =
        (this.currentFilter === "all" && !task.isCompleted) ||
        (this.currentFilter === "active" && !task.isCompleted) ||
        (this.currentFilter === "completed" && task.isCompleted);

      const matchesTags =
        this.selectedTags.length === 0 ||
        (task.tags &&
          task.tags.some((tag) =>
            this.selectedTags.map((tag) => tag.name).includes(tag.name)
          ));

      const matchesSearch =
        this.searchQuery === "" ||
        task.title.toLowerCase().includes(this.searchQuery.toLowerCase());

      const matchesToday =
        this.currentFilter === "today" &&
        task.dueDate &&
        differenceInMinutes(task.dueDate, new Date()) > 0 &&
        isToday(task.dueDate);

      const matchesOverdue =
        task.dueDate &&
        this.currentFilter === "overdue" &&
        differenceInMinutes(task.dueDate, new Date()) < 0 &&
        !task.isCompleted;

      return (
        (matchesStatus && matchesTags && matchesSearch) ||
        matchesToday ||
        matchesOverdue
      );
    });
  }

  get completedTasksList() {
    return this.tasks.filter((task) => task.isCompleted);
  }

  get overdueTaskList() {
    return this.tasks.filter(
      (task) =>
        task.dueDate &&
        differenceInMinutes(task.dueDate, new Date()) < 0 &&
        !task.isCompleted
    );
  }

  get tagsList() {
    const list: string[] = [];
    const result: ITag[] = [];
    this.tasks
      .map((task) => task.tags)
      .flat()
      .forEach(
        (tag) =>
          !list.includes(tag.name) && list.push(tag.name) && result.push(tag)
      );

    return result;
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
