

export interface SetListDb {
  _id: string
  name: string
  description?: string
  songs: Song[]
  status: "draft" | "ready" | "archived"
  venue: string
  date?: string
  durationMin: number
}

export interface Song {
  _id: string
  title: string
  artist: string
  songKey?: string
  bpm?: number
  duration: string
}