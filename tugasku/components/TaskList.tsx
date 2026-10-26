"use client";

import { useMemo, useState } from "react";
import Card from "./Card";
import TaskForm from "./TaskForm";
import TaskItem from "./TaskItem";
import type { TaskDTO } from "@/lib/types";

type Filter = "semua" | "belum" | "selesai";
const FILTERS: Filter[] = ["semua", "belum", "selesai"];
type TaskListProps = { initialTasks: TaskDTO[]; };

export default function TaskList({ initialTasks }: TaskListProps) {
  const [tasks, setTasks] = useState<TaskDTO[]>(initialTasks);
  const [filter, setFilter] = useState<Filter>("semua");
  const [keyword, setKeyword] = useState("");

  const visibleTasks = useMemo(() => {
    return tasks
      .filter((t) => (filter === "selesai" ? t.done : filter === "belum" ? !t.done : true))
      .filter((t) => `${t.title} ${t.course}`.toLowerCase().includes(keyword.toLowerCase()));
  }, [tasks, filter, keyword]);

  function handleCreated(newTask: TaskDTO) {
    setTasks((prev) => [newTask, ...prev]);
  }

  async function handleToggle(task: TaskDTO) {
    const res = await fetch(`/api/tasks/${task.id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ done: !task.done }),
    });
    if (res.ok) {
      const updated: TaskDTO = await res.json();
      setTasks((prev) => prev.map((t) => (t.id === updated.id ? updated : t)));
    }
  }

  async function handleDelete(id: number) {
    if (!confirm("Yakin ingin menghapus tugas ini?")) return;
    const res = await fetch(`/api/tasks/${id}`, { method: "DELETE" });
    if (res.ok) {
      setTasks((prev) => prev.filter((t) => t.id !== id));
    }
  }

  return (
    <div className="row g-4">
      <div className="col-lg-4">
        <Card title="Tugas Baru" subtitle="Isi formulir lalu simpan">
          <TaskForm onCreated={handleCreated} />
        </Card>
      </div>
      <div className="col-lg-8">
        <Card title={`Daftar Tugas (${visibleTasks.length})`}>
          <div className="d-flex flex-column flex-md-row gap-2 mb-3">
            <input
              type="search"
              className="form-control"
              placeholder="Cari judul atau mata kuliah..."
              value={keyword}
              onChange={(e) => setKeyword(e.target.value)}
            />
            <div className="btn-group" role="group">
              {FILTERS.map((f) => (
                <button
                  key={f}
                  type="button"
                  className={`btn btn-outline-primary text-capitalize ${filter === f ? "active" : ""}`}
                  onClick={() => setFilter(f)}
                >
                  {f}
                </button>
              ))}
            </div>
          </div>
          {visibleTasks.length === 0 ? (
            <p className="text-body-secondary mb-0">Tidak ada tugas yang cocok.</p>
          ) : (
            <ul className="list-group">
              {visibleTasks.map((task) => (
                <TaskItem key={task.id} task={task} onToggle={handleToggle} onDelete={handleDelete} />
              ))}
            </ul>
          )}
        </Card>
      </div>
    </div>
  );
}