import Link from "next/link";
import { notFound } from "next/navigation";
import { prisma } from "@/lib/prisma";
import Card from "@/components/Card";

type PageProps = { params: Promise<{ id: string }> };

export default async function DetailTugasPage({ params }: PageProps) {
  const { id } = await params;
  const task = await prisma.task.findUnique({ where: { id: Number(id) } });

  if (!task) notFound();

  const fmt = (d: Date) => d.toLocaleDateString("id-ID", { dateStyle: "full" });

  return (
    <div className="row justify-content-center">
      <div className="col-lg-8">
        <nav aria-label="breadcrumb">
          <ol className="breadcrumb">
            <li className="breadcrumb-item"><Link href="/tugas">Daftar Tugas</Link></li>
            <li className="breadcrumb-item active">Detail</li>
          </ol>
        </nav>
        <Card title={task.title} subtitle={task.course} footer={<Link href="/tugas" className="btn btn-outline-primary btn-sm">Kembali</Link>}>
          <span className={`badge mb-3 ${task.done ? "text-bg-success" : "text-bg-warning"}`}>
            {task.done ? "Selesai" : "Belum selesai"}
          </span>
          <p>{task.description || <em className="text-body-secondary">Tanpa keterangan.</em>}</p>
        </Card>
      </div>
    </div>
  );
}