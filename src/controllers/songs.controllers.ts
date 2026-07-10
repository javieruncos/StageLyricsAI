import { connectDB } from "@/lib/mongodb"
import Songs from "@/models/Songs";
import { createSongSchema } from "@/schemas/songs.schema";



export const getSongs = async () => {
    await connectDB()

    try {
        const songs = await Songs.find().sort({ updatedAt: -1 })
        return Response.json({
            success: true,
            data: songs
        })

    } catch (error) {
        console.error(error)
    }
}


export const createSong = async (req: Request) => {
    try {
        //nos conectamos a la base de datos 
        await connectDB()

        const body = await req.json()

        //Obtenemos el body de la petición y lo validamos con Zod.
        const result = createSongSchema.safeParse(body)

        //Si los datos no cumplen el esquema, devolvemos un error 400.
        if (!result.success) {
            return Response.json({
                success: false,
                message: "Todos los campos son OBLIGATORIOS"
            }, { status: 400 })
        }

        // Extraemos los datos ya validados por Zod.
        const {
            title,
            artist,
            lyrics,
            songKey,
            bpm,
            duration,
            tags,
            status,
        } = result.data;

        //transformamos los datos a minusculas y eliminamos espacios en blanco
        const normalizedTitle = title.trim().toLowerCase();
        const normalizedArtist = artist.trim().toLowerCase();

        //verificamos si la cancion ya existe
        const existingSong = await Songs.findOne({
            title: { $regex: `^${normalizedTitle}$`, $options: "i" },
            artist: { $regex: `^${normalizedArtist}$`, $options: "i" },
        })

        // Si la canción ya existe, devolvemos un error 409.
        if (existingSong) {
            return Response.json({
                success: false,
                message: "La cancion ya existe"
            }, { status: 409 })
        }

        //creamos el slug para la cancion
        const slug = normalizedTitle
            .replace(/\s+/g, "-")
            .replace(/[^a-z0-9-]/g, "")
            .replace(/-+/g, "-");

        //creamos la cancion
        const song = await Songs.create({
            title: normalizedTitle,
            artist: normalizedArtist,
            lyrics: lyrics.trim(),
            slug,
            songKey,
            bpm,
            duration,
            tags,
            status,
        })

        return Response.json({
            success: true,
            data: song,
            message: "Cancion creada exitosamente"
        })
    } catch (error) {
        console.error(error)
        return Response.json({
            success: false,
            message: "Error al crear la cancion"
        }, { status: 500 })
    }
}


export const getSongByID = async (id: string) => {
    try {
        await connectDB()

        const song = await Songs.findById(id)

        if (!song) {
            return Response.json({
                success: false,
                message: "Cancion no encontrada"
            }, { status: 404 })
        }

        return Response.json({
            success: true,
            data: song
        })
    } catch (error) {
        console.error(error)
        return Response.json({
            success: false,
            message: "Error al obtener la cancion"
        }, { status: 500 })
    }
}


export const updateSong = async (req: Request, id: string) => {
    try {
        await connectDB()
        const body = await req.json()

        const result = createSongSchema.safeParse(body)

        if (!result.success) {
            return Response.json({
                success: false,
                message: "Todos los campos son OBLIGATORIOS"
            }, { status: 400 })
        }

        const {
            title,
            artist,
            lyrics,
            songKey,
            bpm,
            duration,
            tags,
            status,
            genre,
        } = result.data;

        const normalizedTitle = title.trim().toLowerCase();
        const normalizedArtist = artist.trim().toLowerCase();

        const song = await Songs.findByIdAndUpdate(id, { title: normalizedTitle, artist: normalizedArtist, lyrics: lyrics.trim(), songKey, bpm, duration, tags, status, genre }, { new: true, runValidators: true })

        if (!song) {
            return Response.json({
                success: false,
                message: "Cancion no encontrada"
            }, { status: 404 })
        }

        return Response.json({
            success: true,
            data: song,
            message: "Cancion actualizada exitosamente"
        })
    } catch (error) {
        console.error(error)
        return Response.json({
            success: false,
            message: "Error al actualizar la cancion"
        }, { status: 500 })
    }
}
