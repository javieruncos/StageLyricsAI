import { queryKeys } from "@/lib/queryKeys"
import { createSetlist } from "@/services/setlist"
import { useMutation, useQueryClient } from "@tanstack/react-query"


export const useCreateSetlist = ()=>{
    const queryClient = useQueryClient()

    return useMutation({
        mutationFn: createSetlist,
        onSuccess: ()=>{
            queryClient.invalidateQueries({queryKey: queryKeys.setlists})
        }
    })
}