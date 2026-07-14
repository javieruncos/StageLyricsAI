import { connectDB } from "@/lib/mongodb"
import { SetList } from "@/models/Setlist"
import Songs from "@/models/Songs"
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

   const {name,description,songs,status,date,venue} = result.data;

     // Obtener las canciones seleccionadas
        const songDocs = await Songs.find({
            _id: { $in: songs },
        });

        // Calcular duración total
        const durationMin = songDocs.reduce((total, song) => {
            // song.duration = "4:12"
            const [min, sec] = song.duration.split(":").map(Number);

            return total + min + sec / 60;
        }, 0);

        const newSetlist = await SetList.create({
            name,
            description,
            songs,
            status,
            date: date ? new Date(date) : new Date(),
            venue,
            durationMin: Math.round(durationMin),
        });

   return NextResponse.json({
    message: "Lista creada exitosamente",
    data: newSetlist
   }, { status: 201 })

 } catch (error) {
    console.error(error)
    return NextResponse.json({
        message: "Error al crear la lista , datos invalidos",
        error
    }, { status: 500 })
 }   
}