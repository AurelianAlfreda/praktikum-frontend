import type { Metadata } from "next";
import { connection } from "next/server";
import { prisma } from "@/lib/prisma";
import TaskList from "@/components/TaskList";
import type { TaskDTO } from "@/lib/types";

export const metadata: Metadata = { title: "Daftar Tugas | TugasKu" };

export default async function TugasPage() {
  await connection();
  const tasks = await prisma.task.findMany({
    orderBy: [{ done: "asc" }, { deadline: "asc" }],
  });

  const data: TaskDTO[] = tasks.map((t) => ({
    ...t,
    deadline: t.deadline.toISOString(),
    createdAt: t.createdAt.toISOString(),
    updatedAt: t.updatedAt.toISOString(),
  }));

  return (
    <>
      <h1 className="h3 mb-4">Daftar Tugas</h1>
      <TaskList initialTasks={data} />
    </>
  );
}