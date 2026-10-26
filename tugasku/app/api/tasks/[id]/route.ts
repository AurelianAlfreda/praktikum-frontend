import { prisma } from "@/lib/prisma";
import type { Prisma } from "@/generated/prisma/client";

type Context = { params: Promise<{ id: string }> };

export async function GET(_request: Request, { params }: Context) {
  const id = Number((await params).id);
  const task = await prisma.task.findUnique({ where: { id } });
  if (!task) return Response.json({ message: "Tugas tidak ditemukan." }, { status: 404 });
  return Response.json(task);
}

export async function PATCH(request: Request, { params }: Context) {
  const id = Number((await params).id);
  const body = await request.json();
  const data: Prisma.TaskUpdateInput = {};

  if (typeof body.done === "boolean") data.done = body.done;
  if (body.title) data.title = body.title.trim();
  if (body.course) data.course = body.course.trim();
  if (body.deadline) data.deadline = new Date(body.deadline);

  try {
    const task = await prisma.task.update({ where: { id }, data });
    return Response.json(task);
  } catch {
    return Response.json({ message: "Tugas tidak ditemukan." }, { status: 404 });
  }
}

export async function DELETE(_request: Request, { params }: Context) {
  const id = Number((await params).id);
  try {
    await prisma.task.delete({ where: { id } });
    return Response.json({ message: "Tugas dihapus." });
  } catch {
    return Response.json({ message: "Tugas tidak ditemukan." }, { status: 404 });
  }
}