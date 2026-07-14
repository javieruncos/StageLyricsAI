"use client"

import { useEffect, useRef, useState } from "react"
import {
  Play,
  Pause,
  SkipBack,
  SkipForward,
  RotateCcw,
  Minus,
  Plus,
  Gauge,
  Type,
} from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { setlists, getSong, type Song } from "@/lib/data"
import { cn } from "@/lib/utils"

export default function LivePage() {
  const setlist = setlists[0]
  const setlistSongs = setlist.songIds
    .map((id) => getSong(id))
    .filter(Boolean) as Song[]

  const [index, setIndex] = useState(0)
  const [playing, setPlaying] = useState(false)
  const [speed, setSpeed] = useState(2)
  const [fontSize, setFontSize] = useState(40)
  const scrollRef = useRef<HTMLDivElement>(null)

  const song = setlistSongs[index]

  // Auto-scroll loop
  useEffect(() => {
    if (!playing) return
    const el = scrollRef.current
    if (!el) return
    let raf = 0
    let last = performance.now()
    const tick = (now: number) => {
      const dt = now - last
      last = now
      el.scrollTop += (speed * dt) / 16
      if (el.scrollTop + el.clientHeight >= el.scrollHeight - 1) {
        setPlaying(false)
        return
      }
      raf = requestAnimationFrame(tick)
    }
    raf = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(raf)
  }, [playing, speed])

  // Reset scroll when changing song
  useEffect(() => {
    if (scrollRef.current) scrollRef.current.scrollTop = 0
  }, [index])

  const restart = () => {
    if (scrollRef.current) scrollRef.current.scrollTop = 0
    setPlaying(true)
  }
  const go = (dir: -1 | 1) => {
    setPlaying(false)
    setIndex((i) => Math.min(setlistSongs.length - 1, Math.max(0, i + dir)))
  }

  return (
    <div className="flex h-[calc(100svh-4rem)] flex-col bg-background">
      {/* Header strip */}
      <div className="flex items-center justify-between gap-4 border-b border-border px-4 py-3 md:px-6">
        <div className="flex items-center gap-3">
          <span className="relative flex size-2.5">
            <span className="absolute inline-flex size-full animate-ping rounded-full bg-primary opacity-75" />
            <span className="relative inline-flex size-2.5 rounded-full bg-primary" />
          </span>
          <div>
            <p className="text-sm font-semibold tracking-tight">Live Mode</p>
            <p className="text-xs text-muted-foreground">{setlist.name}</p>
          </div>
        </div>
        <div className="flex items-center gap-2 font-mono text-sm">
          <Badge variant="muted">{song.songKey}</Badge>
          <Badge variant="muted">{song.bpm} BPM</Badge>
          <span className="hidden text-muted-foreground sm:inline">
            {index + 1}/{setlistSongs.length}
          </span>
        </div>
      </div>

      <div className="flex min-h-0 flex-1">
        {/* Queue */}
        <aside className="hidden w-64 shrink-0 overflow-y-auto border-r border-border p-3 lg:block">
          <p className="px-2 pb-2 font-mono text-[10px] uppercase tracking-widest text-muted-foreground">
            Up next
          </p>
          <ul className="space-y-1">
            {setlistSongs.map((s, i) => (
              <li key={s._id}>
                <button
                  onClick={() => {
                    setPlaying(false)
                    setIndex(i)
                  }}
                  className={cn(
                    "flex w-full items-center gap-3 rounded-lg px-3 py-2 text-left transition-colors",
                    i === index
                      ? "bg-primary/10 text-primary"
                      : "text-muted-foreground hover:bg-muted/50 hover:text-foreground",
                  )}
                >
                  <span className="w-4 text-center font-mono text-xs">{i + 1}</span>
                  <div className="min-w-0 flex-1">
                    <p className="truncate text-sm font-medium">{s.title}</p>
                    <p className="truncate text-xs opacity-70">{s.duration}</p>
                  </div>
                </button>
              </li>
            ))}
          </ul>
        </aside>

        {/* Teleprompter */}
        <div className="relative flex min-w-0 flex-1 flex-col">
          <div className="pointer-events-none absolute inset-x-0 top-0 z-10 h-24 bg-gradient-to-b from-background to-transparent" />
          <div className="pointer-events-none absolute inset-x-0 bottom-0 z-10 h-32 bg-gradient-to-t from-background to-transparent" />

          <div
            ref={scrollRef}
            className="flex-1 overflow-y-auto scroll-smooth px-6 py-16 md:px-12"
          >
            <div className="mx-auto max-w-3xl">
              <h1 className="mb-1 text-center text-sm font-medium uppercase tracking-widest text-primary">
                {song.title}
              </h1>
              <p className="mb-10 text-center text-sm text-muted-foreground">
                {song.artist}
              </p>
              <pre
                className="whitespace-pre-wrap text-center font-sans font-medium leading-[1.5] text-foreground"
                style={{ fontSize: `${fontSize}px` }}
              >
                {song.lyrics}
              </pre>
              <div className="h-[30vh]" />
            </div>
          </div>
        </div>
      </div>

      {/* Control bar */}
      <div className="border-t border-border bg-card/80 px-4 py-3 backdrop-blur md:px-6">
        <div className="mx-auto flex max-w-4xl flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-1.5">
            <ControlBtn label="Previous song" onClick={() => go(-1)} disabled={index === 0}>
              <SkipBack className="size-5" />
            </ControlBtn>
            <button
              onClick={() => setPlaying((p) => !p)}
              className="inline-flex size-12 items-center justify-center rounded-full bg-primary text-primary-foreground transition-colors hover:bg-primary/90"
              aria-label={playing ? "Pause scroll" : "Start scroll"}
            >
              {playing ? <Pause className="size-6" /> : <Play className="size-6" />}
            </button>
            <ControlBtn
              label="Next song"
              onClick={() => go(1)}
              disabled={index === setlistSongs.length - 1}
            >
              <SkipForward className="size-5" />
            </ControlBtn>
            <ControlBtn label="Restart" onClick={restart}>
              <RotateCcw className="size-5" />
            </ControlBtn>
          </div>

          <div className="flex items-center gap-4">
            {/* Speed */}
            <div className="flex items-center gap-2">
              <Gauge className="size-4 text-muted-foreground" />
              <ControlBtn
                label="Slower"
                onClick={() => setSpeed((s) => Math.max(0.5, +(s - 0.5).toFixed(1)))}
                small
              >
                <Minus className="size-4" />
              </ControlBtn>
              <span className="w-10 text-center font-mono text-xs text-muted-foreground">
                {speed.toFixed(1)}x
              </span>
              <ControlBtn
                label="Faster"
                onClick={() => setSpeed((s) => Math.min(8, +(s + 0.5).toFixed(1)))}
                small
              >
                <Plus className="size-4" />
              </ControlBtn>
            </div>

            {/* Font size */}
            <div className="hidden items-center gap-2 sm:flex">
              <Type className="size-4 text-muted-foreground" />
              <ControlBtn
                label="Smaller text"
                onClick={() => setFontSize((f) => Math.max(24, f - 4))}
                small
              >
                <Minus className="size-4" />
              </ControlBtn>
              <span className="w-8 text-center font-mono text-xs text-muted-foreground">
                {fontSize}
              </span>
              <ControlBtn
                label="Larger text"
                onClick={() => setFontSize((f) => Math.min(72, f + 4))}
                small
              >
                <Plus className="size-4" />
              </ControlBtn>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

function ControlBtn({
  children,
  label,
  onClick,
  disabled,
  small,
}: {
  children: React.ReactNode
  label: string
  onClick: () => void
  disabled?: boolean
  small?: boolean
}) {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      aria-label={label}
      className={cn(
        "inline-flex items-center justify-center rounded-lg border border-border text-muted-foreground transition-colors hover:text-foreground disabled:pointer-events-none disabled:opacity-40",
        small ? "size-8" : "size-10",
      )}
    >
      {children}
    </button>
  )
}
