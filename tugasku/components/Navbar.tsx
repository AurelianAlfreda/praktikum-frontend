"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const menus = [
  { href: "/", label: "Beranda" },
  { href: "/tugas", label: "Daftar Tugas" },
  { href: "/tentang", label: "Company Profile" },
];

export default function Navbar() {
  const pathname = usePathname();

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-primary shadow-sm">
      <div className="container">
        <Link className="navbar-brand fw-bold" href="/">
          TugasKu
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#menuUtama"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="menuUtama">
          <ul className="navbar-nav ms-auto">
            {menus.map((menu) => {
              const active =
                menu.href === "/" ? pathname === "/" : pathname.startsWith(menu.href);
              return (
                <li className="nav-item" key={menu.href}>
                  <Link
                    href={menu.href}
                    className={`nav-link ${active ? "active fw-semibold border-bottom border-2 border-white" : ""}`}
                  >
                    {menu.label}
                  </Link>
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    </nav>
  );
}