"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

interface AdminSideMenuProps {
  isOpen: boolean;
  onClose: () => void;
}

interface MenuItem {
  label: string;
  href: string;
  icon: React.ReactNode;
}

interface MenuSection {
  title: string;
  items: MenuItem[];
}

const IconUsers = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
    <path d="M8 8a3 3 0 100-6 3 3 0 000 6zM3 14a5 5 0 0110 0H3z" />
  </svg>
);

const IconClock = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
    <path d="M8 1a7 7 0 100 14A7 7 0 008 1zm1 7.5H7V4h2v3.5H11V9H9V8.5z" />
  </svg>
);

const IconCheck = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
    <path d="M13 4.5L6 11.5 3 8.5l1.4-1.4L6 8.7l5.6-5.6L13 4.5z" />
  </svg>
);

const IconX = () => (
  <svg
    width="16"
    height="16"
    viewBox="0 0 16 16"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.8"
    strokeLinecap="round"
  >
    <path d="M4 4l8 8M12 4l-8 8" />
  </svg>
);

const IconTimer = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
    <path d="M8 2a6 6 0 100 12A6 6 0 008 2zm.75 6.75h-1.5v-4h1.5v4z" />
    <path d="M6 1h4v1.5H6V1z" />
  </svg>
);

const IconTag = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
    <path d="M2 2h6l6 6-6 6-6-6V2zm3 2a1 1 0 100 2 1 1 0 000-2z" />
  </svg>
);

const IconCoin = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
    <path d="M8 1a7 7 0 100 14A7 7 0 008 1zm.5 10h-1V9.9A2 2 0 017 8a2 2 0 011.5-1.94V5h1v1.06A2 2 0 0111 8a2 2 0 01-1.5 1.94V11h-1z" />
  </svg>
);

const IconSchedule = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
    <path d="M4 1v1H2a1 1 0 00-1 1v11a1 1 0 001 1h12a1 1 0 001-1V3a1 1 0 00-1-1h-2V1h-1.5v1h-5V1H4zm-2 4h12v8H2V5zm2 2v1.5h1.5V7H4zm3 0v1.5h1.5V7H7zm3 0v1.5h1.5V7H10zM4 10v1.5h1.5V10H4zm3 0v1.5h1.5V10H7z" />
  </svg>
);

export default function AdminSideMenu({ isOpen, onClose }: AdminSideMenuProps) {
  const pathname = usePathname();

  const sections: MenuSection[] = [
    {
      title: "Principal",
      items: [
        {
          label: "Colaboradores",
          href: "/admin/collaborators",
          icon: <IconUsers />,
        },
      ],
    },
    {
      title: "Turnos",
      items: [
        {
          label: "Confirmar Disponibilidades",
          href: "/admin/availabilities",
          icon: <IconClock />,
        },
        {
          label: "Concluir / Cancelar Turnos",
          href: "/admin/scheduling",
          icon: <IconSchedule />,
        },
        {
          label: "Turnos Concluídos",
          href: "/admin/scheduling/completed",
          icon: <IconCheck />,
        },
        {
          label: "Turnos Cancelados",
          href: "/admin/scheduling/canceled",
          icon: <IconX />,
        },
      ],
    },
    {
      title: "Configurações",
      items: [
        {
          label: "Tolerância de Ponto",
          href: "/admin/tolerancePoint",
          icon: <IconTimer />,
        },
        {
          label: "Categorias",
          href: "/admin/category",
          icon: <IconTag />,
        },
        {
          label: "Remuneração",
          href: "/admin/calculateRule",
          icon: <IconCoin />,
        },
      ],
    },
  ];

  return (
    <div>
      {isOpen && (
        <div onClick={onClose} className="fixed inset-0 bg-black/50 z-40 " />
      )}

      <aside
        className={`
          fixed top-0 left-0 h-full w-64 z-50 flex flex-col
          bg-[#0f1b2d] border-r border-white/[0.07]
          transform transition-transform duration-300 ease-in-out
          ${isOpen ? "translate-x-0" : "-translate-x-full"}
        `}
      >
        <div className="flex items-center gap-3 px-5 py-5 border-b border-white/[0.07]">
          <div className="w-9 h-9 rounded-[9px] bg-blue-600 flex items-center justify-center shrink-0">
            <svg width="18" height="18" viewBox="0 0 20 20" fill="none">
              <path
                d="M4 10h12M10 4v12"
                stroke="#fff"
                strokeWidth="2"
                strokeLinecap="round"
              />
              <circle
                cx="10"
                cy="10"
                r="8"
                stroke="#93c5fd"
                strokeWidth="1.5"
                fill="none"
              />
            </svg>
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-semibold text-slate-100 tracking-wide">
              HELSA
            </p>
            <p className="text-[11px] text-slate-500 mt-0.5">
              Gestão de Turnos
            </p>
          </div>
        </div>

        <nav className="flex-1 overflow-y-auto px-2.5 py-6 scrollbar-thin scrollbar-thumb-white/10">
          {sections.map((section, si) => (
            <div key={si} className={si > 0 ? "mt-1" : ""}>
              <p className="px-2.5 pt-3 pb-1.5 text-[10px] font-semibold tracking-widest uppercase text-slate-600">
                {section.title}
              </p>
              {section.items.map((item) => {
                const isActive = pathname === item.href;
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    onClick={onClose}
                    className={`
                      relative flex items-center gap-2.5 px-2.5 py-2 mb-0.5
                      rounded-lg text-[13px] transition-all duration-150
                      ${
                        isActive
                          ? "bg-blue-500/20 text-blue-300 font-medium"
                          : "text-slate-400 hover:bg-white/3 hover:text-slate-200"
                      }
                    `}
                  >
                    {isActive && (
                      <span className="absolute left-0 top-1.5 bottom-1.5 w-[3px] bg-blue-500 rounded-r-full" />
                    )}

                    <span
                      className={`shrink-0 ${isActive ? "opacity-100" : "opacity-60"}`}
                    >
                      {item.icon}
                    </span>

                    <span className="flex-1 leading-snug">{item.label}</span>
                  </Link>
                );
              })}
            </div>
          ))}
        </nav>

        <div className="flex items-center gap-2.5 px-4 py-3.5 border-t border-white/[0.07] cursor-pointer hover:bg-white/3 transition-colors">
          <div className="w-8 h-8 rounded-full bg-linear-to-br from-blue-500 to-violet-600 flex items-center justify-center text-[12px] font-semibold text-white shrink-0">
            A
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-[12px] font-medium text-slate-200 truncate">
              Admin
            </p>
            <p className="text-[11px] text-slate-500 truncate">Administrador</p>
          </div>
        </div>
      </aside>
    </div>
  );
}
