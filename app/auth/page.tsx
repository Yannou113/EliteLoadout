'use client'
import Link from 'next/link'
import { FormEvent, useState } from 'react'
import { createClient, isSupabaseConfigured } from '@/lib/supabase'
export default function AuthPage(){
 const [email,setEmail]=useState(''); const [password,setPassword]=useState(''); const [signup,setSignup]=useState(false); const [message,setMessage]=useState('')
 async function submit(e:FormEvent){e.preventDefault(); if(!isSupabaseConfigured){setMessage('Mode démo : ajoute les clés Supabase pour activer les comptes.');return} const s=createClient()!; const r=signup?await s.auth.signUp({email,password}):await s.auth.signInWithPassword({email,password}); setMessage(r.error?r.error.message:(signup?'Compte créé. Vérifie ton e-mail.':'Connexion réussie.'))}
 return <main className="auth-page"><Link href="/" className="back">← Retour</Link><form onSubmit={submit} className="auth-card"><div className="brand-mark">MF</div><h1>{signup?'Créer un compte':'Se connecter'}</h1><p>Sauvegarde tes classes et retrouve-les sur tous tes appareils.</p><label>E-mail<input type="email" required value={email} onChange={e=>setEmail(e.target.value)}/></label><label>Mot de passe<input type="password" minLength={6} required value={password} onChange={e=>setPassword(e.target.value)}/></label><button type="submit">{signup?"S’inscrire":"Se connecter"}</button>{message&&<div className="notice">{message}</div>}<button type="button" className="text-button" onClick={()=>setSignup(!signup)}>{signup?'Déjà inscrit ? Se connecter':'Pas encore de compte ? S’inscrire'}</button></form></main>
}
