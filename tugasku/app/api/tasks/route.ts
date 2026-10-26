import { prisma } from "@/lib/prisma";
import type { TaskInput } from "@/lib/types";

export async function GET() {
  const tasks = await prisma.task.findMany({
    orderBy: [{ done: "asc" }, { deadline: "asc" }],
  });
  return Response.json(tasks);
}

export async function POST(request: Request) {
  const body = (await request.json()) as Partial<TaskInput>;
  const { title, course, description, deadline } = body;

  if (!title?.trim() || !course?.trim() || !deadline) {
    return Response.json({ message: "Judul, mata kuliah, dan deadline wajib diisi." }, { status: 400 });
  }

  const task = await prisma.task.create({
    data: {
      title: title.trim(),
      course: course.trim(),
      description: description?.trim() || null,
      deadline: new Date(deadline),
    },
  });

  return Response.json(task, { status: 201 });
}