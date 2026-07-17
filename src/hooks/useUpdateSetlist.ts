import { useMutation, useQueryClient } from "@tanstack/react-query"
import { updateSetlist } from "@/services/setlist"
import { queryKeys } from "@/lib/queryKeys"


export const useUpdateSetlist = () => {
    const queryClient = useQueryClient()
    return useMutation({
        mutationFn: updateSetlist,
        onSuccess:(_,variables)=>{
            queryClient.invalidateQueries({queryKey: queryKeys.setlists})
            queryClient.invalidateQueries({queryKey: queryKeys.setlist(variables.id)})
        }
    })
}