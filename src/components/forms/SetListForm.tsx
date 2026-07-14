"use client"

import { useMemo, useState } from "react"
import Link from "next/link"
import {
  ArrowLeft,
  ListMusic,
  MapPin,
  Calendar,
  Search,
  Save,
  Radio,
  Music2,
  Gauge,
  Clock,
  Check,
} from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { PageHeader } from "@/components/dashboard/page-header"
import { songs, type SongStatus } from "@/lib/data"
import { cn } from "@/lib/utils"

type SetlistStatus = "draft" | "ready" | "archived"

const statusOptions: { label: string; value: SetlistStatus }[] = [
  { label: "Draft", value: "draft" },
  { label: "Ready", value: "ready" },
  { label: "Archived", value: "archived" },
]

const songStatusMeta: Record<
  SongStatus,
  { label: string; variant: "success" | "warning" | "muted" }
> = {
  ready: { label: "Ready", variant: "success" },
  rehearsing: { label: "Rehearsing", variant: "warning" },
  draft: { label: "Draft", variant: "muted" },
}

function durationToSeconds(d: string) {
  const [m, s] = d.split(":").map((n) => Number.parseInt(n, 10))
  return (m || 0) * 60 + (s || 0)
}

function formatDuration(totalSeconds: number) {
  if (totalSeconds <= 0) return "0 min"
  const minutes = Math.round(totalSeconds / 60)
  return `${minutes} min`
}

export default function NewSetlistPage() {
  const [name, setName] = useState("")
  const [description, setDescription] = useState("")
  const [date, setDate] = useState("")
  const [venue, setVenue] = useState("")
  const [status, setStatus] = useState<SetlistStatus>("draft")
  const [query, setQuery] = useState("")
  const [selected, setSelected] = useState<string[]>([])

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase()
    if (!q) return songs
    return songs.filter(
      (s) =>
        s.title.toLowerCase().includes(q) || s.artist.toLowerCase().includes(q),
    )
  }, [query])

  const selectedSongs = useMemo(
    () => selected.map((id) => songs.find((s) => s._id === id)).filter(Boolean),
    [selected],
  ) as (typeof songs)[number][]

  const estimatedSeconds = useMemo(
    () => selectedSongs.reduce((acc, s) => acc + durationToSeconds(s.duration), 0),
    [selectedSongs],
  )

  function toggleSong(id: string) {
    setSelected((prev) =>
      prev.includes(id) ? prev.filter((s) => s !== id) : [...prev, id],
    )
  }

  const canSave = name.trim().length > 0 && selected.length > 0
  const statusVariant =
    status === "ready" ? "success" : status === "archived" ? "outline" : "muted"

  return (
    <div>
      <PageHeader
        title="New Setlist"
        description="Build a performance setlist — pick your songs, set the running order and lock it in before the show."
      >
        <Link
          href="/library"
          className="inline-flex items-center gap-1.5 rounded-lg border border-border px-3.5 py-2 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
        >
          <ArrowLeft className="size-4" />
          Back to library
        </Link>
      </PageHeader>

      <form
        onSubmit={(e) => e.preventDefault()}
        className="grid grid-cols-1 gap-4 p-4 md:p-6 lg:grid-cols-[1.1fr_0.9fr]"
      >
        {/* Left column — details + songs */}
        <div className="flex flex-col gap-4">
          {/* Details */}
          <Card>
            <CardContent className="p-5">
              <h2 className="flex items-center gap-2 text-sm font-semibold">
                <ListMusic className="size-4 text-primary" />
                Setlist details
              </h2>
              <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2">
                <Field label="Setlist name" required className="sm:col-span-2">
                  <input
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="e.g. Bluebird Café — Friday"
                    className={inputClass}
                  />
                </Field>
                <Field label="Description" className="sm:col-span-2">
                  <textarea
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    rows={3}
                    placeholder="A short note about this show — vibe, order, special guests…"
                    className="w-full resize-y rounded-lg border border-border bg-input p-3 text-sm leading-relaxed outline-none transition-colors placeholder:text-muted-foreground focus:border-ring"
                  />
                </Field>
                <Field label="Date" icon={<Calendar className="size-3" />}>
                  <input
                    type="date"
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
                    className={inputClass}
                  />
                </Field>
                <Field label="Venue" icon={<MapPin className="size-3" />}>
                  <input
                    value={venue}
                    onChange={(e) => setVenue(e.target.value)}
                    placeholder="e.g. Bluebird Café, Nashville"
                    className={inputClass}
                  />
                </Field>
                <Field label="Status" className="sm:col-span-2">
                  <div className="flex gap-1.5">
                    {statusOptions.map((s) => (
                      <button
                        key={s.value}
                        type="button"
                        onClick={() => setStatus(s.value)}
                        className={cn(
                          "flex-1 rounded-lg border px-2 py-2 text-xs font-medium transition-colors",
                          status === s.value
                            ? "border-primary/40 bg-primary/10 text-primary"
                            : "border-border text-muted-foreground hover:text-foreground",
                        )}
                      >
                        {s.label}
                      </button>
                    ))}
                  </div>
                </Field>
              </div>
            </CardContent>
          </Card>

          {/* Songs */}
          <Card>
            <CardContent className="p-5">
              <div className="flex items-center justify-between">
                <h2 className="flex items-center gap-2 text-sm font-semibold">
                  <Music2 className="size-4 text-primary" />
                  Songs
                </h2>
                <span className="font-mono text-[11px] text-muted-foreground">
                  {selected.length} selected
                </span>
              </div>

              <div className="relative mt-4 flex items-center">
                <Search className="pointer-events-none absolute left-3 size-4 text-muted-foreground" />
                <input
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="Search your library…"
                  className="h-9 w-full rounded-lg border border-border bg-input pl-9 pr-3 text-sm outline-none transition-colors placeholder:text-muted-foreground focus:border-ring"
                />
              </div>

              <div className="mt-3 flex flex-col gap-2">
                {filtered.map((song) => {
                  const isSelected = selected.includes(song._id)
                  const meta = songStatusMeta[song.status]
                  return (
                    <button
                      key={song._id}
                      type="button"
                      onClick={() => toggleSong(song._id)}
                      className={cn(
                        "flex items-center gap-3 rounded-lg border p-3 text-left transition-colors",
                        isSelected
                          ? "border-primary/40 bg-primary/10"
                          : "border-border hover:border-primary/30 hover:bg-muted/40",
                      )}
                    >
                      <span
                        className={cn(
                          "flex size-5 shrink-0 items-center justify-center rounded-md border transition-colors",
                          isSelected
                            ? "border-primary bg-primary text-primary-foreground"
                            : "border-border text-transparent",
                        )}
                      >
                        <Check className="size-3.5" />
                      </span>
                      <div className="min-w-0 flex-1">
                        <p className="truncate text-sm font-medium">{song.title}</p>
                        <p className="truncate text-xs text-muted-foreground">
                          {song.artist}
                        </p>
                      </div>
                      <div className="hidden shrink-0 items-center gap-3 font-mono text-[11px] text-muted-foreground sm:flex">
                        <span>{song.songKey}</span>
                        <span className="inline-flex items-center gap-1">
                          <Gauge className="size-3" />
                          {song.bpm}
                        </span>
                      </div>
                      <Badge variant={meta.variant}>{meta.label}</Badge>
                    </button>
                  )
                })}
                {filtered.length === 0 && (
                  <p className="py-6 text-center text-sm text-muted-foreground">
                    No songs match &ldquo;{query}&rdquo;.
                  </p>
                )}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Right column — live preview */}
        <div className="flex flex-col gap-4">
          <Card className="lg:sticky lg:top-22">
            <div className="flex items-center justify-between border-b border-border px-5 py-3">
              <span className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground">
                Live preview
              </span>
              <Badge variant={statusVariant}>
                {statusOptions.find((s) => s.value === status)?.label}
              </Badge>
            </div>
            <CardContent className="p-5">
              <div className="flex items-center gap-3">
                <div className="flex size-11 shrink-0 items-center justify-center rounded-lg bg-muted text-muted-foreground">
                  <ListMusic className="size-5" />
                </div>
                <div className="min-w-0">
                  <p className="truncate text-base font-semibold tracking-tight">
                    {name || "Untitled setlist"}
                  </p>
                  <p className="truncate text-sm text-muted-foreground">
                    {venue || "No venue set"}
                  </p>
                </div>
              </div>

              <div className="mt-4 grid grid-cols-3 gap-px overflow-hidden rounded-lg border border-border bg-border">
                <div className="bg-card p-3">
                  <p className="flex items-center gap-1 font-mono text-[10px] uppercase tracking-widest text-muted-foreground">
                    <Calendar className="size-3" /> Date
                  </p>
                  <p className="mt-1 font-mono text-sm font-medium">{date || "—"}</p>
                </div>
                <div className="bg-card p-3">
                  <p className="flex items-center gap-1 font-mono text-[10px] uppercase tracking-widest text-muted-foreground">
                    <ListMusic className="size-3" /> Songs
                  </p>
                  <p className="mt-1 font-mono text-sm font-medium">{selected.length}</p>
                </div>
                <div className="bg-card p-3">
                  <p className="flex items-center gap-1 font-mono text-[10px] uppercase tracking-widest text-muted-foreground">
                    <Clock className="size-3" /> Length
                  </p>
                  <p className="mt-1 font-mono text-sm font-medium">
                    {formatDuration(estimatedSeconds)}
                  </p>
                </div>
              </div>

              <div className="mt-4 max-h-72 overflow-y-auto rounded-lg border border-border bg-background/40 p-2">
                {selectedSongs.length > 0 ? (
                  <ol className="space-y-1">
                    {selectedSongs.map((song, i) => (
                      <li
                        key={song._id}
                        className="flex items-center gap-3 rounded-lg px-2 py-2"
                      >
                        <span className="w-5 text-center font-mono text-xs text-muted-foreground">
                          {i + 1}
                        </span>
                        <div className="min-w-0 flex-1">
                          <p className="truncate text-sm font-medium">{song.title}</p>
                          <p className="truncate text-xs text-muted-foreground">
                            {song.artist}
                          </p>
                        </div>
                        <span className="font-mono text-xs text-muted-foreground">
                          {song.duration}
                        </span>
                      </li>
                    ))}
                  </ol>
                ) : (
                  <p className="px-2 py-6 text-center text-sm text-muted-foreground">
                    Selected songs will appear here in order.
                  </p>
                )}
              </div>
            </CardContent>
          <div className="flex items-center gap-2 px-5 py-1">
            <button
              type="submit"
              disabled={!canSave}
              className="inline-flex flex-1 items-center justify-center gap-1.5 rounded-lg bg-primary px-3 py-2.5 text-sm font-semibold text-primary-foreground transition-colors hover:bg-primary/90 disabled:cursor-not-allowed disabled:opacity-50"
            >
              <Save className="size-4" />
              Save setlist
            </button>
            <button
              type="button"
              disabled={!canSave}
              className="inline-flex items-center justify-center gap-1.5 rounded-lg border border-border px-3 py-2.5 text-sm font-medium transition-colors hover:bg-muted disabled:cursor-not-allowed disabled:opacity-50"
            >
              <Radio className="size-4" />
              Save &amp; open Live
            </button>
            <Link
              href="/setlists"
              className="inline-flex items-center justify-center rounded-lg border border-border px-3 py-2.5 text-sm font-medium text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
            >
              Cancel
            </Link>
          </div>
          </Card>

          {/* Actions */}
        </div>
      </form>
    </div>
  )
}

const inputClass =
  "h-9 w-full rounded-lg border border-border bg-input px-3 text-sm outline-none transition-colors placeholder:text-muted-foreground focus:border-ring"

function Field({
  label,
  required,
  icon,
  className,
  children,
}: {
  label: string
  required?: boolean
  icon?: React.ReactNode
  className?: string
  children: React.ReactNode
}) {
  return (
    <label className={cn("block", className)}>
      <span className="mb-1.5 flex items-center gap-1 text-xs font-medium text-muted-foreground">
        {icon}
        {label}
        {required && <span className="text-primary">*</span>}
      </span>
      {children}
    </label>
  )
}
