"use client";
import Header from "./components/Header";
import TaskForm from "./components/TaskForm";
import TaskList from "./components/TaskList";
import { Layout } from "./components/layouts/Layout";
import { TaskFilters } from "./components/TaskFilters";

export default function Home() {

  return (
    <Layout aside={<TaskForm />} header={<Header />}>
      <TaskFilters />
      <TaskList />
    </Layout>
  );
}
