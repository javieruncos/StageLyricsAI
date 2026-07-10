import { queryKeys } from "@/lib/queryKeys"
import { updateSong } from "@/services/songs"
import { useMutation, useQueryClient } from "@tanstack/react-query"

export const useUpdateSong = () => {
    const queryClient = useQueryClient()

    return useMutation({
        mutationFn: updateSong,
        onSuccess: (_,variables) => {
            queryClient.invalidateQueries({ queryKey: queryKeys.songs })
            queryClient.invalidateQueries({ queryKey: queryKeys.song(variables.id) })
        }
    })
}