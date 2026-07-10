import { createSongSchema } from "@/schemas/songs.schema";
import { z } from "zod";
import { api } from "./api";
import { Song } from "@/lib/data";


type UpdateSongParams = {
    id: string,
    data: z.infer<typeof createSongSchema>
}



export const createSongs = async (data: z.infer<typeof createSongSchema>) => {
    try {
        const response = await api.post("/songs", data);
        return response.data
    } catch (error) {
        console.log(error)
    }

}


export const getSongs = async (): Promise<Song[]> => {
    try {
        const response = await api.get("/songs")
        console.log(response.data.data)
        return response.data.data
    } catch (error) {
        console.log(error)
        throw new Error("Error al obtener canciones")
    }
}

export const getSongByID = async (id: string): Promise<Song | null> => {
    try {
        const response = await api.get(`/songs/${id}`)
        return response.data.data
    } catch (error) {
        console.log(error)
        return null
    }
}

export const updateSong = async ({id, data}: UpdateSongParams) =>{
    try {
        const response = await api.put(`/songs/${id}`, data);
        return response.data
    } catch (error) {
        console.log(error)
    }

    
}