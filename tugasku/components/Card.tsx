import type { ReactNode } from "react";

type CardProps = {
  title?: string;
  subtitle?: string;
  children: ReactNode;
  footer?: ReactNode;
  className?: string;
};

export default function Card({ title, subtitle, children, footer, className = "" }: CardProps) {
  return (
    <div className={`card shadow-sm ${className}`}>
      <div className="card-body">
        {title && <h5 className="card-title">{title}</h5>}
        {subtitle && <h6 className="card-subtitle mb-2 text-body-secondary">{subtitle}</h6>}
        {children}
      </div>
      {footer && <div className="card-footer bg-transparent">{footer}</div>}
    </div>
  );
}