"use client"

import { useState } from "react"
import Link from "next/link"
import { Search, Bell, Menu, X, Plus, Radio } from "lucide-react"
import { Sidebar } from "./sidebar"

export function Topbar() {
  const [mobileOpen, setMobileOpen] = useState(false)

  return (
    <>
      <header className="sticky top-0 z-30 flex h-16 items-center gap-3 border-b border-border bg-background/80 px-4 backdrop-blur-md md:px-6">
        <button
          className="inline-flex size-9 items-center justify-center rounded-lg border border-border text-muted-foreground transition-colors hover:text-foreground md:hidden"
          onClick={() => setMobileOpen(true)}
          aria-label="Open navigation"
        >
          <Menu className="size-5" />
        </button>

        <div className="relative hidden max-w-md flex-1 items-center sm:flex">
          <Search className="pointer-events-none absolute left-3 size-4 text-muted-foreground" />
          <input
            type="search"
            placeholder="Search songs, setlists, lyrics…"
            className="h-9 w-full rounded-lg border border-border bg-card pl-9 pr-16 text-sm outline-none transition-colors placeholder:text-muted-foreground focus:border-ring"
          />
          <kbd className="absolute right-3 hidden rounded border border-border bg-muted px-1.5 font-mono text-[10px] text-muted-foreground lg:inline">
            ⌘K
          </kbd>
        </div>

        <div className="ml-auto flex items-center gap-2">
          <Link
            href="/live"
            className="hidden items-center gap-1.5 rounded-lg border border-primary/40 bg-primary/10 px-3 py-2 text-sm font-medium text-primary transition-colors hover:bg-primary/20 sm:inline-flex"
          >
            <Radio className="size-4" />
            Go Live
          </Link>
          <Link
            href="/library"
            className="inline-flex items-center gap-1.5 rounded-lg bg-primary px-3 py-2 text-sm font-semibold text-primary-foreground transition-colors hover:bg-primary/90"
          >
            <Plus className="size-4" />
            <span className="hidden sm:inline">New song</span>
          </Link>
          <button
            className="relative inline-flex size-9 items-center justify-center rounded-lg border border-border text-muted-foreground transition-colors hover:text-foreground"
            aria-label="Notifications"
          >
            <Bell className="size-4.5" />
            <span className="absolute right-2 top-2 size-1.5 rounded-full bg-primary" />
          </button>
          <div className="flex items-center gap-2 rounded-lg border border-border bg-card py-1 pl-1 pr-2.5">
            <div className="flex size-7 items-center justify-center rounded-md bg-primary/20 text-xs font-semibold text-primary">
              ME
            </div>
            <div className="hidden leading-tight md:block">
              <p className="text-xs font-medium">Maya Ellis</p>
              <p className="text-[10px] text-muted-foreground">Lead vocals</p>
            </div>
          </div>
        </div>
      </header>

      {mobileOpen && (
        <div className="fixed inset-0 z-50 md:hidden">
          <div
            className="absolute inset-0 bg-black/60"
            onClick={() => setMobileOpen(false)}
          />
          <div className="absolute left-0 top-0 h-full w-72 border-r border-sidebar-border">
            <button
              className="absolute right-3 top-4 z-10 inline-flex size-9 items-center justify-center rounded-lg text-muted-foreground hover:text-foreground"
              onClick={() => setMobileOpen(false)}
              aria-label="Close navigation"
            >
              <X className="size-5" />
            </button>
            <Sidebar onNavigate={() => setMobileOpen(false)} />
          </div>
        </div>
      )}
    </>
  )
}
