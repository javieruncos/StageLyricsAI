import { connectDB } from "@/lib/mongodb"
import Songs from "@/models/Songs"


export const GET = async () => {
    await connectDB()

    return Response.json({ success: true, message: "MongoDB conectado correctamente", status: 200 })
}



export const POST = async (request: Request) => {
    try {
        await connectDB()
        const body = await request.json();

        const { title, artist, lyrics } = body;

        if (!title || !artist || !lyrics) {
            return Response.json({ success: false, message: "Todos los campos son obligatorios", status: 400 })
        }

        const newSong = await Songs.create({ title, artist, lyrics });
        return Response.json({ success: true, message: "Canción creada correctamente", data: newSong, status: 200 })

    } catch (err: any) {
        console.error("Error al crear la canción:", err);
        return Response.json({
            success: false,
            message: "Error al crear la canción."
        }, { status: 500 })
    }
}