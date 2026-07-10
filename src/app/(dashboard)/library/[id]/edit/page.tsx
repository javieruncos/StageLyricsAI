import SongForm from "@/components/forms/SongForm"




export default async function Page({ params }: { params: Promise<{ id: string }> }) {
    const { id } = await params
    return (
        <div className="pt-10">
            <SongForm songId={id} />
        </div>
    )
}