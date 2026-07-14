import { SetList } from "@/schemas/setlist.schema"
import { useQuery } from "@tanstack/react-query"
import { queryKeys } from "@/lib/queryKeys"
import { getSetListByID, getSetlists } from "@/services/setlist"

export const useSetlistById = (id: string) => {
    return useQuery<SetList | null>({
        queryKey: queryKeys.setlist(id),
        queryFn: () => getSetListByID(id),
        enabled: !!id,
    })
}

export const useSetlists = () => {
    return useQuery<SetList[]>({
        queryKey: queryKeys.setlists,
        queryFn: () => getSetlists(),
    })
}