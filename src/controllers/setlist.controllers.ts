import { connectDB } from "@/lib/mongodb"
import { SetList } from "@/models/Setlist"
import { SetListSchema } from "@/schemas/setlist.schema"
import { NextResponse } from "next/server"

export const createSetlist = async(req: Request) => {
 try {
   await connectDB()

   const body = await req.json()

   const result = SetListSchema.safeParse(body)

   if (!result.success) {
    return NextResponse.json({
        message: "Todos los campos son obligatorios",
        error: result.error
    }, { status: 400 })
   }

   const {name,description,songs,status} = result.data;

   const newList = await SetList.create({name,description,songs,status})

   return NextResponse.json({
    message: "Lista creada exitosamente",
    data: newList
   }, { status: 201 })

 } catch (error) {
    console.error(error)
    return NextResponse.json({
        message: "Error al crear la lista , datos invalidos",
        error
    }, { status: 500 })
 }   
}