import Link from "next/link";
import { connection } from "next/server";
import { prisma } from "@/lib/prisma";
import StatCard from "@/components/StatCard";
import Card from "@/components/Card";

export default async function HomePage() {
  await connection();
  const [total, selesai] = await Promise.all([
    prisma.task.count(),
    prisma.task.count({ where: { done: true } }),
  ]);

  return (
    <>
      <section className="hero p-4 p-md-5 mb-4">
        <h1 className="fw-bold">Kelola tugas kuliah dengan rapi</h1>
        <p className="lead mb-4">Catat tugas, pantau deadline, dan tandai yang sudah selesai.</p>
        <Link href="/tugas" className="btn btn-light btn-lg">
          Lihat Daftar Tugas
        </Link>
      </section>
      <div className="row g-3 mb-4">
        <div className="col-md-4"><StatCard label="Total tugas" value={total} /></div>
        <div className="col-md-4"><StatCard label="Sudah selesai" value={selesai} variant="success" /></div>
        <div className="col-md-4"><StatCard label="Belum selesai" value={total - selesai} variant="warning" /></div>
      </div>
    </>
  );
}