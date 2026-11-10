# Application Android — L’Islam à l’Origine

Ce répertoire documente la génération du projet natif Android. Le dossier Android natif est généré par Capacitor CLI sur une machine équipée de Node.js et Android Studio ; il ne doit pas être fabriqué manuellement.

## Prérequis

- Node.js 20 ou version compatible avec Capacitor 7
- npm
- Android Studio et Android SDK
- Java/JDK recommandé par la version d'Android Gradle Plugin installée par Capacitor

## Générer le projet Android

À la racine du dépôt :

```bash
npm install
npm run build:web
npx cap add android
npx cap sync android
npx cap open android
```

La commande `npx cap add android` est à exécuter une seule fois. Si le dossier `android/` existe déjà, utiliser directement `npx cap sync android`.

## Tester et produire l'application

Dans Android Studio :
1. Laisser Gradle terminer la synchronisation.
2. Exécuter l'application sur un émulateur ou un appareil Android USB.
3. Vérifier la navigation, le français/arabe (RTL), l'audio, les liens externes et les appels réseau.
4. Pour les tests, générer un APK de débogage.
5. Pour Google Play, générer un Android App Bundle (AAB) signé avec une clé de signature conservée en lieu sûr.

## Architecture

L'application embarque une exportation statique du site Next.js dans `out/`. Le site web Cloudflare existant reste indépendant. Cette branche ne modifie ni le Worker de production ni ses paramètres.

## Point de validation obligatoire

Le passage à `output: "export"` doit être validé par un vrai `npm run build:web`. Toute route nécessitant une exécution serveur ou une API Next.js devra être adaptée avant de publier l'application. Les API externes utilisées côté client restent dépendantes d'une connexion Internet.
