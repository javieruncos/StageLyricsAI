import { getSetListByID, updateSetlist } from "@/controllers/setlist.controllers";

export async function PUT(
    req: Request,
    { params }: { params: Promise<{ id:string }> }
){
    const {id} = await params

    return updateSetlist(req,id)
}

export async function GET(
    req: Request,
    { params }: { params: Promise<{ id: string }> }
) {
  const {id} = await params

    return getSetListByID(id)
}