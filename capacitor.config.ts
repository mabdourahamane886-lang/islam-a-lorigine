import type { CapacitorConfig } from "@capacitor/cli";

const config: CapacitorConfig = {
  appId: "org.bickriserviceagency.islamalorigine",
  appName: "L’Islam à l’Origine",
  webDir: "out",
  backgroundColor: "#061a14",
  android: {
    allowMixedContent: false
  },
  plugins: {
    SplashScreen: {
      launchShowDuration: 1800,
      backgroundColor: "#061a14",
      showSpinner: false
    },
    StatusBar: {
      style: "DARK",
      backgroundColor: "#061a14"
    }
  }
};

export default config;
