import SetListForm from "@/components/forms/SetListForm";

export default async function Page({ params }: { params: Promise<{ id: string }> }) {
    const { id } = await params
    return (
        <div className="pt-10">
            <SetListForm setlistId={id} />
        </div>
    )
}