# L’Islam à l’Origine — feuille de route Android

## Objectif

Créer une application Android native basée sur le site Next.js existant, en conservant le site public et son URL Cloudflare :

`https://islam-a-lorigine.bickriservice-agency.workers.dev/`

## État du socle dans cette branche

- Capacitor 7 ajouté aux dépendances.
- Configuration Capacitor : `capacitor.config.ts`.
- Next.js configuré pour produire le dossier statique `out/`.
- Scripts npm Android ajoutés.
- Aucune URL de production n'est remplacée par une URL de prévisualisation.
- Aucun secret de paiement ou de Supabase n'est ajouté au dépôt.

## Étapes restantes avant un APK/AAB

1. Installer les dépendances et produire l'export Next.js.
2. Corriger toute incompatibilité détectée par le build statique.
3. Générer le projet natif avec `npx cap add android`.
4. Créer les icônes, l'écran de lancement et les ressources Android définitives.
5. Tester sur plusieurs tailles d'écran et versions Android.
6. Implémenter l'authentification et la synchronisation de progression.
7. Intégrer les paiements via une API serveur et des webhooks vérifiés.
8. Effectuer les tests de sécurité et préparer la signature Google Play.

## Protection de la production

Cette branche est isolée de `main`. Ne pas fusionner et ne pas déployer sur le Worker de production avant validation explicite des tests, de la revue du code et de l'utilisateur.
