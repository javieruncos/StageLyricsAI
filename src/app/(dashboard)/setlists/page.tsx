"use client"

import Link from "next/link"
import {
  Plus,
  MapPin,
  Clock,
  ListMusic,
  Play,
  GripVertical,
  Calendar,
} from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { PageHeader } from "@/components/dashboard/page-header"
import { useSetlists } from "@/hooks/useSetlist"
import { useSongs } from "@/hooks/useSongs"

const statusMeta = {
  upcoming: { label: "Upcoming", variant: "success" as const },
  draft: { label: "Draft", variant: "muted" as const },
  performed: { label: "Performed", variant: "outline" as const },
}

export default function SetlistsPage() {

  const { data: setlists, isLoading, error } = useSetlists()


  const featured = setlists?.[0]

  
  return (
    <div>
      <PageHeader
        title="Setlists"
        description="Arrange songs into shows, reorder on the fly and lock in your running order before you hit the stage."
      >
        <Link href="/setlists/new" className="inline-flex items-center gap-1.5 rounded-lg bg-primary px-3.5 py-2 text-sm font-semibold text-primary-foreground transition-colors hover:bg-primary/90">
          <Plus className="size-4" />
          New setlist
        </Link>
      </PageHeader>

      <div className="grid gap-6 p-4 md:p-6 lg:grid-cols-[1fr_360px]">
        {/* Setlist cards */}
        <div className="space-y-4">
          {setlists?.map((set) => {
            const meta = statusMeta[set.status as keyof typeof statusMeta]
            return (
              <Card key={set._id} className="transition-colors hover:border-primary/30">
                <CardContent className="p-5">
                  <div className="flex flex-wrap items-start justify-between gap-3">
                    <div>
                      <div className="flex items-center gap-2">
                        <h2 className="text-base font-semibold tracking-tight">
                          {set.name}
                        </h2>
                        <Badge variant={meta.variant}>{meta.label}</Badge>
                      </div>
                      <div className="mt-1.5 flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-muted-foreground">
                        <span className="inline-flex items-center gap-1">
                          <MapPin className="size-3.5" /> {set.venue}
                        </span>
                        <span className="inline-flex items-center gap-1">
                          <Calendar className="size-3.5" /> {set.date}
                        </span>
                        <span className="inline-flex items-center gap-1">
                          <ListMusic className="size-3.5" /> {set.songs.length} songs
                        </span>
                        <span className="inline-flex items-center gap-1">
                          <Clock className="size-3.5" /> {set.durationMin} min
                        </span>
                      </div>
                    </div>
                    <div className="flex gap-2">

                      <Link
                        href="/live"
                        className="inline-flex items-center gap-1.5 rounded-lg border border-primary/40 bg-primary/10 px-3 py-2 text-xs font-medium text-primary transition-colors hover:bg-primary/20"
                      >
                        <Play className="size-3.5" />
                        Perform
                      </Link>
                      <Link
                        href={`/setlists/${set._id}/edit`}
                        className="inline-flex items-center gap-1.5 rounded-lg border border-primary/40 bg-primary/10 px-3 py-2 text-xs font-medium text-primary transition-colors hover:bg-primary/20"
                      >
                        Edit
                      </Link>
                    </div>
                  </div>

                  <div className="mt-4 flex flex-wrap gap-1.5">
                    {set.songs.map((song, i) => {
                      return (
                        <span
                          key={song._id}
                          className="inline-flex items-center gap-1.5 rounded-md border border-border bg-background/50 px-2 py-1 text-xs"
                        >
                          <span className="font-mono text-muted-foreground">{i + 1}</span>
                          {song.title}
                        </span>
                      )
                    })}
                  </div>
                </CardContent>
              </Card>
            )
          })}
        </div>

        {/* Builder preview */}
        <div className="lg:sticky lg:top-20 lg:self-start">
          <Card>
            <CardContent className="p-5">
              <div className="flex items-center justify-between">
                <h3 className="text-sm font-semibold tracking-tight">
                  Running order
                </h3>
                <Badge>{featured?.name}</Badge>
              </div>
              <p className="mt-1 text-xs text-muted-foreground">
                Drag to reorder. Changes sync to every device.
              </p>

              <ol className="mt-4 space-y-2">
                {featured?.songs.map((song, i) => {
                  return (
                    <li
                      key={song._id}
                      className="flex items-center gap-2 rounded-lg border border-border bg-background/40 px-3 py-2.5"
                    >
                      <GripVertical className="size-4 shrink-0 cursor-grab text-muted-foreground" />
                      <span className="w-5 text-center font-mono text-xs text-muted-foreground">
                        {i + 1}
                      </span>
                      <div className="min-w-0 flex-1">
                        <p className="truncate text-sm font-medium">{song.title}</p>
                        <p className="truncate text-xs text-muted-foreground">
                          {song.songkey} · {song.bpm} BPM
                        </p>
                      </div>
                      <span className="font-mono text-xs text-muted-foreground">
                        {song.duration}
                      </span>
                    </li>
                  )
                })}
              </ol>

              <div className="mt-4 flex items-center justify-between rounded-lg bg-muted/50 px-3 py-2.5 text-sm">
                <span className="text-muted-foreground">Total runtime</span>
                <span className="font-mono font-medium">{featured?.durationMin} min</span>
              </div>

              <Link
                href="/live"
                className="mt-4 flex w-full items-center justify-center gap-2 rounded-lg bg-primary px-3 py-2.5 text-sm font-semibold text-primary-foreground transition-colors hover:bg-primary/90"
              >
                <Play className="size-4" />
                Launch performance
              </Link>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
