type StatCardProps = {
  label: string;
  value: number;
  variant?: "primary" | "success" | "warning" | "danger";
};

export default function StatCard({ label, value, variant = "primary" }: StatCardProps) {
  return (
    <div className={`stat-card border-start border-4 border-${variant} bg-body p-3 rounded shadow-sm`}>
      <div className="text-body-secondary small">{label}</div>
      <div className={`fs-2 fw-bold text-${variant}`}>{value}</div>
    </div>
  );
}