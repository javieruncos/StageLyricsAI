import { SongStatus } from "@/lib/data";

export const musicalKeys = [
    "C major",
    "G major",
    "D major",
    "A major",
    "E major",
    "F major",
    "A minor",
    "E minor",
    "B minor",
    "F# minor",
    "C minor",
    "D minor",
]

export const statusOptions: { label: string; value: SongStatus; hint: string }[] = [
    { label: "Draft", value: "draft", hint: "Still writing" },
    { label: "Rehearsing", value: "rehearsing", hint: "Working on it" },
    { label: "Ready", value: "ready", hint: "Stage-ready" },
]

export const suggestedTags = ["original", "cover", "acoustic", "ballad", "opener", "encore", "closer"]