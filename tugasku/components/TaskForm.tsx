"use client";

import { useState, type ChangeEvent, type FormEvent } from "react";
import type { TaskDTO, TaskInput } from "@/lib/types";

const initialForm: TaskInput = { title: "", course: "", description: "", deadline: "" };
type TaskFormProps = { onCreated: (task: TaskDTO) => void; };

export default function TaskForm({ onCreated }: TaskFormProps) {
  const [form, setForm] = useState<TaskInput>(initialForm);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  function handleChange(event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
    const { name, value } = event.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError("");
    if (!form.title.trim() || !form.course.trim() || !form.deadline) {
      setError("Judul, mata kuliah, dan deadline wajib diisi.");
      return;
    }
    setLoading(true);
    try {
      const res = await fetch("/api/tasks", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.message);
      onCreated(data as TaskDTO);
      setForm(initialForm);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Gagal menyimpan tugas.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} noValidate>
      {error && <div className="alert alert-danger py-2">{error}</div>}
      <div className="mb-3">
        <label htmlFor="title" className="form-label">Judul tugas</label>
        <input id="title" name="title" className="form-control" value={form.title} onChange={handleChange} />
      </div>
      <div className="mb-3">
        <label htmlFor="course" className="form-label">Mata kuliah</label>
        <input id="course" name="course" className="form-control" value={form.course} onChange={handleChange} />
      </div>
      <div className="mb-3">
        <label htmlFor="deadline" className="form-label">Deadline</label>
        <input id="deadline" name="deadline" type="date" className="form-control" value={form.deadline} onChange={handleChange} />
      </div>
      <div className="mb-3">
        <label htmlFor="description" className="form-label">Keterangan (opsional)</label>
        <textarea id="description" name="description" rows={3} className="form-control" value={form.description} onChange={handleChange} />
      </div>
      <button type="submit" className="btn btn-primary w-100" disabled={loading}>
        {loading ? "Menyimpan..." : "Tambah Tugas"}
      </button>
    </form>
  );
}