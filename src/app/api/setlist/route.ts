import { createSetlist, getSetlist } from "@/controllers/setlist.controllers"

export const POST = async (req: Request) => {
   return createSetlist(req)
}

export const GET = async () => {
    return getSetlist()
}

