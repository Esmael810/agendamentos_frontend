"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";

interface AdminSideMenuProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function AdimSideMenu({ isOpen, onClose }: AdminSideMenuProps) {
  const pathname = usePathname();

  const menu = [
    { label: "Colaboradores", href: "/admin/collaborators" },
    { label: "Confirmar/ Cancelar Disponibilidades Pendentes", href: "/admin/availabilities"},
    { label: "Concluir/ Cancelar Turnos", href: "/admin/scheduling" },
    { label: "Turnos Concluídos", href: "/admin/scheduling/completed" },
    { label: "Turnos Cancelados", href: "/admin/scheduling/canceled" },
    { label: "Adicionar Tolerancia de Ponto", href: "" },
    { label: "Adicionar Categoria", href: "/admin/category" },
    { label: "Adicionar Remuneração a Categorias", href: "" },
  ];

  return (
    <div>
      {isOpen && (
        <div onClick={onClose} className="fixed inset-0 bg-black/50 z-50 " />
      )}
      <aside
        className={`fixed h-full w-64 bg-blue-600 text-white font-bold p-4 z-50
          transform transition-transform duration-300
          ${isOpen ? "translate-x-0" : "-translate-x-full"}
        `}
      >
        <h2>Admin</h2>
        <nav>
          {menu.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={`block rounded px-3 py-2 hover:bg-blue-500
              ${pathname === item.href ? "bg-gray-700 font-semibold" : ""}
            `}
            >
              {""}
              {item.label}
            </Link>
          ))}
        </nav>
      </aside>
    </div>
  );
}
