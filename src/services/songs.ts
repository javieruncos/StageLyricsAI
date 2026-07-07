import { createSongSchema } from "@/schemas/songs.schema";
import { z } from "zod";
import { api } from "./api";
import { Song } from "@/lib/data";

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
        return response.data.data
    } catch (error) {
        console.log(error)
        throw new Error("Error al obtener canciones")
    }
}