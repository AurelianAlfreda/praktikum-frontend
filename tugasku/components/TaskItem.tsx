"use client";

import Link from "next/link";
import type { TaskDTO } from "@/lib/types";

type TaskItemProps = {
  task: TaskDTO;
  onToggle: (task: TaskDTO) => void;
  onDelete: (id: number) => void;
};

export default function TaskItem({ task, onToggle, onDelete }: TaskItemProps) {
  const deadline = new Date(task.deadline).toLocaleDateString("id-ID", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  return (
    <li className={`list-group-item d-flex align-items-start gap-3 task-item ${task.done ? "is-done" : ""}`}>
      <input
        type="checkbox"
        className="form-check-input mt-1 flex-shrink-0"
        checked={task.done}
        onChange={() => onToggle(task)}
      />
      <div className="flex-grow-1">
        <Link href={`/tugas/${task.id}`} className="task-title fw-semibold text-decoration-none">
          {task.title}
        </Link>
        <div className="small text-body-secondary">
          <span className="badge text-bg-light border me-2">{task.course}</span>
          Deadline: {deadline}
        </div>
      </div>
      <button className="btn btn-sm btn-outline-danger" onClick={() => onDelete(task.id)}>
        Hapus
      </button>
    </li>
  );
}