"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import {
    ArrowLeft,
    Music2,
    Gauge,
    Clock,
    Save,
    Sparkles,
    X,
    Plus,
    Tag,
    ListMusic,
    Radio,
} from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { PageHeader } from "@/components/dashboard/page-header"
import { cn } from "@/lib/utils"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { createSongSchema } from "@/schemas/songs.schema";
import { z } from "zod"
import { musicalKeys, statusOptions, suggestedTags } from "@/data/songsFormData";
import { createSongs } from "@/services/songs"
import Swal from "sweetalert2"
import { useRouter } from "next/navigation"
import { useCreateSong } from "@/hooks/useCreateSong"
import { useSongByID } from "@/hooks/useSongs"

// cramos un tipo para los valores del formulario 
type createSongFormData = z.infer<typeof createSongSchema>

type SongFormProps = {
    songId?: string;
};

export default function NewSongPage({ songId }: SongFormProps) {
    const [tagInput, setTagInput] = useState("")
    const { mutateAsync } = useCreateSong()
    const isEditMode = !!songId;

    const { data: song, isLoading } = useSongByID(songId);
    // inicialimos useform que sera para tomar y registrar los valores del formulario
    //Inicializamos router
    const router = useRouter()

    const form = useForm<createSongFormData>({
        //resolver sirve para enlazar los tipos con el esquema y validarlos
        resolver: zodResolver(createSongSchema),
        mode: 'onChange',
        reValidateMode: "onChange",
        criteriaMode: "all",
        defaultValues: {
            title: "",
            artist: "",
            songKey: "C major",
            bpm: undefined,
            duration: "",
            status: "draft",
            tags: [],
            lyrics: "",
            genre: "",

        },
    })

    useEffect(() => {
        if (!song) return;

        form.reset({
            title: song.title,
            artist: song.artist,
            songKey: song.songKey,
            bpm: song.bpm,
            duration: song.duration,
            status: song.status,
            tags: song.tags,
            lyrics: song.lyrics,
            genre: song.genre ?? "",
        });
    }, [song, form]);


    //aca escuchamos los cambios en los campos del formulario
    const lyrics = form.watch("lyrics");
    const tags = form.watch("tags") ?? [];
    const title = form.watch("title");
    const status = form.watch("status") || "draft";

    //con esto obtenemos el numero de lineas para mostrarlas a futuro
    const lineCount = lyrics.trim() ? lyrics.split("\n").length : 0




    function addTag(value: string) {
        //pasamos el value a minusculas y sin espacios
        const t = value.trim().toLowerCase()
        //verificamos que no este vacio y que no exista ya en el array de tags
        if (!t) return
        //si existe no hacemos nada
        if (tags.includes(t)) return
        // agregamos el tag al array
        form.setValue("tags", [...tags, t])
        //limpiamos el input
        setTagInput("")
    }

    function removeTag(tag: string) {
        // eliminamos el tag del array atravez de un filtro que deja pasar todo excepto el que queremos borrar
        form.setValue("tags", tags.filter((t) => t !== tag))
    }

    const values = form.watch()

    const canSubmit =
        !!values.title &&
        !!values.artist &&
        !!values.lyrics &&
        !form.formState.isSubmitting

    const onSubmit = async (data: createSongFormData) => {
        try {
            const result = await mutateAsync(data)

            await Swal.fire({
                title: "¡Canción creada!",
                text: result.message,
                icon: "success",
                confirmButtonText: "Continuar",
                background: "#18181B",
                color: "#fafafa",
                confirmButtonColor: "#EAB308",
                iconColor: "#EAB308",
                customClass: {
                    popup: "rounded-xl border border-zinc-800 shadow-2xl",
                    title: "text-xl font-bold",
                    htmlContainer: "text-zinc-400",
                    confirmButton: "rounded-lg px-6 py-2 font-medium",
                },
            })

            router.push("/library")

        } catch (error) {
            await Swal.fire({
                title: "Error!",
                text: "Error al crear la cancion",
                icon: "error",
                confirmButtonText: "Aceptar",
            })
        }
    }

    return (
        <div>
            <PageHeader
                title="New Song"
                description="Add a song to your library — capture the key, tempo and lyrics so it's ready for the stage."
            >
                <Link
                    href="/library"
                    className="inline-flex items-center gap-1.5 rounded-lg border border-border px-3.5 py-2 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
                >
                    <ArrowLeft className="size-4" />
                    Volver a la biblioteca
                </Link>
            </PageHeader>

            <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="grid grid-cols-1 gap-4 p-4 md:p-6 lg:grid-cols-[1.1fr_0.9fr]"
            >
                {/* Left column — form fields */}
                <div className="flex flex-col gap-4">
                    {/* Details */}
                    <Card>
                        <CardContent className="p-5">
                            <h2 className="flex items-center gap-2 text-sm font-semibold">
                                <Music2 className="size-4 text-primary" />
                                Detalles de la canción
                            </h2>
                            <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2">
                                <Field label="Titulo" required className="sm:col-span-2">
                                    <input
                                        {...form.register("title")}
                                        placeholder="Introduce el titulo de la cancion"
                                        className={inputClass}
                                    />
                                </Field>
                                <Field label="Artista" className="sm:col-span-2">
                                    <input
                                        {...form.register("artist")}
                                        placeholder="Introduce el nombre del artista"
                                        className={inputClass}
                                    />
                                </Field>
                                <Field label="Tonalidad">
                                    <select
                                        {...form.register("songKey")}
                                        className={inputClass}
                                    >
                                        {musicalKeys.map((k) => (
                                            <option key={k} value={k}>
                                                {k}
                                            </option>
                                        ))}
                                    </select>
                                </Field>
                                <Field label="Tempo (BPM)" icon={<Gauge className="size-3" />}>
                                    <input
                                        {...form.register("bpm", { valueAsNumber: true })}
                                        inputMode="numeric"
                                        placeholder="92"
                                        className={inputClass}
                                    />
                                </Field>
                                <Field label="Duración" icon={<Clock className="size-3" />}>
                                    <input
                                        {...form.register("duration")}
                                        placeholder="4:12"
                                        className={inputClass}
                                    />
                                </Field>
                                <Field label="Estado">
                                    <div className="flex gap-1.5">
                                        {statusOptions.map((s) => (
                                            <button
                                                key={s.value}
                                                type="button"
                                                onClick={() => form.setValue("status", s.value, { shouldDirty: true, shouldValidate: true })}
                                                className={cn(
                                                    "flex-1 rounded-lg border px-2 py-2 text-xs font-medium transition-colors",
                                                    status === s.value
                                                        ? "border-primary/40 bg-primary/10 text-primary"
                                                        : "border-border text-muted-foreground hover:text-foreground",
                                                )}
                                            >
                                                {s.label}
                                            </button>
                                        ))}
                                    </div>
                                </Field>
                            </div>
                        </CardContent>
                    </Card>

                    {/* Tags */}
                    <Card>
                        <CardContent className="p-5">
                            <h2 className="flex items-center gap-2 text-sm font-semibold">
                                <Tag className="size-4 text-primary" />
                                Etiquetas
                            </h2>
                            <div className="relative mt-4 flex items-center">
                                <Plus className="pointer-events-none absolute left-3 size-4 text-muted-foreground" />
                                <input
                                    value={tagInput}
                                    onChange={(e) => setTagInput(e.target.value)}
                                    onKeyDown={(e) => {
                                        if (e.key === "Enter" && !e.nativeEvent.isComposing) {
                                            e.preventDefault()
                                            addTag(tagInput)
                                        }
                                    }}
                                    placeholder="Introduce la etiqueta y presiona Enter"
                                    className="h-9 w-full rounded-lg border border-border bg-input pl-9 pr-3 text-sm outline-none transition-colors placeholder:text-muted-foreground focus:border-ring"
                                />
                            </div>
                            {tags.length > 0 && (
                                <div className="mt-3 flex flex-wrap gap-1.5">
                                    {tags.map((t) => (
                                        <span
                                            key={t}
                                            className="inline-flex items-center gap-1 rounded-md border border-primary/40 bg-primary/10 px-2 py-1 text-xs font-medium text-primary"
                                        >
                                            {t}
                                            <button
                                                type="button"
                                                onClick={() => removeTag(t)}
                                                aria-label={`Remove ${t}`}
                                                className="text-primary/70 hover:text-primary"
                                            >
                                                <X className="size-3" />
                                            </button>
                                        </span>
                                    ))}
                                </div>
                            )}
                            <div className="mt-3 flex flex-wrap gap-1.5">
                                {suggestedTags
                                    .filter((t) => !tags.includes(t))
                                    .map((t) => (
                                        <button
                                            key={t}
                                            type="button"
                                            onClick={() => addTag(t)}
                                            className="rounded-md border border-border px-2 py-1 text-xs text-muted-foreground transition-colors hover:border-primary/40 hover:text-foreground"
                                        >
                                            + {t}
                                        </button>
                                    ))}
                            </div>
                        </CardContent>
                    </Card>

                    {/* Lyrics */}
                    <Card>
                        <CardContent className="p-5">
                            <div className="flex items-center justify-between">
                                <h2 className="flex items-center gap-2 text-sm font-semibold">
                                    <ListMusic className="size-4 text-primary" />
                                    Letra
                                </h2>
                                <button
                                    type="button"
                                    className="inline-flex items-center gap-1.5 rounded-lg border border-primary/40 bg-primary/10 px-2.5 py-1.5 text-xs font-medium text-primary transition-colors hover:bg-primary/20"
                                >
                                    <Sparkles className="size-3.5" />
                                    Formato IA
                                </button>
                            </div>
                            <textarea
                                {...form.register("lyrics")}
                                rows={14}
                                placeholder={"[Verse 1]\nEscribe o pega la letra aquí...\n\n[Chorus]\nUsa etiquetas de sección como [Verse], [Chorus], [Bridge]"}
                                className="mt-4 w-full resize-y rounded-lg border border-border bg-input p-4 font-mono text-sm leading-relaxed outline-none transition-colors placeholder:text-muted-foreground focus:border-ring"
                            />
                            <p className="mt-2 font-mono text-[11px] text-muted-foreground">
                                {lineCount} línea{lineCount === 1 ? "" : "s"}
                            </p>
                        </CardContent>
                    </Card>
                </div>

                {/* Right column — live preview */}
                <div className="flex flex-col gap-4">
                    <Card className="lg:sticky lg:top-20">
                        <div className="flex items-center justify-between border-b border-border px-5 py-3">
                            <span className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground">
                                Previsualización
                            </span>
                            <Badge
                                variant={
                                    status === "ready" ? "success" : status === "rehearsing" ? "warning" : "muted"
                                }
                            >
                                {statusOptions.find((s) => s.value === status)?.label}
                            </Badge>
                        </div>
                        <CardContent className="p-5">
                            <div className="flex items-center gap-3">
                                <div className="flex size-11 shrink-0 items-center justify-center rounded-lg bg-muted text-muted-foreground">
                                    <Music2 className="size-5" />
                                </div>
                                <div className="min-w-0">
                                    <p className="truncate text-base font-semibold tracking-tight">
                                        {title || "Untitled song"}
                                    </p>
                                    <p className="truncate text-sm text-muted-foreground">
                                        {form.getValues("artist") || "Unknown artist"}
                                    </p>
                                </div>
                            </div>

                            <div className="mt-4 grid grid-cols-3 gap-px overflow-hidden rounded-lg border border-border bg-border">
                                <div className="bg-card p-3">
                                    <p className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground">
                                        Tonalidad
                                    </p>
                                    <p className="mt-1 font-mono text-sm font-medium">{form.getValues("songKey")}</p>
                                </div>
                                <div className="bg-card p-3">
                                    <p className="flex items-center gap-1 font-mono text-[10px] uppercase tracking-widest text-muted-foreground">
                                        <Gauge className="size-3" /> Tempo
                                    </p>
                                    <p className="mt-1 font-mono text-sm font-medium">
                                        {form.getValues("bpm") ? `${form.getValues("bpm")} BPM` : "—"}
                                    </p>
                                </div>
                                <div className="bg-card p-3">
                                    <p className="flex items-center gap-1 font-mono text-[10px] uppercase tracking-widest text-muted-foreground">
                                        <Clock className="size-3" /> Duración
                                    </p>
                                    <p className="mt-1 font-mono text-sm font-medium">{form.getValues("duration") || "—"}</p>
                                </div>
                            </div>

                            {tags.length > 0 && (
                                <div className="mt-3 flex flex-wrap gap-1">
                                    {tags.map((t) => (
                                        <Badge key={t} variant="outline">
                                            {t}
                                        </Badge>
                                    ))}
                                </div>
                            )}

                            <div className="mt-4 max-h-72 overflow-y-auto rounded-lg border border-border bg-background/40 p-4">
                                {lyrics.trim() ? (
                                    <pre className="whitespace-pre-wrap font-sans text-sm leading-relaxed text-foreground/90">
                                        {lyrics}
                                    </pre>
                                ) : (
                                    <p className="text-sm text-muted-foreground">
                                        Tus letras aparecerán aquí mientras escribes.
                                    </p>
                                )}
                            </div>
                        </CardContent>
                        <div className="flex items-center gap-2 px-5 py-3">
                            <button
                                type="submit"
                                disabled={!canSubmit}
                                className="inline-flex flex-1 items-center justify-center gap-1.5 rounded-lg bg-primary px-3 py-2.5 text-sm font-semibold text-primary-foreground transition-colors hover:bg-primary/90 disabled:cursor-not-allowed disabled:opacity-50"
                            >
                                <Save className="size-4" />
                                Guardar
                            </button>
                            <button
                                type="button"
                                disabled={!form.formState.isValid}
                                className="inline-flex items-center justify-center gap-1.5 rounded-lg border border-border px-3 py-2.5 text-sm font-medium transition-colors hover:bg-muted disabled:cursor-not-allowed disabled:opacity-50"
                            >
                                <Radio className="size-4" />
                                Guardar y abrir en vivo
                            </button>
                            <Link
                                href="/library"
                                className="inline-flex items-center justify-center rounded-lg border border-border px-3 py-2.5 text-sm font-medium text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
                            >
                                Cancelar
                            </Link>
                        </div>
                    </Card>
                </div>
            </form>
        </div>
    )
}

const inputClass =
    "h-9 w-full rounded-lg border border-border bg-input px-3 text-sm outline-none transition-colors placeholder:text-muted-foreground focus:border-ring"

function Field({
    label,
    required,
    icon,
    className,
    children,
}: {
    label: string
    required?: boolean
    icon?: React.ReactNode
    className?: string
    children: React.ReactNode
}) {
    return (
        <label className={cn("block", className)}>
            <span className="mb-1.5 flex items-center gap-1 text-xs font-medium text-muted-foreground">
                {icon}
                {label}
                {required && <span className="text-primary">*</span>}
            </span>
            {children}
        </label>
    )
}
