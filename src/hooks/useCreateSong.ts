import { createSongs } from "@/services/songs"
import { useMutation , useQueryClient } from "@tanstack/react-query"
import { queryKeys } from "@/lib/queryKeys"

export const useCreateSong = () => {
    const queryClient = useQueryClient()
    return useMutation({
        mutationFn: createSongs,
        onSuccess:()=>{
            queryClient.invalidateQueries({
                queryKey: queryKeys.songs
            })
        }       
    })
}
