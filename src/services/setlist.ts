import { SetList } from "@/schemas/setlist.schema"
import { api } from "./api"

export const createSetlist = async  (setlist: SetList):Promise<SetList>=>{
   try {
    const result = await api.post(`/setlists`, setlist)
    return result.data
   } catch (error) {
    console.log(error)
    throw new Error("Error al crear la setlist")
   }
}

export const getSetlists = async ():Promise<SetList[]>=>{
    try {
        const result = await api.get(`/setlists`)
        return result.data.data
    } catch (error) {
        console.log(error)
        throw new Error("Error al obtener las setlists")
    }
}