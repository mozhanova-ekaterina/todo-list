"use client";
import { useState } from "react";
import Header from "./components/Header";
import TaskForm from "./components/TaskForm";
import TaskList from "./components/TaskList";
import { useLocalStorage } from "./hooks/useLocalStorage";
import { Layout } from "./components/layouts/Layout";
import { TaskFilters } from "./components/TaskFilters";

export default function Home() {
  const [tasks, setTasks] = useLocalStorage("tasks", []);
  const [isAdding, setIsAdding] = useState(true);

  return (
    <Layout aside={<TaskForm setIsAdding={setIsAdding} setTasks={setTasks} />} header={<Header setIsAdding={setIsAdding} />}>
      <TaskFilters />
      <TaskList tasks={tasks} setTasks={setTasks} />
    </Layout>
  );
}

