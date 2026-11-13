import type { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.mood.jardin',
  appName: 'Mood Jardin',
  webDir: 'web-dist',
  server: { androidScheme: 'https' }
};

export default config;
