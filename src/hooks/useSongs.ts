
import { Song } from "@/lib/data"
import { queryKeys } from "@/lib/queryKeys"
import { getSongByID, getSongs } from "@/services/songs"
import { useQuery } from "@tanstack/react-query"



export const useSongs = () => {
    
    return useQuery<Song[]>({
        queryKey: queryKeys.songs,
        queryFn: getSongs,
    })
}

export const useSongByID = (id: string) => {
    return useQuery<Song | null>({
        queryKey: queryKeys.song(id),
        queryFn: () => getSongByID(id),
        enabled: !!id,
    })
}