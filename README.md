# MetaForge MVP

Application Next.js avec :
- 5 modes de jeu ;
- recherche, favoris locaux, classement et fiches détaillées ;
- authentification Supabase ;
- base PostgreSQL + politiques RLS ;
- espace administrateur CRUD ;
- mode démo automatique sans configuration ;
- déploiement Vercel.

## Lancer localement
```bash
npm install
npm run dev
```
Ouvrir `http://localhost:3000`.

## Connecter Supabase
1. Créer un projet Supabase.
2. Exécuter `supabase/schema.sql` dans le SQL Editor.
3. Copier `.env.example` vers `.env.local`.
4. Ajouter l’URL et la publishable key du projet.
5. Créer un compte dans `/auth`.
6. Dans la table `profiles`, passer le champ `role` du propriétaire à `admin`.

## Déployer sur Vercel
1. Mettre le dossier sur GitHub.
2. Importer le dépôt dans Vercel.
3. Ajouter les deux variables d’environnement Supabase.
4. Déployer.

## Important avant commercialisation
Les classes de démonstration ne constituent pas une source officielle. Il faut mettre en place un processus éditorial de vérification et éviter les logos/assets protégés sans autorisation.
