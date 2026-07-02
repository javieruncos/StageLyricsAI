import { createSong, getSongs } from "@/controllers/songs.controllers"



export const GET = async () => {
   return getSongs()
}


export const POST = async (request: Request) => {
    return createSong(request)
}