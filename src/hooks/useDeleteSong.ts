import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteSong } from "@/services/songs";
import { queryKeys } from "@/lib/queryKeys";



export const useDeleteSong = () => {
    const queryClient = useQueryClient()

    return useMutation({
        mutationFn:deleteSong,
        onSuccess:()=>{
            queryClient.invalidateQueries({queryKey:queryKeys.songs})
        }
    })
}