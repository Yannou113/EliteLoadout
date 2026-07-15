export type Mode = 'battle-royale' | 'resurgence' | 'ranked' | 'multiplayer' | 'zombies'
export type Attachment = { slot: string; name: string }
export type Loadout = {
  id: string
  name: string
  slug: string
  mode: Mode
  category: string
  role: string
  tier: 'S+' | 'S' | 'A' | 'B'
  score: number
  code: string
  description: string
  tags: string[]
  attachments: Attachment[]
  published: boolean
  updated_at: string
}
