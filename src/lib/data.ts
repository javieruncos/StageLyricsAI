export type SongStatus = "ready" | "rehearsing" | "draft"

export type Song = {
  _id: string
  title: string
  artist: string
  songKey: string
  bpm: number
  duration: string
  tags: string[]
  status: SongStatus
  updatedAt: string
  lyrics: string,
  genre?: string
}

export type Setlist = {
  id: string
  name: string
  venue: string
  date: string
  songIds: string[]
  durationMin: number
  status: "upcoming" | "draft" | "performed"
}

export const songs: Song[] = [
  {
    _id: "neon-rivers",
    title: "Neon Rivers",
    artist: "The Midnight Echo",
    songKey: "A minor",
    bpm: 92,
    duration: "4:12",
    tags: ["original", "encore"],
    status: "ready",
    updatedAt: "2h ago",
    lyrics: `[Verse 1]
City lights are bleeding through the rain
Every signal calling out your name
We were chasing shadows down the line
Neon rivers running out of time

[Pre-Chorus]
And the night keeps turning, turning slow
Tell me all the places we could go

[Chorus]
Down the neon rivers, we will run
Underneath a borrowed midnight sun
Hold me where the current pulls us through
Every wave is carrying me to you

[Verse 2]
Static hums beneath the avenue
All the colors melting into blue
If the morning takes this dream away
I'll be here when all the embers fade`,
  },
  {
    _id: "paper-hearts",
    title: "Paper Hearts",
    artist: "The Midnight Echo",
    songKey: "C major",
    bpm: 76,
    duration: "3:48",
    tags: ["original", "acoustic"],
    status: "ready",
    updatedAt: "Yesterday",
    lyrics: `[Verse 1]
Folded up the letters that you wrote
Tucked them in the pocket of my coat
Paper hearts don't beat but still they tear
Find the pieces scattered everywhere

[Chorus]
Oh, we built it out of paper, you and I
Watched it catch the wind and learn to fly
Even if it crumbles in my hand
Paper hearts still made a place to land`,
  },
  {
    _id: "gravity",
    title: "Gravity",
    artist: "Cover — John Mayer",
    songKey: "G major",
    bpm: 64,
    duration: "4:05",
    tags: ["cover", "ballad"],
    status: "rehearsing",
    updatedAt: "3 days ago",
    lyrics: `[Verse 1]
Gravity is working against me
And gravity wants to bring me down

[Chorus]
Oh, I'll never know what makes this man
With all the love that his heart can stand
Dreams of ways to throw it all away`,
  },
  {
    _id: "wildfire",
    title: "Wildfire",
    artist: "The Midnight Echo",
    songKey: "E minor",
    bpm: 128,
    duration: "3:21",
    tags: ["original", "opener"],
    status: "ready",
    updatedAt: "5 days ago",
    lyrics: `[Verse 1]
Strike a match against the dark
Watch it catch and light the spark

[Chorus]
We are wildfire, burning bright
Tearing open up the night
Run with me into the flame
Nothing's ever gonna be the same`,
  },
  {
    _id: "slow-dance",
    title: "Slow Dance in the Kitchen",
    artist: "The Midnight Echo",
    songKey: "D major",
    bpm: 58,
    duration: "4:40",
    tags: ["original", "ballad"],
    status: "draft",
    updatedAt: "1 week ago",
    lyrics: `[Verse 1]
Coffee's cold but I don't mind
Radio is playing something kind

[Chorus]
So we slow dance in the kitchen light
Barefoot on a Tuesday night`,
  },
  {
    _id: "the-fever",
    title: "The Fever",
    artist: "Cover — Fleetwood Mac",
    songKey: "B minor",
    bpm: 110,
    duration: "3:55",
    tags: ["cover", "encore"],
    status: "rehearsing",
    updatedAt: "1 week ago",
    lyrics: `[Verse 1]
Caught a chill but it feels like fire
Burning up on every wire

[Chorus]
It's the fever, won't you let it ride
Pull me close and don't you hide`,
  },
  {
    _id: "city-of-glass",
    title: "City of Glass",
    artist: "The Midnight Echo",
    songKey: "F# minor",
    bpm: 100,
    duration: "4:18",
    tags: ["original"],
    status: "ready",
    updatedAt: "2 weeks ago",
    lyrics: `[Verse 1]
Towers made of mirrors in a row
Everywhere I look I see us glow

[Chorus]
In the city of glass we disappear
Reflections of a love that brought us here`,
  },
  {
    _id: "long-way-home",
    title: "Long Way Home",
    artist: "The Midnight Echo",
    songKey: "A major",
    bpm: 84,
    duration: "3:36",
    tags: ["original", "closer"],
    status: "ready",
    updatedAt: "3 weeks ago",
    lyrics: `[Verse 1]
Took the road that no one knows
Where the river bends and slows

[Chorus]
It's a long way home tonight
But I'll find you by the light`,
  },
]

export const setlists: Setlist[] = [
  {
    id: "bluebird-fri",
    name: "Bluebird Café — Friday",
    venue: "Bluebird Café, Nashville",
    date: "Fri, Jun 26",
    songIds: ["wildfire", "neon-rivers", "paper-hearts", "gravity", "long-way-home"],
    durationMin: 42,
    status: "upcoming",
  },
  {
    id: "rooftop-sat",
    name: "Rooftop Sessions",
    venue: "The Standard, NYC",
    date: "Sat, Jul 4",
    songIds: ["city-of-glass", "slow-dance", "the-fever", "neon-rivers"],
    durationMin: 38,
    status: "upcoming",
  },
  {
    id: "acoustic-set",
    name: "Acoustic Evening",
    venue: "Private Event",
    date: "Draft",
    songIds: ["paper-hearts", "slow-dance", "gravity"],
    durationMin: 28,
    status: "draft",
  },
  {
    id: "summer-fest",
    name: "Summerfest Main Stage",
    venue: "Henry Maier Festival Park",
    date: "Performed Jun 12",
    songIds: ["wildfire", "the-fever", "neon-rivers", "city-of-glass", "long-way-home"],
    durationMin: 55,
    status: "performed",
  },
]

export function getSong(id: string) {
  return songs.find((s) => s._id === id)
}

export const stats = [
  { label: "Songs in library", value: "128", delta: "+6 this month", trend: "up" as const },
  { label: "Setlists", value: "14", delta: "2 upcoming", trend: "up" as const },
  { label: "Shows this month", value: "5", delta: "Next in 3 days", trend: "up" as const },
  { label: "Rehearsal hours", value: "23.5", delta: "+4.2 vs last", trend: "up" as const },
]

export const activity = [
  { id: 1, text: "AI cleaned up timing markers in", target: "Neon Rivers", time: "2h ago" },
  { id: 2, text: "You added", target: "The Fever", time: "Yesterday" },
  { id: 3, text: "Setlist finalized for", target: "Bluebird Café — Friday", time: "Yesterday" },
  { id: 4, text: "Transposed", target: "Gravity to G major", time: "3 days ago" },
  { id: 5, text: "Imported 4 songs from", target: "Spotify playlist", time: "5 days ago" },
]
