export function SiteFooter() {
  return (
    <footer className="mt-16 bg-header">
      <div className="mx-auto max-w-6xl px-4 py-8 text-xs text-muted-foreground">
        <div className="flex flex-wrap items-center justify-between gap-4 border-t border-border/60 pt-6">
          <p className="font-black tracking-[0.2em] text-foreground/70">VAPOR</p>
          <p className="max-w-xl text-pretty">
            {'© 2026 Valve-ish Corporation. All games are parodies. No real money, games, or wives were harmed. '}
            {'Vapor Bucks have no cash value, much like your backlog.'}
          </p>
        </div>
      </div>
    </footer>
  )
}
