"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import {
  LayoutDashboard,
  Music2,
  ListMusic,
  Radio,
  Sparkles,
  Settings,
  LifeBuoy,
} from "lucide-react"
import { cn } from "@/lib/utils"

const nav = [
  { href: "/", label: "Inicio", icon: LayoutDashboard },
  { href: "/library", label: "Canciones", icon: Music2 },
  { href: "/setlists", label: "Setlists", icon: ListMusic },
  { href: "/live", label: "En Vivo", icon: Radio },
  { href: "/settings", label: "Configuración", icon: Settings },
]

export function Sidebar({ onNavigate }: { onNavigate?: () => void }) {
  const pathname = usePathname()

  return (
    <div className="flex h-full flex-col bg-sidebar text-sidebar-foreground">
      <div className="flex h-16 items-center gap-2.5 border-b border-sidebar-border px-5">
        <div className="flex size-8 items-center justify-center rounded-lg bg-primary text-primary-foreground">
          <Radio className="size-4.5" />
        </div>
        <div className="leading-tight">
          <p className="text-sm font-semibold tracking-tight">StageLyrics</p>
          <p className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground">
            AI
          </p>
        </div>
      </div>

      <nav className="flex-1 space-y-1 overflow-y-auto p-3">
        <p className="px-2 pb-1 pt-2 font-mono text-[10px] uppercase tracking-widest text-muted-foreground">
          Área de trabajo
        </p>
        {nav.map((item) => {
          const active =
            item.href === "/" ? pathname === "/" : pathname.startsWith(item.href)
          const Icon = item.icon
          return (
            <Link
              key={item.href}
              href={item.href}
              onClick={onNavigate}
              className={cn(
                "flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-colors",
                active
                  ? "bg-sidebar-accent text-sidebar-accent-foreground"
                  : "text-muted-foreground hover:bg-sidebar-accent/60 hover:text-sidebar-foreground",
              )}
            >
              <Icon
                className={cn("size-4.5", active && "text-primary")}
                aria-hidden="true"
              />
              {item.label}
            </Link>
          )
        })}
      </nav>

      <div className="p-3">
        <div className="rounded-xl border border-sidebar-border bg-sidebar-accent/40 p-4">
          <div className="flex items-center gap-2 text-sm font-medium">
            <Sparkles className="size-4 text-primary" aria-hidden="true" />
            Asistente IA
          </div>
          <p className="mt-1.5 text-xs leading-relaxed text-muted-foreground">
            Formatea letras, transpone tonalidades y genera pistas desde una grabación.
          </p>
          <button className="mt-3 w-full rounded-lg bg-primary px-3 py-1.5 text-xs font-semibold text-primary-foreground transition-colors hover:bg-primary/90">
            Herramientas IA
          </button>
        </div>

        <Link
          href="/settings"
          onClick={onNavigate}
          className="mt-3 flex items-center gap-3 rounded-lg px-3 py-2 text-sm text-muted-foreground transition-colors hover:text-sidebar-foreground"
        >
          <LifeBuoy className="size-4.5" aria-hidden="true" />
          Ayuda y soporte
        </Link>
      </div>
    </div>
  )
}
