
import { Song } from "@/lib/data"
import { queryKeys } from "@/lib/queryKeys"
import { getSongs } from "@/services/songs"
import { useQuery } from "@tanstack/react-query"



export const useSongs = () => {
    
    return useQuery<Song[]>({
        queryKey: queryKeys.songs,
        queryFn: getSongs,
    })
}