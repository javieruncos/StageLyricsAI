"use client"

import { useState } from "react"
import { Check, User, Radio, Sparkles, CreditCard } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { PageHeader } from "@/components/dashboard/page-header"
import { cn } from "@/lib/utils"

function Toggle({
  enabled,
  onChange,
}: {
  enabled: boolean
  onChange: (v: boolean) => void
}) {
  return (
    <button
      role="switch"
      aria-checked={enabled}
      onClick={() => onChange(!enabled)}
      className={cn(
        "relative inline-flex h-6 w-11 shrink-0 items-center rounded-full transition-colors",
        enabled ? "bg-primary" : "bg-muted",
      )}
    >
      <span
        className={cn(
          "inline-block size-5 transform rounded-full bg-background shadow transition-transform",
          enabled ? "translate-x-5" : "translate-x-0.5",
        )}
      />
    </button>
  )
}

const themes = [
  { id: "dark", label: "Stage Dark", swatch: "oklch(0.16 0.006 264)" },
  { id: "amber", label: "Spotlight", swatch: "oklch(0.82 0.15 78)" },
  { id: "contrast", label: "High Contrast", swatch: "oklch(0.97 0 0)" },
]

export default function SettingsPage() {
  const [autoFormat, setAutoFormat] = useState(true)
  const [autoCues, setAutoCues] = useState(true)
  const [autoTranspose, setAutoTranspose] = useState(false)
  const [keepAwake, setKeepAwake] = useState(true)
  const [mirror, setMirror] = useState(false)
  const [theme, setTheme] = useState("dark")

  return (
    <div>
      <PageHeader
        title="Settings"
        description="Manage your profile, performance defaults and AI preferences."
      />

      <div className="grid max-w-4xl gap-6 p-4 md:p-6">
        {/* Profile */}
        <Card>
          <CardContent className="p-5">
            <div className="mb-5 flex items-center gap-2">
              <User className="size-4 text-primary" />
              <h2 className="text-sm font-semibold tracking-tight">Profile</h2>
            </div>
            <div className="flex items-center gap-4">
              <div className="flex size-16 items-center justify-center rounded-full bg-primary/20 text-lg font-semibold text-primary">
                ME
              </div>
              <div>
                <p className="font-medium">Maya Ellis</p>
                <p className="text-sm text-muted-foreground">The Midnight Echo · Lead vocals</p>
              </div>
            </div>
            <div className="mt-5 grid gap-4 sm:grid-cols-2">
              <Field label="Display name" value="Maya Ellis" />
              <Field label="Band / project" value="The Midnight Echo" />
              <Field label="Email" value="maya@midnightecho.fm" />
              <Field label="Role" value="Lead vocals" />
            </div>
          </CardContent>
        </Card>

        {/* AI preferences */}
        <Card>
          <CardContent className="p-5">
            <div className="mb-5 flex items-center gap-2">
              <Sparkles className="size-4 text-primary" />
              <h2 className="text-sm font-semibold tracking-tight">AI preferences</h2>
            </div>
            <div className="divide-y divide-border">
              <SettingRow
                title="Auto-format new lyrics"
                desc="Detect verses, choruses and bridges when importing."
              >
                <Toggle enabled={autoFormat} onChange={setAutoFormat} />
              </SettingRow>
              <SettingRow
                title="Generate performance cues"
                desc="Suggest timing markers from a reference recording."
              >
                <Toggle enabled={autoCues} onChange={setAutoCues} />
              </SettingRow>
              <SettingRow
                title="Suggest transpositions"
                desc="Recommend a comfortable key based on your vocal range."
              >
                <Toggle enabled={autoTranspose} onChange={setAutoTranspose} />
              </SettingRow>
            </div>
          </CardContent>
        </Card>

        {/* Performance defaults */}
        <Card>
          <CardContent className="p-5">
            <div className="mb-5 flex items-center gap-2">
              <Radio className="size-4 text-primary" />
              <h2 className="text-sm font-semibold tracking-tight">
                Performance defaults
              </h2>
            </div>
            <div className="divide-y divide-border">
              <SettingRow
                title="Keep screen awake"
                desc="Prevent your device from sleeping during Live Mode."
              >
                <Toggle enabled={keepAwake} onChange={setKeepAwake} />
              </SettingRow>
              <SettingRow
                title="Mirror text"
                desc="Flip lyrics horizontally for teleprompter glass."
              >
                <Toggle enabled={mirror} onChange={setMirror} />
              </SettingRow>
            </div>

            <div className="mt-5">
              <p className="mb-2 text-sm font-medium">Stage theme</p>
              <div className="flex flex-wrap gap-3">
                {themes.map((t) => (
                  <button
                    key={t.id}
                    onClick={() => setTheme(t.id)}
                    className={cn(
                      "flex items-center gap-2 rounded-lg border px-3 py-2 text-sm transition-colors",
                      theme === t.id
                        ? "border-primary/50 bg-primary/10"
                        : "border-border hover:bg-muted/50",
                    )}
                  >
                    <span
                      className="size-4 rounded-full border border-border"
                      style={{ backgroundColor: t.swatch }}
                    />
                    {t.label}
                    {theme === t.id && <Check className="size-4 text-primary" />}
                  </button>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Plan */}
        <Card>
          <CardContent className="flex flex-wrap items-center justify-between gap-4 p-5">
            <div className="flex items-center gap-3">
              <div className="flex size-10 items-center justify-center rounded-lg bg-primary/15 text-primary">
                <CreditCard className="size-5" />
              </div>
              <div>
                <p className="flex items-center gap-2 text-sm font-medium">
                  Pro Stage Plan <Badge>Active</Badge>
                </p>
                <p className="text-sm text-muted-foreground">
                  Unlimited songs, AI tools and multi-device sync.
                </p>
              </div>
            </div>
            <button className="rounded-lg border border-border px-3.5 py-2 text-sm font-medium transition-colors hover:bg-muted">
              Manage billing
            </button>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

function Field({ label, value }: { label: string; value: string }) {
  return (
    <label className="block">
      <span className="mb-1.5 block text-xs font-medium text-muted-foreground">
        {label}
      </span>
      <input
        defaultValue={value}
        className="h-9 w-full rounded-lg border border-border bg-background px-3 text-sm outline-none transition-colors focus:border-ring"
      />
    </label>
  )
}

function SettingRow({
  title,
  desc,
  children,
}: {
  title: string
  desc: string
  children: React.ReactNode
}) {
  return (
    <div className="flex items-center justify-between gap-4 py-4 first:pt-0 last:pb-0">
      <div className="min-w-0">
        <p className="text-sm font-medium">{title}</p>
        <p className="text-xs text-muted-foreground">{desc}</p>
      </div>
      {children}
    </div>
  )
}
