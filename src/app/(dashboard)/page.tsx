import Link from "next/link"
import {
  ArrowUpRight,
  Radio,
  Clock,
  MapPin,
  Play,
  Sparkles,
  Music2,
  ListMusic,
  Wand2,
  Mic2,
  TrendingUp,
} from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { PageHeader } from "@/components/dashboard/page-header"
import { stats, songs, setlists, activity, getSong } from "@/lib/data"

const aiTools = [
  { icon: Wand2, label: "Auto-format lyrics", desc: "Clean structure & sections" },
  { icon: Music2, label: "Transpose key", desc: "Shift to any key instantly" },
  { icon: Mic2, label: "Generate cues", desc: "From an audio recording" },
]

export default function OverviewPage() {
  const nextShow = setlists.find((s) => s.status === "upcoming")!
  const recentSongs = songs.slice(0, 5)

  return (
    <div>
      <PageHeader
        title="Good evening, Maya"
        description="Your stage is set. Here's what's happening across your library and upcoming shows."
      >
        <Link
          href="/live"
          className="inline-flex items-center gap-1.5 rounded-lg bg-primary px-3.5 py-2 text-sm font-semibold text-primary-foreground transition-colors hover:bg-primary/90"
        >
          <Radio className="size-4" />
          Start Live Mode
        </Link>
      </PageHeader>

      <div className="space-y-6 p-4 md:p-6">
        {/* Stats */}
        <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
          {stats.map((s) => (
            <Card key={s.label}>
              <CardContent className="p-5">
                <p className="text-sm text-muted-foreground">{s.label}</p>
                <div className="mt-2 flex items-end justify-between">
                  <p className="font-mono text-3xl font-semibold tracking-tight">
                    {s.value}
                  </p>
                  <TrendingUp className="size-4 text-primary" aria-hidden="true" />
                </div>
                <p className="mt-2 text-xs text-muted-foreground">{s.delta}</p>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="grid gap-6 lg:grid-cols-3">
          {/* Next show hero */}
          <Card className="relative overflow-hidden lg:col-span-2">
            <div className="grid-frame pointer-events-none absolute inset-0 opacity-40" />
            <div className="relative">
              <CardHeader>
                <div className="flex items-center gap-2">
                  <Badge>Up next</Badge>
                  <span className="text-xs text-muted-foreground">{nextShow.date}</span>
                </div>
                <Link
                  href="/setlists"
                  className="text-xs font-medium text-primary hover:underline"
                >
                  View setlist
                </Link>
              </CardHeader>
              <CardContent>
                <h2 className="text-xl font-semibold tracking-tight">{nextShow.name}</h2>
                <div className="mt-2 flex flex-wrap items-center gap-x-4 gap-y-1 text-sm text-muted-foreground">
                  <span className="inline-flex items-center gap-1.5">
                    <MapPin className="size-4" /> {nextShow.venue}
                  </span>
                  <span className="inline-flex items-center gap-1.5">
                    <ListMusic className="size-4" /> {nextShow.songIds.length} songs
                  </span>
                  <span className="inline-flex items-center gap-1.5">
                    <Clock className="size-4" /> {nextShow.durationMin} min
                  </span>
                </div>

                <ol className="mt-4 divide-y divide-border overflow-hidden rounded-lg border border-border">
                  {nextShow.songIds.map((id, i) => {
                    const song = getSong(id)
                    if (!song) return null
                    return (
                      <li
                        key={id}
                        className="flex items-center gap-3 bg-background/40 px-3 py-2.5"
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
                        <Badge variant="muted" className="font-mono">
                          {song.songKey}
                        </Badge>
                        <span className="hidden font-mono text-xs text-muted-foreground sm:inline">
                          {song.duration}
                        </span>
                      </li>
                    )
                  })}
                </ol>

                <Link
                  href="/live"
                  className="mt-4 inline-flex items-center gap-2 rounded-lg border border-primary/40 bg-primary/10 px-4 py-2.5 text-sm font-medium text-primary transition-colors hover:bg-primary/20"
                >
                  <Play className="size-4" />
                  Rehearse this set
                </Link>
              </CardContent>
            </div>
          </Card>

          {/* Activity */}
          <Card>
            <CardHeader>
              <CardTitle>Recent activity</CardTitle>
              <Sparkles className="size-4 text-primary" aria-hidden="true" />
            </CardHeader>
            <CardContent className="pt-2">
              <ul className="space-y-4">
                {activity.map((a) => (
                  <li key={a.id} className="flex gap-3">
                    <div className="mt-1.5 size-1.5 shrink-0 rounded-full bg-primary" />
                    <div className="min-w-0">
                      <p className="text-sm leading-snug">
                        {a.text}{" "}
                        <span className="font-medium text-foreground">{a.target}</span>
                      </p>
                      <p className="mt-0.5 text-xs text-muted-foreground">{a.time}</p>
                    </div>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
        </div>

        {/* AI tools */}
        <div className="grid gap-4 sm:grid-cols-3">
          {aiTools.map((t) => {
            const Icon = t.icon
            return (
              <Card
                key={t.label}
                className="group cursor-pointer transition-colors hover:border-primary/40"
              >
                <CardContent className="flex items-start gap-3 p-5">
                  <div className="flex size-10 items-center justify-center rounded-lg bg-primary/15 text-primary">
                    <Icon className="size-5" />
                  </div>
                  <div className="min-w-0">
                    <p className="flex items-center gap-1 text-sm font-medium">
                      {t.label}
                      <ArrowUpRight className="size-3.5 text-muted-foreground transition-colors group-hover:text-primary" />
                    </p>
                    <p className="mt-0.5 text-xs text-muted-foreground">{t.desc}</p>
                  </div>
                </CardContent>
              </Card>
            )
          })}
        </div>

        {/* Recent songs */}
        <Card>
          <CardHeader>
            <CardTitle>Recently updated</CardTitle>
            <Link
              href="/library"
              className="text-xs font-medium text-primary hover:underline"
            >
              View library
            </Link>
          </CardHeader>
          <CardContent className="pt-2">
            <ul className="divide-y divide-border">
              {recentSongs.map((song) => (
                <li
                  key={song.id}
                  className="flex items-center gap-3 py-3 first:pt-0 last:pb-0"
                >
                  <div className="flex size-9 items-center justify-center rounded-lg bg-muted text-muted-foreground">
                    <Music2 className="size-4" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="truncate text-sm font-medium">{song.title}</p>
                    <p className="truncate text-xs text-muted-foreground">
                      {song.artist}
                    </p>
                  </div>
                  <div className="hidden items-center gap-2 sm:flex">
                    {song.tags.slice(0, 1).map((tag) => (
                      <Badge key={tag} variant="outline">
                        {tag}
                      </Badge>
                    ))}
                  </div>
                  <Badge variant="muted" className="font-mono">
                    {song.songKey}
                  </Badge>
                  <span className="w-16 text-right font-mono text-xs text-muted-foreground">
                    {song.updatedAt}
                  </span>
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
