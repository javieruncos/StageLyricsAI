"use client"

import { useMemo, useState } from "react"
import {
  Search,
  Plus,
  Music2,
  Clock,
  Gauge,
  X,
  Pencil,
  Radio,
  Sparkles,
  ListFilter,
} from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { PageHeader } from "@/components/dashboard/page-header"
import { songs, type Song, type SongStatus } from "@/lib/data"
import { cn } from "@/lib/utils"
import Link from "next/link"

const filters: { label: string; value: SongStatus | "all" }[] = [
  { label: "All songs", value: "all" },
  { label: "Ready", value: "ready" },
  { label: "Rehearsing", value: "rehearsing" },
  { label: "Drafts", value: "draft" },
]

const statusBadge: Record<SongStatus, { label: string; variant: "success" | "warning" | "muted" }> = {
  ready: { label: "Ready", variant: "success" },
  rehearsing: { label: "Rehearsing", variant: "warning" },
  draft: { label: "Draft", variant: "muted" },
}

export default function LibraryPage() {
  const [query, setQuery] = useState("")
  const [filter, setFilter] = useState<SongStatus | "all">("all")
  const [selected, setSelected] = useState<Song | null>(null)

  const filtered = useMemo(() => {
    return songs.filter((s) => {
      const matchesFilter = filter === "all" || s.status === filter
      const q = query.toLowerCase()
      const matchesQuery =
        !q ||
        s.title.toLowerCase().includes(q) ||
        s.artist.toLowerCase().includes(q) ||
        s.tags.some((t) => t.includes(q))
      return matchesFilter && matchesQuery
    })
  }, [query, filter])

  return (
    <div>
      <PageHeader
        title="Song Library"
        description="Every lyric, key and tempo in one place. Search, organize and prep songs for the stage."
      >
        <Link href="/library/new" className="inline-flex items-center gap-1.5 rounded-lg bg-primary px-3.5 py-2 text-sm font-semibold text-primary-foreground transition-colors hover:bg-primary/90">
          <Plus className="size-4" />
          New song
        </Link>
      </PageHeader>

      <div className="p-4 md:p-6">
        {/* Controls */}
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div className="relative flex max-w-md flex-1 items-center">
            <Search className="pointer-events-none absolute left-3 size-4 text-muted-foreground" />
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              type="search"
              placeholder="Search by title, artist or tag…"
              className="h-9 w-full rounded-lg border border-border bg-card pl-9 pr-3 text-sm outline-none transition-colors placeholder:text-muted-foreground focus:border-ring"
            />
          </div>
          <div className="flex items-center gap-1.5 overflow-x-auto">
            <ListFilter className="size-4 shrink-0 text-muted-foreground" />
            {filters.map((f) => (
              <button
                key={f.value}
                onClick={() => setFilter(f.value)}
                className={cn(
                  "shrink-0 rounded-lg border px-3 py-1.5 text-xs font-medium transition-colors",
                  filter === f.value
                    ? "border-primary/40 bg-primary/10 text-primary"
                    : "border-border text-muted-foreground hover:text-foreground",
                )}
              >
                {f.label}
              </button>
            ))}
          </div>
        </div>

        {/* Table */}
        <Card className="mt-4 overflow-hidden">
          <div className="hidden grid-cols-[1.5fr_0.6fr_0.6fr_0.8fr_0.8fr] gap-4 border-b border-border px-5 py-3 font-mono text-[10px] uppercase tracking-widest text-muted-foreground md:grid">
            <span>Song</span>
            <span>Key</span>
            <span>BPM</span>
            <span>Tags</span>
            <span className="text-right">Status</span>
          </div>
          <ul className="divide-y divide-border">
            {filtered.map((song) => {
              const sb = statusBadge[song.status]
              return (
                <li key={song.id}>
                  <button
                    onClick={() => setSelected(song)}
                    className="grid w-full grid-cols-1 items-center gap-2 px-5 py-3.5 text-left transition-colors hover:bg-muted/40 md:grid-cols-[1.5fr_0.6fr_0.6fr_0.8fr_0.8fr] md:gap-4"
                  >
                    <div className="flex items-center gap-3">
                      <div className="flex size-9 shrink-0 items-center justify-center rounded-lg bg-muted text-muted-foreground">
                        <Music2 className="size-4" />
                      </div>
                      <div className="min-w-0">
                        <p className="truncate text-sm font-medium">{song.title}</p>
                        <p className="truncate text-xs text-muted-foreground">
                          {song.artist}
                        </p>
                      </div>
                    </div>
                    <span className="font-mono text-sm text-muted-foreground">
                      <span className="md:hidden">Key: </span>
                      {song.key}
                    </span>
                    <span className="font-mono text-sm text-muted-foreground">
                      <span className="md:hidden">BPM: </span>
                      {song.bpm}
                    </span>
                    <div className="flex flex-wrap gap-1">
                      {song.tags.map((t) => (
                        <Badge key={t} variant="outline">
                          {t}
                        </Badge>
                      ))}
                    </div>
                    <div className="md:text-right">
                      <Badge variant={sb.variant}>{sb.label}</Badge>
                    </div>
                  </button>
                </li>
              )
            })}
            {filtered.length === 0 && (
              <li className="px-5 py-16 text-center text-sm text-muted-foreground">
                No songs match your search.
              </li>
            )}
          </ul>
        </Card>
      </div>

      {/* Lyrics drawer */}
      {selected && (
        <div className="fixed inset-0 z-50">
          <div
            className="absolute inset-0 bg-black/60 backdrop-blur-sm"
            onClick={() => setSelected(null)}
          />
          <div className="absolute right-0 top-0 flex h-full w-full max-w-lg flex-col border-l border-border bg-card shadow-2xl">
            <div className="flex items-start justify-between gap-4 border-b border-border p-5">
              <div className="min-w-0">
                <h2 className="truncate text-lg font-semibold tracking-tight">
                  {selected.title}
                </h2>
                <p className="truncate text-sm text-muted-foreground">{selected.artist}</p>
              </div>
              <button
                onClick={() => setSelected(null)}
                className="inline-flex size-9 shrink-0 items-center justify-center rounded-lg text-muted-foreground hover:bg-muted hover:text-foreground"
                aria-label="Close"
              >
                <X className="size-5" />
              </button>
            </div>

            <div className="grid grid-cols-3 gap-px border-b border-border bg-border">
              <div className="bg-card p-4">
                <p className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground">
                  Key
                </p>
                <p className="mt-1 font-mono text-sm font-medium">{selected.key}</p>
              </div>
              <div className="bg-card p-4">
                <p className="flex items-center gap-1 font-mono text-[10px] uppercase tracking-widest text-muted-foreground">
                  <Gauge className="size-3" /> Tempo
                </p>
                <p className="mt-1 font-mono text-sm font-medium">{selected.bpm} BPM</p>
              </div>
              <div className="bg-card p-4">
                <p className="flex items-center gap-1 font-mono text-[10px] uppercase tracking-widest text-muted-foreground">
                  <Clock className="size-3" /> Length
                </p>
                <p className="mt-1 font-mono text-sm font-medium">{selected.duration}</p>
              </div>
            </div>

            <div className="flex-1 overflow-y-auto p-5">
              <pre className="whitespace-pre-wrap font-sans text-sm leading-relaxed text-foreground/90">
                {selected.lyrics}
              </pre>
            </div>

            <div className="flex items-center gap-2 border-t border-border p-4">
              <button className="inline-flex flex-1 items-center justify-center gap-1.5 rounded-lg bg-primary px-3 py-2.5 text-sm font-semibold text-primary-foreground transition-colors hover:bg-primary/90">
                <Radio className="size-4" />
                Open in Live Mode
              </button>
              <button className="inline-flex items-center justify-center gap-1.5 rounded-lg border border-border px-3 py-2.5 text-sm font-medium transition-colors hover:bg-muted">
                <Pencil className="size-4" />
                Edit
              </button>
              <button className="inline-flex items-center justify-center gap-1.5 rounded-lg border border-primary/40 bg-primary/10 px-3 py-2.5 text-sm font-medium text-primary transition-colors hover:bg-primary/20">
                <Sparkles className="size-4" />
                AI
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
