# Android native project — L’Islam à l’Origine

Le dossier `android/` est généré automatiquement par Capacitor dans le pipeline CI. Ne créez pas ce dossier manuellement avant la génération.

## Prérequis locaux
- Node.js 20+
- Android Studio et Android SDK
- JDK 17+

## Génération locale
```bash
npm install
npm run build:web
npx cap add android
npx cap sync android
npx cap open android
```

## Tests
Dans Android Studio, lancez l'application sur un émulateur ou un téléphone USB. Vérifiez navigation, français/arabe (RTL), audio, liens, réseau, reprise après mise en veille et affichage sur plusieurs tailles d'écran.

## Artefacts CI
Le workflow Android génère le projet natif dans un runner éphémère et publie :
- le projet Android natif compressé ;
- l'APK Debug installable pour les tests ;
- l'AAB Release non signé (artefact de compilation, pas encore publiable sur Google Play).

## Signature Google Play
La version finale Google Play doit être signée avec une clé de téléversement conservée hors du dépôt. Les secrets de signature ne doivent jamais être commités.
