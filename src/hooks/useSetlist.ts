import { useQuery } from "@tanstack/react-query"
import { queryKeys } from "@/lib/queryKeys"
import { getSetListByID, getSetlists } from "@/services/setlist"
import { SetListDb } from "@/types/setlist"

export const useSetlistById = (id: string) => {
    return useQuery<SetListDb | null>({
        queryKey: queryKeys.setlist(id),
        queryFn: () => getSetListByID(id),
        enabled: !!id,
    })
}

export const useSetlists = () => {
    return useQuery<SetListDb[]>({
        queryKey: queryKeys.setlists,
        queryFn: () => getSetlists(),
    })
}