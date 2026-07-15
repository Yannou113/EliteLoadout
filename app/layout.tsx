import type { Metadata } from 'next'
import './globals.css'
export const metadata: Metadata = {title:'MetaForge — Classes Call of Duty',description:'Classes méta pour Battle Royale, Résurgence, Ranked, Multijoueur et Zombies.'}
export default function RootLayout({children}:{children:React.ReactNode}){return <html lang="fr"><body>{children}</body></html>}
