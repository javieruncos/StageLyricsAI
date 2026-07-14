

export const queryKeys = {
    songs: ["songs"] as const,
    song: (id: string) => ["song", id] as const,
    setlists: ["setlists"] as const,
    setlist: (id: string) => ["setlist", id] as const,
}
