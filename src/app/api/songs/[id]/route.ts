import { deleteSong, getSongByID, updateSong } from "@/controllers/songs.controllers";

export const GET = async (req: Request, { params }: { params: Promise<{ id: string }> }) => {
    const { id } = await params
    return getSongByID(id)
}


export const PUT = async (req: Request, { params }: { params: Promise<{ id: string }> }) => {
    const { id } = await params
    return updateSong(req, id)
}


export const DELETE = async (req: Request, { params }: { params: Promise<{ id: string }> }) => {
    const { id } = await params
    return deleteSong(id)
}