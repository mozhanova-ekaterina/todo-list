"use client";
import Header from "./components/Header";
import TaskFilters from "./components/TaskFilters";
import TaskForm from "./components/TaskForm";
import TaskList from "./components/TaskList";
import { Layout } from "./components/layouts/Layout";

export default function Home() {

  return (
    <Layout aside={<TaskForm />} header={<Header />}>
      <TaskFilters />
      <TaskList />
    </Layout>
  );
}
