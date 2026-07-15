
import { SetListSchema } from "@/schemas/setlist.schema"
import { SetListDb } from "@/types/setlist"
import { api } from "./api"
import {z} from "zod"

export const createSetlist = async  (setlist: z.infer<typeof SetListSchema>):Promise<SetListDb>=>{
   try {
    const result = await api.post(`/setlists`, setlist)
    return result.data
   } catch (error) {
    console.log(error)
    throw new Error("Error al crear la setlist")
   }
}

export const getSetlists = async ():Promise<SetListDb[]>=>{
    try {
        const result = await api.get(`/setlist`)
        return result.data.data
    } catch (error) {
        console.log(error)
        throw new Error("Error al obtener las setlists")
    }
}

export const updateSetlist = async (id:string,setlist: z.infer<typeof SetListSchema>):Promise<SetListDb>=>{
    try {
        const result = await api.patch(`/setlists/${id}`, setlist)
        return result.data
    } catch (error) {
        console.log(error)
        throw new Error("Error al actualizar la setlist")
    }
}


export const getSetListByID = async (id:string):Promise<SetListDb>=>{
    try {
        const result = await api.get(`/setlists/${id}`)
        return result.data
    } catch (error) {
        console.log(error)
        throw new Error("Error al obtener la setlist")
    }
}