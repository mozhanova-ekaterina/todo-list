"use client";
import { useEffect } from "react";
import Header from "./components/Header";
import TaskFilters from "./components/TaskFilters";
import TaskForm from "./components/TaskForm";
import TaskList from "./components/TaskList";
import { Layout } from "./components/layouts/Layout";
import { TTheme } from "./types";
import themeStore from "./stores/themeStore";

export default function Home() {
  useEffect(() => {
    const savedTheme = localStorage.getItem("theme");
    if (savedTheme) {
      themeStore.setTheme(savedTheme as TTheme);
    }
  }, []);

  return (
    <Layout aside={<TaskForm />} header={<Header />}>
      <TaskFilters />
      <TaskList />
    </Layout>
  );
}
