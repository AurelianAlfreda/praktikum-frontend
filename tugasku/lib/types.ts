import type { Task } from "@/generated/prisma/client";
export type { Task };

export type TaskDTO = Omit<Task, "deadline" | "createdAt" | "updatedAt"> & {
  deadline: string;
  createdAt: string;
  updatedAt: string;
};

export type TaskInput = {
  title: string;
  course: string;
  description: string;
  deadline: string;
};