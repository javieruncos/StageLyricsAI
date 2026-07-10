

export const queryKeys = {
    songs: ["songs"] as const,
    song: (id: string) => ["song", id] as const,
}
