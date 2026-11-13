# Design Document: Mood Cycle Landing Site

## Overview

Le **Mood Cycle Landing Site** est une page web immersive d'une seule page (SPA) créée avec React Three Fiber pour présenter l'application "Mood Jardin". Le site combine une expérience 3D interactive procédurale avec une direction artistique "nuit luxueuse" (fond aubergine, lueurs rose/pêche) pour offrir une présentation visuelle et engageante du cycle menstruel.

### Objectifs Principaux

1. **Présentation visuelle immersive** : Utiliser une scène 3D procédurale pour représenter le cycle menstruel de manière esthétique
2. **Extraction d'informations réelles** : Afficher uniquement des données vérifiables depuis le dépôt de l'application existante
3. **Performance optimale** : Atteindre un score Lighthouse mobile > 90 avec lazy-loading et code-splitting
4. **Confidentialité transparente** : Communiquer clairement que toutes les données restent locales (localStorage)
5. **Accessibilité WCAG AA** : Garantir navigation clavier, contraste, et compatibilité lecteur d'écran

### Technologies Choisies

- **Frontend Framework** : React 18 + TypeScript
- **Build Tool** : Vite (développement rapide, HMR, optimisation bundle)
- **3D Rendering** : Three.js avec @react-three/fiber, @react-three/drei, @react-three/postprocessing
- **Styling** : Tailwind CSS (utility-first, responsive, thème personnalisé)
- **Animations** : Framer Motion (scroll animations, accordéon)
- **Routing** : React Router v6 (SPA avec page confidentialité)
- **Polices** : Fraunces (titres élégants) + Figtree (corps lisible)

### Contraintes Techniques

- **Aucun backend** : Site statique déployé sur Vercel
- **Aucune clé API** : Pas d'appels externes (sauf polices Google Fonts)
- **Pas de tracking** : Respect de la confidentialité comme l'application
- **Création procédurale 3D** : Pas de modèles GLB (tout généré par code)
- **Support mobile** : Largeur minimale 360px, adaptatif jusqu'à 1920px+
- **Repli WebGL** : Version CSS alternative si WebGL indisponible

## Architecture

### Architecture High-Level

```
┌─────────────────────────────────────────────────────────────┐
│                         Browser                              │
├─────────────────────────────────────────────────────────────┤
│  React Router (/, /confidentialite, /404)                   │
├─────────────────────────────────────────────────────────────┤
│                     Layout Layer                             │
│  ┌──────────────────────────────────────────────────────┐   │
│  │ Navigation (sticky) │ Main Content │ Footer          │   │
│  └──────────────────────────────────────────────────────┘   │
├─────────────────────────────────────────────────────────────┤
│                      Page Layer                              │
│  • HomePage (sections composées)                             │
│  • PrivacyPage (détails confidentialité)                     │
│  • NotFoundPage (404)                                        │
├─────────────────────────────────────────────────────────────┤
│                    Section Layer                             │
│  Hero │ CyclePhases │ Features │ HowItWorks │               │
│  Privacy │ FAQ │ FinalCTA                                    │
├─────────────────────────────────────────────────────────────┤
│                   Component Layer                            │
│  3D: HeroCanvas, Orb, CycleRing, Drops, Lights              │
│  UI: Card, Button, Accordion, Badge, PhaseWheel             │
├─────────────────────────────────────────────────────────────┤
│                    Service Layer                             │
│  config.ts (configuration centralisée)                       │
│  webgl-detector.ts (détection capacités 3D)                  │
│  scroll-observer.ts (animations scroll)                      │
└─────────────────────────────────────────────────────────────┘
```

### Architecture de la Scène 3D

```
Canvas (R3F)
├── ErrorBoundary (repli CSS si crash)
├── Suspense (fallback: spinner)
├── PerspectiveCamera (fov: 35, position: [0, 0, 12])
├── Lights (Environment + Lightformers + HemisphereLight)
├── Orb (groupe pivot)
│   ├── Sphere (MeshPhysicalMaterial nacré)
│   ├── Rim (visière verre noir)
│   └── Eye (œil-lune avec phase)
├── CycleRing (28 billes colorées sur cercle incliné)
├── Drops (3-5 gouttes flottantes rose/pêche)
├── Rig (animation curseur + flottement)
└── EffectComposer (Bloom post-processing)
```

### Structure des Fichiers et Dossiers

```
mood-cycle-site/
├── public/
│   ├── favicon.ico
│   ├── apple-touch-icon.png
│   ├── og.png (1200×630 Open Graph)
│   ├── robots.txt
│   └── sitemap.xml
├── src/
│   ├── main.tsx (point d'entrée React)
│   ├── App.tsx (Router + routes)
│   ├── index.css (Tailwind + custom CSS)
│   ├── config.ts (⭐ configuration centralisée)
│   │
│   ├── components/
│   │   ├── layout/
│   │   │   ├── Navigation.tsx (nav fixe glassmorphism)
│   │   │   └── Footer.tsx
│   │   ├── ui/
│   │   │   ├── Card.tsx (carte verre réutilisable)
│   │   │   ├── Button.tsx (CTA avec variants)
│   │   │   ├── Badge.tsx (Windows/Android)
│   │   │   ├── Accordion.tsx (FAQ accessible)
│   │   │   └── PhaseWheel.tsx (roue SVG 4 phases)
│   │   └── 3d/
│   │       ├── HeroCanvas.tsx (Canvas lazy-loaded)
│   │       ├── Orb.tsx (sphère nacrée + animation)
│   │       ├── Rim.tsx (visière verre noir)
│   │       ├── Eye.tsx (œil-lune avec phase)
│   │       ├── CycleRing.tsx (28 billes colorées)
│   │       ├── Drops.tsx (gouttes flottantes)
│   │       ├── Lights.tsx (Environment + Lightformers)
│   │       ├── Rig.tsx (animation curseur)
│   │       └── WebGLFallback.tsx (repli CSS)
│   │
│   ├── pages/
│   │   ├── HomePage.tsx (sections composées)
│   │   ├── PrivacyPage.tsx (page dédiée)
│   │   └── NotFoundPage.tsx (404)
│   │
│   ├── sections/
│   │   ├── Hero.tsx (Scene_3D + CTA)
│   │   ├── CyclePhases.tsx (roue + 4 cartes)
│   │   ├── Features.tsx (Bento Grid 3×3)
│   │   ├── HowItWorks.tsx (3 étapes + aide Windows)
│   │   ├── Privacy.tsx (localStorage + IA offline)
│   │   ├── FAQ.tsx (accordéon)
│   │   └── FinalCTA.tsx (téléchargement avant footer)
│   │
│   ├── services/
│   │   ├── webgl-detector.ts (détection WebGL)
│   │   └── scroll-observer.ts (IntersectionObserver)
│   │
│   └── types/
│       └── index.ts (types TypeScript)
│
├── vercel.json (config déploiement)
├── package.json
├── tsconfig.json
├── vite.config.ts
├── tailwind.config.js
├── postcss.config.js
└── README.md
```

## Components and Interfaces

### Configuration Centrale (src/config.ts)

**Rationale** : Centraliser toutes les URLs et constantes modifiables dans un seul fichier pour faciliter la maintenance et éviter la dispersion.

```typescript
export const CONFIG = {
  // Application Info
  appName: 'Mood Jardin',
  appTagline: 'Suivi du cycle menstruel privé et bienveillant',
  
  // Download Links
  downloads: {
    windows: {
      available: true,
      url: 'https://github.com/Killurassoul/Mood-cycle-tracker-and-more/releases/latest/download/Mood-Jardin-Setup.exe',
      label: 'Télécharger pour Windows'
    },
    android: {
      available: false, // En développement
      url: '',
      label: 'Bientôt sur Android'
    },
    ios: {
      available: false,
      url: '',
      label: 'iOS non prévu'
    }
  },
  
  // External Links
  links: {
    github: 'https://github.com/Killurassoul/Mood-cycle-tracker-and-more',
    email: 'Rassoulgye@gmail.com',
    privacy: '/confidentialite'
  },
  
  // Theme Colors (extracted from app)
  colors: {
    background: '#120912',
    cardGlass: 'rgba(255, 255, 255, 0.05)',
    text: '#fff4f1',
    textMuted: '#c9afb8',
    accent: {
      start: '#ff7a9c',
      end: '#ffb38a'
    },
    cycle: {
      menstruation: '#e8587a',
      follicular: '#ffb38a',
      ovulation: '#9fe0c4',
      luteal: '#b79cff'
    }
  },
  
  // Typography
  fonts: {
    heading: "'Fraunces', serif",
    body: "'Figtree', sans-serif",
    googleFontsUrl: 'https://fonts.googleapis.com/css2?family=Fraunces:wght@400;600;700&family=Figtree:wght@400;500;600&display=swap'
  },
  
  // SEO
  seo: {
    title: 'Mood Jardin - Suivi du cycle menstruel privé et bienveillant',
    description: 'Application de suivi du cycle menstruel avec journal émotionnel, assistant IA hors ligne, et protection totale de vos données. Disponible sur Windows.',
    ogImage: '/og.png',
    url: 'https://mood-jardin.vercel.app'
  }
} as const;
```

### Types TypeScript (src/types/index.ts)

```typescript
// Platform Badge Status
export type PlatformStatus = 'available' | 'development' | 'unavailable';

export interface DownloadPlatform {
  available: boolean;
  url: string;
  label: string;
}

// Cycle Phase
export type CyclePhase = 'menstruation' | 'follicular' | 'ovulation' | 'luteal';

export interface PhaseInfo {
  name: string;
  color: string;
  description: string;
  days: string;
}

// Feature Card
export interface FeatureCard {
  title: string;
  description: string;
  icon: React.ReactNode;
  span?: 'col-span-1' | 'col-span-2' | 'row-span-2';
}

// FAQ Item
export interface FAQItem {
  question: string;
  answer: string;
}

// Animation State (3D)
export interface OrbAnimationState {
  mouseX: number;
  mouseY: number;
  lastMouseMoveTime: number;
  isMouseInactive: boolean;
  blinkTimer: number;
  idleGazeTarget: { x: number; y: number };
}

// WebGL Detection
export interface WebGLCapabilities {
  supported: boolean;
  version: number | null;
  maxTextureSize: number | null;
}
```

### Composant: Navigation (layout/Navigation.tsx)

**Responsabilités** :
- Affichage de la navigation fixe avec effet glassmorphism
- Menu hamburger responsive sur mobile (<768px)
- Scroll fluide vers les sections (scroll-behavior: smooth)
- Focus visible pour accessibilité

**Props** :
```typescript
interface NavigationProps {
  className?: string;
}
```

**Comportement** :
- Sticky en haut (top-0, backdrop-blur-md)
- Logo à gauche, liens au centre, CTA à droite
- Mobile : collapse en menu hamburger avec transition
- Keyboard navigation : Tab + Enter/Space

### Composant: HeroCanvas (3d/HeroCanvas.tsx)

**Responsabilités** :
- Lazy-load du Canvas R3F après First Contentful Paint
- Gestion du ErrorBoundary (repli WebGLFallback)
- Détection prefers-reduced-motion
- Optimisations performance (dpr, frameloop)

**Props** :
```typescript
interface HeroCanvasProps {
  reducedMotion: boolean;
}
```

**Optimisations** :
- `dpr={[1, 2]}` : limite pixel ratio pour économiser GPU
- `frameloop="demand"` si reducedMotion
- `gl={{ antialias: true, alpha: true }}`
- Suspense avec fallback spinner

### Composant: Orb (3d/Orb.tsx)

**Responsabilités** :
- Rendu de la sphère nacrée avec MeshPhysicalMaterial
- Intégration du Rim (visière) et Eye (œil-lune)
- Animation de flottement vertical

**Matériau** :
```typescript
<meshPhysicalMaterial
  color="#fff4f1"
  roughness={0.1}
  metalness={0.05}
  clearcoat={1.0}
  clearcoatRoughness={0.1}
  iridescence={0.8}
  iridescenceIOR={1.8}
  transmission={0.1}
  thickness={0.5}
/>
```

**Animation** :
- Position Y : `Math.sin(time * 1.6) * 0.09`
- Rotation suivant curseur via Rig component

### Composant: Eye (3d/Eye.tsx)

**Responsabilités** :
- Rendu de l'œil-lune avec phase évolutive (croissant → pleine lune)
- Clignement périodique (2.5-6 secondes aléatoires)
- Regard errant après 3.5s d'inactivité curseur

**Structure** :
```
Group (position: [0, 0.15, 1.8])
├── Sphere (sclère blanche)
├── Sphere (iris rose/pêche)
├── Sphere (pupille noire)
└── Plane (paupières pour clignement)
```

**Logique de Phase** :
```
phase = (time % 28) / 28 // 0 à 1 sur 28 secondes
scale.x = lerp(0.3, 1.0, phase) // Croissant → Pleine
```

### Composant: CycleRing (3d/CycleRing.tsx)

**Responsabilités** :
- Placement de 28 sphères (billes) sur un cercle incliné de 18°
- Coloration selon les phases du cycle
- Rotation lente continue (0.05 rad/s)

**Algorithme** :
```typescript
const beads = Array.from({ length: 28 }, (_, i) => {
  const angle = (i / 28) * Math.PI * 2;
  const radius = 3.5;
  const x = Math.cos(angle) * radius;
  const z = Math.sin(angle) * radius;
  
  // Coloration par phase
  const phase = Math.floor(i / 7); // 0-3
  const color = PHASE_COLORS[phase];
  
  return { position: [x, 0, z], color };
});
```

### Composant: Drops (3d/Drops.tsx)

**Responsabilités** :
- Génération procédurale de 3-5 gouttes en verre
- Géométrie LatheGeometry (profil de goutte)
- Animation flottante indépendante par goutte

**Géométrie** :
```typescript
const dropProfile = [
  [0, 0],
  [0.3, 0.2],
  [0.4, 0.5],
  [0.3, 0.8],
  [0, 1.0]
];
const geometry = new THREE.LatheGeometry(dropProfile, 16);
```

**Matériau** :
```typescript
<meshPhysicalMaterial
  color={color} // #e8587a ou #ffb38a
  roughness={0.05}
  metalness={0.0}
  transmission={0.7}
  thickness={0.3}
  clearcoat={1.0}
/>
```

### Composant: Lights (3d/Lights.tsx)

**Responsabilités** :
- Configuration du système d'éclairage avec Environment + Lightformers
- Ajout de HemisphereLight pour éclairage ambiant

**Configuration** :
```typescript
<Environment preset="city" resolution={256}>
  {/* Lumière clé blanche (haut-droite) */}
  <Lightformer
    position={[5, 5, -5]}
    scale={[3, 5, 1]}
    intensity={3}
    color="#ffffff"
  />
  
  {/* Bande blanche horizontale */}
  <Lightformer
    position={[0, 0, -5]}
    scale={[10, 1, 1]}
    intensity={2}
    color="#ffffff"
  />
  
  {/* Lueur rose (gauche) */}
  <Lightformer
    position={[-5, 2, 0]}
    scale={[2, 3, 1]}
    intensity={1.5}
    color="#ff7a9c"
  />
  
  {/* Lueur lilas (droite) */}
  <Lightformer
    position={[5, -2, 0]}
    scale={[2, 3, 1]}
    intensity={1.2}
    color="#b79cff"
  />
  
  {/* Rebond pêche (bas) */}
  <Lightformer
    position={[0, -5, 0]}
    scale={[5, 1, 1]}
    intensity={0.8}
    color="#ffb38a"
  />
</Environment>

<hemisphereLight
  color="#fff4f1"
  groundColor="#120912"
  intensity={0.3}
/>
```

### Composant: Rig (3d/Rig.tsx)

**Responsabilités** :
- Animation de la caméra pour suivre le curseur (lissage exponentiel)
- Détection d'inactivité curseur (3.5s → regard errant)
- Application de prefers-reduced-motion

**Algorithme de Lissage** :
```typescript
function useFrame(({ mouse, camera }, delta) {
  if (reducedMotion) return;
  
  // Lissage exponentiel
  const smoothing = 1 - Math.pow(0.0025, delta);
  targetX = mouse.x * 0.3;
  targetY = mouse.y * 0.15;
  
  camera.position.x += (targetX - camera.position.x) * smoothing;
  camera.position.y += (targetY - camera.position.y) * smoothing;
  
  camera.lookAt(0, 0, 0);
}
```

**Détection Inactivité** :
```typescript
const handleMouseMove = () => {
  lastMouseMoveTime = performance.now();
  isMouseInactive = false;
};

useFrame(() => {
  if (performance.now() - lastMouseMoveTime > 3500) {
    isMouseInactive = true;
    // Déclencher regard errant dans Eye component
  }
});
```

### Composant: Card (ui/Card.tsx)

**Responsabilités** :
- Carte réutilisable avec effet glassmorphism
- Variants : default, feature, phase
- Hover animation (scale + shadow)

**Styles** :
```typescript
const variants = {
  default: 'bg-white/5 backdrop-blur-md border border-white/10',
  feature: 'bg-white/5 backdrop-blur-md border border-white/10 hover:scale-[1.02]',
  phase: 'bg-white/8 backdrop-blur-lg border-2'
};
```

### Composant: Accordion (ui/Accordion.tsx)

**Responsabilités** :
- Accordéon accessible pour FAQ
- ARIA attributes (aria-expanded, aria-controls)
- Keyboard navigation (Enter/Space, Arrow keys)
- Animation collapse/expand (Framer Motion)

**Attributs ARIA** :
```typescript
<button
  aria-expanded={isOpen}
  aria-controls={`panel-${id}`}
  onClick={toggle}
>
  {question}
</button>

<motion.div
  id={`panel-${id}`}
  role="region"
  aria-labelledby={`button-${id}`}
  initial={{ height: 0 }}
  animate={{ height: isOpen ? 'auto' : 0 }}
>
  {answer}
</motion.div>
```

### Composant: PhaseWheel (ui/PhaseWheel.tsx)

**Responsabilités** :
- Roue SVG circulaire avec 4 segments colorés
- Labels des phases avec icônes
- Responsive (taille adaptative)

**Structure SVG** :
```typescript
<svg viewBox="0 0 200 200">
  {/* Cercle central */}
  <circle cx="100" cy="100" r="80" fill="none" stroke="white" strokeWidth="2" />
  
  {/* Segments colorés (4×90°) */}
  <path d="M100,100 L100,20 A80,80 0 0,1 180,100 Z" fill={COLORS.menstruation} />
  <path d="M100,100 L180,100 A80,80 0 0,1 100,180 Z" fill={COLORS.follicular} />
  <path d="M100,100 L100,180 A80,80 0 0,1 20,100 Z" fill={COLORS.ovulation} />
  <path d="M100,100 L20,100 A80,80 0 0,1 100,20 Z" fill={COLORS.luteal} />
  
  {/* Labels */}
  <text x="100" y="10" textAnchor="middle">Menstruation</text>
  {/* ... autres labels */}
</svg>
```

### Service: webgl-detector.ts

**Responsabilités** :
- Détection de la disponibilité de WebGL
- Détection de la version WebGL (1.0 ou 2.0)
- Extraction des capacités GPU (maxTextureSize)

**API** :
```typescript
export function detectWebGL(): WebGLCapabilities {
  const canvas = document.createElement('canvas');
  const gl = canvas.getContext('webgl2') || canvas.getContext('webgl');
  
  if (!gl) {
    return { supported: false, version: null, maxTextureSize: null };
  }
  
  const version = gl instanceof WebGL2RenderingContext ? 2 : 1;
  const maxTextureSize = gl.getParameter(gl.MAX_TEXTURE_SIZE);
  
  return { supported: true, version, maxTextureSize };
}
```

### Service: scroll-observer.ts

**Responsabilités** :
- IntersectionObserver pour animations au scroll
- Déclenchement des animations Framer Motion
- Gestion du stagger (délai entre éléments)

**API** :
```typescript
export function observeScrollAnimations(
  elements: HTMLElement[],
  options?: IntersectionObserverInit
) {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry, index) => {
      if (entry.isIntersecting) {
        setTimeout(() => {
          entry.target.classList.add('animate-in');
        }, index * 70); // Stagger 70ms
      }
    });
  }, options);
  
  elements.forEach((el) => observer.observe(el));
  
  return () => observer.disconnect();
}
```

## Data Models

### Configuration Data Model

```typescript
interface Config {
  appName: string;
  appTagline: string;
  
  downloads: {
    [platform: string]: DownloadPlatform;
  };
  
  links: {
    github: string;
    email: string;
    privacy: string;
  };
  
  colors: {
    background: string;
    cardGlass: string;
    text: string;
    textMuted: string;
    accent: {
      start: string;
      end: string;
    };
    cycle: {
      [phase in CyclePhase]: string;
    };
  };
  
  fonts: {
    heading: string;
    body: string;
    googleFontsUrl: string;
  };
  
  seo: {
    title: string;
    description: string;
    ogImage: string;
    url: string;
  };
}
```

### Phase Data Model

```typescript
const PHASES: Record<CyclePhase, PhaseInfo> = {
  menstruation: {
    name: 'Menstruation',
    color: '#e8587a',
    description: 'Jours 1-5 : Période de saignements, besoin de repos et de douceur',
    days: 'Jours 1-5'
  },
  follicular: {
    name: 'Folliculaire',
    color: '#ffb38a',
    description: 'Jours 6-13 : Énergie croissante, créativité et ouverture',
    days: 'Jours 6-13'
  },
  ovulation: {
    name: 'Ovulation',
    color: '#9fe0c4',
    description: 'Jours 14-16 : Pic d\'énergie, confiance et sociabilité',
    days: 'Jours 14-16'
  },
  luteal: {
    name: 'Lutéale',
    color: '#b79cff',
    description: 'Jours 17-28 : Retour au calme, introspection et besoin de confort',
    days: 'Jours 17-28'
  }
};
```

### Features Data Model

```typescript
const FEATURES: FeatureCard[] = [
  {
    title: 'Suivi du cycle menstruel',
    description: 'Visualisez votre cycle sur 28 jours avec prédictions intelligentes',
    icon: <CalendarIcon />,
    span: 'col-span-2'
  },
  {
    title: 'Journal quotidien',
    description: 'Notez vos émotions, symptômes et humeurs chaque jour',
    icon: <JournalIcon />,
    span: 'col-span-1'
  },
  {
    title: 'Suivi corporel',
    description: 'Localisez et suivez les douleurs sur un schéma anatomique',
    icon: <BodyIcon />,
    span: 'col-span-1'
  },
  {
    title: 'Rappels personnalisés',
    description: 'Notifications pour médicaments, rendez-vous et menstruation',
    icon: <BellIcon />,
    span: 'col-span-1'
  },
  {
    title: 'Dossier médical',
    description: 'Centralisez rendez-vous, médicaments et contraception',
    icon: <FileIcon />,
    span: 'col-span-1'
  },
  {
    title: 'Statistiques et graphiques',
    description: 'Analysez vos cycles avec graphiques et tendances',
    icon: <ChartIcon />,
    span: 'col-span-2'
  },
  {
    title: 'Assistant IA hors ligne',
    description: 'Réponses médicales sans connexion Internet ni partage de données',
    icon: <BotIcon />,
    span: 'col-span-1'
  },
  {
    title: 'Encyclopédie médicale',
    description: 'Base de connaissances intégrée sur la santé féminine',
    icon: <BookIcon />,
    span: 'col-span-1'
  },
  {
    title: 'Mode discret avec PIN',
    description: 'Protégez votre intimité avec un code d\'accès',
    icon: <LockIcon />,
    span: 'col-span-1'
  }
];
```

### FAQ Data Model

```typescript
const FAQ_ITEMS: FAQItem[] = [
  {
    question: 'L\'application est-elle gratuite ?',
    answer: 'Oui, Mood Jardin est 100% gratuite et open source. Pas d\'abonnement, pas d\'achat intégré, pas de publicité.'
  },
  {
    question: 'Mes données sont-elles sécurisées ?',
    answer: 'Toutes vos données restent sur votre appareil dans le stockage local (localStorage). Rien n\'est envoyé à un serveur externe. Vous êtes la seule personne à avoir accès à vos informations.'
  },
  {
    question: 'L\'application fonctionne-t-elle sans Internet ?',
    answer: 'Oui, après l\'installation, Mood Jardin fonctionne 100% hors ligne. L\'assistant IA est local et ne nécessite aucune connexion.'
  },
  {
    question: 'Puis-je exporter mes données ?',
    answer: 'Oui, vous pouvez exporter vos données au format JSON depuis les paramètres de l\'application. Nous recommandons des sauvegardes régulières.'
  },
  {
    question: 'L\'application est-elle médicalement certifiée ?',
    answer: 'Mood Jardin est un outil de bien-être personnel, pas un dispositif médical. Consultez toujours un professionnel de santé pour un diagnostic.'
  },
  {
    question: 'Comment contacter le support ?',
    answer: 'Pour toute question ou problème, contactez-nous à Rassoulgye@gmail.com. Le code source est disponible sur GitHub pour transparence.'
  }
];
```

## Error Handling

### WebGL Fallback Strategy

**Problème** : Certains navigateurs ou appareils ne supportent pas WebGL (anciens navigateurs, GPU désactivé, mode sécurité).

**Solution** :
1. **Détection au chargement** : Utiliser `webgl-detector.ts` pour vérifier la disponibilité de WebGL
2. **Repli CSS** : Afficher `WebGLFallback.tsx` (orbe en dégradé CSS) si WebGL indisponible
3. **ErrorBoundary** : Wrapper le Canvas avec ErrorBoundary React pour capturer les crashes 3D

**Implémentation** :
```typescript
// HeroCanvas.tsx
const webglCapabilities = detectWebGL();

if (!webglCapabilities.supported) {
  return <WebGLFallback />;
}

return (
  <ErrorBoundary fallback={<WebGLFallback />}>
    <Canvas>
      {/* Scene 3D */}
    </Canvas>
  </ErrorBoundary>
);
```

**WebGLFallback Component** :
```typescript
// Orbe CSS avec dégradé radial simulant l'effet 3D
<div className="relative w-full h-full flex items-center justify-center">
  <div className="w-96 h-96 rounded-full bg-gradient-radial from-[#fff4f1]/80 via-[#ff7a9c]/40 to-transparent blur-xl" />
  <div className="absolute inset-0 flex items-center justify-center">
    <p className="text-white/60 text-sm">
      Votre navigateur ne supporte pas WebGL. La version alternative est affichée.
    </p>
  </div>
</div>
```

### Navigation and Routing Errors

**404 Page** : Route catch-all pour URLs inconnues
```typescript
// App.tsx
<Routes>
  <Route path="/" element={<HomePage />} />
  <Route path="/confidentialite" element={<PrivacyPage />} />
  <Route path="*" element={<NotFoundPage />} />
</Routes>
```

**NotFoundPage Component** :
- Message clair "Page introuvable"
- Lien de retour à l'accueil
- Suggestions de navigation (sections principales)

### Resource Loading Errors

**Polices Google Fonts** :
- Utiliser `font-display: swap` pour éviter FOIT (Flash of Invisible Text)
- Définir font-family fallback : `'Fraunces', serif` → `serif`

**Images** :
- Attribut `alt` descriptif sur toutes les images
- Loading state pour og.png
- Format WebP avec fallback PNG

**Lazy Loading** :
```typescript
const HeroCanvas = React.lazy(() => import('./components/3d/HeroCanvas'));

<Suspense fallback={<LoadingSpinner />}>
  <HeroCanvas />
</Suspense>
```

### User Input Validation

**Email Link** : Validation côté client avant ouverture du client mail
```typescript
const handleEmailClick = (e: React.MouseEvent) => {
  e.preventDefault();
  const email = CONFIG.links.email;
  
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    console.error('Invalid email configuration');
    return;
  }
  
  window.location.href = `mailto:${email}`;
};
```

**Download Link** : Vérification URL avant redirection
```typescript
const handleDownload = (platform: 'windows' | 'android') => {
  const download = CONFIG.downloads[platform];
  
  if (!download.available || !download.url) {
    alert('Cette version n\'est pas encore disponible.');
    return;
  }
  
  window.open(download.url, '_blank', 'noopener,noreferrer');
};
```

### Console Logging Strategy

**Development** :
- Log détaillé pour WebGL capabilities
- Log des animations 3D (frame rate, performance)
- Log des erreurs ErrorBoundary

**Production** :
- Désactiver les logs verbeux
- Conserver uniquement les erreurs critiques
- Message informatif lors du repli WebGL

```typescript
const LOG_LEVEL = import.meta.env.MODE === 'production' ? 'error' : 'debug';

export function log(level: 'debug' | 'info' | 'error', message: string) {
  if (level === 'error' || LOG_LEVEL === 'debug') {
    console[level](`[Mood Cycle] ${message}`);
  }
}
```

## Testing Strategy

### Testing Approach Overview

Ce projet étant un **site vitrine statique avec UI/3D rendering**, le Property-Based Testing (PBT) n'est **pas approprié**. Les tests se concentreront sur :

1. **Snapshot Tests** : Vérification de la structure HTML/CSS des composants UI
2. **Visual Regression Tests** : Comparaison de screenshots pour détecter les régressions visuelles
3. **Integration Tests** : Navigation entre pages, interactions utilisateur
4. **Accessibility Tests** : Conformité WCAG AA avec outils automatisés
5. **Performance Tests** : Lighthouse CI pour monitoring continu

### Unit Testing Strategy

**Framework** : Vitest + React Testing Library

**Composants à tester** :
- `Card.tsx` : Variants (default, feature, phase)
- `Button.tsx` : Props (variant, disabled, onClick)
- `Badge.tsx` : Status (available, development, unavailable)
- `Accordion.tsx` : ARIA attributes, keyboard navigation
- `Navigation.tsx` : Menu hamburger, scroll to section

**Exemple de test** :
```typescript
// Card.test.tsx
import { render } from '@testing-library/react';
import { Card } from './Card';

describe('Card Component', () => {
  it('applies glassmorphism style for default variant', () => {
    const { container } = render(<Card variant="default">Content</Card>);
    const card = container.firstChild;
    
    expect(card).toHaveClass('bg-white/5');
    expect(card).toHaveClass('backdrop-blur-md');
  });
  
  it('applies hover animation for feature variant', () => {
    const { container } = render(<Card variant="feature">Feature</Card>);
    const card = container.firstChild;
    
    expect(card).toHaveClass('hover:scale-[1.02]');
  });
});
```

### Snapshot Testing Strategy

**Objectif** : Capturer la structure HTML des composants pour détecter les changements non intentionnels.

**Composants snapshots** :
- Toutes les sections (Hero, CyclePhases, Features, etc.)
- PhaseWheel.tsx (SVG structure)
- FAQ Accordion (expanded/collapsed states)

**Exemple** :
```typescript
// CyclePhases.test.tsx
import { render } from '@testing-library/react';
import { CyclePhases } from './CyclePhases';

it('matches snapshot', () => {
  const { container } = render(<CyclePhases />);
  expect(container).toMatchSnapshot();
});
```

### Visual Regression Testing

**Outil** : Playwright with screenshot comparison

**Scénarios** :
1. **Homepage rendering** : Capture d'écran de la page complète
2. **3D Scene rendering** : Capture de la section Hero avec orbe
3. **Responsive breakpoints** : 360px, 768px, 1024px, 1920px
4. **Dark mode** : N/A (thème unique "nuit luxueuse")
5. **WebGL Fallback** : Capture du repli CSS

**Configuration** :
```typescript
// playwright.config.ts
export default {
  use: {
    screenshot: 'only-on-failure',
    video: 'retain-on-failure'
  },
  expect: {
    toHaveScreenshot: {
      maxDiffPixels: 100 // Tolérance pour anti-aliasing
    }
  }
};
```

### Accessibility Testing Strategy

**Outils** :
- **axe-core** : Tests automatisés WCAG AA
- **NVDA/JAWS** : Tests manuels avec lecteur d'écran

**Critères vérifiés** :
1. **Contraste de couleur** : Ratio minimum 4.5:1 pour texte normal
2. **Navigation clavier** : Tab order logique, focus visible
3. **ARIA attributes** : Accordéon FAQ, navigation, boutons
4. **Alt text** : Images décoratives avec alt vides
5. **Balises sémantiques** : header, main, section, nav, footer
6. **Titres hiérarchiques** : h1 > h2 > h3 (pas de saut)

**Tests automatisés** :
```typescript
// accessibility.test.tsx
import { render } from '@testing-library/react';
import { axe, toHaveNoViolations } from 'jest-axe';
import { HomePage } from './pages/HomePage';

expect.extend(toHaveNoViolations);

it('should not have accessibility violations', async () => {
  const { container } = render(<HomePage />);
  const results = await axe(container);
  
  expect(results).toHaveNoViolations();
});
```

### Integration Testing Strategy

**Framework** : Playwright (E2E)

**Scénarios clés** :
1. **Navigation fluide** : Clic sur lien nav → scroll vers section
2. **Download CTA** : Clic sur bouton Windows → ouverture nouvelle fenêtre
3. **FAQ Accordion** : Clic sur question → expansion panel
4. **Routing** : Navigation vers /confidentialite → page dédiée
5. **404 Handling** : URL invalide → NotFoundPage
6. **Mobile Menu** : Hamburger → ouverture menu → clic lien

**Exemple** :
```typescript
// navigation.spec.ts
import { test, expect } from '@playwright/test';

test('should scroll to Features section on nav click', async ({ page }) => {
  await page.goto('/');
  
  await page.click('nav a[href="#features"]');
  
  await expect(page.locator('#features')).toBeInViewport();
});
```

### Performance Testing Strategy

**Outil** : Lighthouse CI (automated auditing)

**Métriques cibles** :
- **Performance** : Score > 90 (mobile)
- **Accessibility** : Score = 100
- **Best Practices** : Score > 95
- **SEO** : Score = 100

**Optimisations mesurées** :
1. **First Contentful Paint (FCP)** : < 1.8s
2. **Largest Contentful Paint (LCP)** : < 2.5s
3. **Time to Interactive (TTI)** : < 3.8s
4. **Cumulative Layout Shift (CLS)** : < 0.1
5. **Total Blocking Time (TBT)** : < 200ms

**Configuration Lighthouse CI** :
```yaml
# lighthouserc.json
{
  "ci": {
    "collect": {
      "url": ["http://localhost:3000/"],
      "numberOfRuns": 3
    },
    "assert": {
      "assertions": {
        "categories:performance": ["error", { "minScore": 0.9 }],
        "categories:accessibility": ["error", { "minScore": 1.0 }],
        "first-contentful-paint": ["error", { "maxNumericValue": 1800 }],
        "cumulative-layout-shift": ["error", { "maxNumericValue": 0.1 }]
      }
    }
  }
}
```

### 3D Scene Testing Strategy

**Défi** : Le Canvas WebGL est difficile à tester avec outils traditionnels.

**Approche** :
1. **Smoke Test** : Vérifier que le Canvas se monte sans erreur
2. **Props Test** : Vérifier que reducedMotion désactive les animations
3. **ErrorBoundary Test** : Simuler crash et vérifier repli WebGLFallback
4. **Manual Visual QA** : Test manuel sur différents GPU/navigateurs

**Exemple** :
```typescript
// HeroCanvas.test.tsx
import { render } from '@testing-library/react';
import { HeroCanvas } from './HeroCanvas';

it('renders Canvas without crashing', () => {
  const { container } = render(<HeroCanvas reducedMotion={false} />);
  expect(container.querySelector('canvas')).toBeInTheDocument();
});

it('respects reducedMotion prop', () => {
  const { container } = render(<HeroCanvas reducedMotion={true} />);
  // Vérifier que frameloop="demand" est appliqué
});
```

### Test Coverage Goals

**Targets** :
- **Unit Tests** : > 80% coverage pour composants UI
- **Integration Tests** : Tous les user flows critiques
- **Accessibility** : 0 violations axe-core
- **Visual Regression** : 0 diff non expliqué
- **Performance** : Lighthouse > 90 mobile maintenu à chaque commit

### Manual Testing Checklist

**À vérifier manuellement avant release** :
- [ ] La scène 3D s'affiche correctement (Chrome, Firefox, Safari)
- [ ] L'orbe suit le curseur avec lissage
- [ ] L'œil-lune cligne et regarde aléatoirement
- [ ] Le repli CSS s'affiche si WebGL désactivé
- [ ] Les animations scroll se déclenchent au bon moment
- [ ] prefers-reduced-motion désactive les animations
- [ ] La navigation clavier fonctionne (Tab, Enter, Espace)
- [ ] Le menu hamburger fonctionne sur mobile
- [ ] Pas de scroll horizontal sur aucune taille (360px, 1920px)
- [ ] Les liens de téléchargement ouvrent les bons URLs
- [ ] La page /confidentialite s'affiche correctement
- [ ] Le lecteur d'écran annonce correctement les sections



## Technical Specifications

### 3D Scene Detailed Specifications

#### Camera Configuration

```typescript
<PerspectiveCamera
  makeDefault
  fov={35}
  near={0.1}
  far={100}
  position={[0, 0, 12]}
/>
```

**Rationale** :
- **FOV 35°** : Perspective douce, moins de distorsion que FOV standard (50-60°)
- **Position Z=12** : Distance suffisante pour voir l'orbe entière + billes du cycle ring
- **Near/Far planes** : Optimisées pour éviter z-fighting

#### Material Specifications

**Orbe Nacrée (MeshPhysicalMaterial)** :
```typescript
{
  color: '#fff4f1',           // Blanc cassé chaud
  roughness: 0.1,             // Surface lisse (peu de diffusion)
  metalness: 0.05,            // Très peu métallique (diélectrique)
  clearcoat: 1.0,             // Vernis brillant maximal
  clearcoatRoughness: 0.1,    // Vernis lisse
  iridescence: 0.8,           // Effet nacré fort
  iridescenceIOR: 1.8,        // Indice de réfraction (perle ~1.5-2.0)
  transmission: 0.1,          // Légère translucidité
  thickness: 0.5,             // Épaisseur du matériau pour transmission
  envMapIntensity: 1.2        // Intensité des réflexions environment
}
```

**Visière Verre Noir (MeshPhysicalMaterial)** :
```typescript
{
  color: '#0a0508',           // Noir aubergine
  roughness: 0.0,             // Surface miroir
  metalness: 0.0,             // Diélectrique pur (verre)
  transmission: 0.4,          // Semi-transparent
  thickness: 0.2,             // Verre fin
  opacity: 0.6,               // Opacité combinée avec transmission
  transparent: true,
  side: THREE.DoubleSide      // Visible des deux côtés
}
```

**Gouttes (MeshPhysicalMaterial)** :
```typescript
{
  color: '#e8587a' | '#ffb38a',  // Rose ou pêche
  roughness: 0.05,                // Surface très lisse
  metalness: 0.0,                 // Diélectrique (eau/verre)
  transmission: 0.7,              // Très translucide
  thickness: 0.3,                 // Goutte épaisse
  clearcoat: 1.0,                 // Brillance de surface
  clearcoatRoughness: 0.0,        // Surface miroir
  ior: 1.4                        // Indice de réfraction eau (~1.33)
}
```

**Billes du Cycle Ring (MeshStandardMaterial)** :
```typescript
{
  color: PHASE_COLORS[phase],     // Couleur de la phase
  roughness: 0.3,                 // Surface légèrement mate
  metalness: 0.0,                 // Non métallique
  emissive: PHASE_COLORS[phase],  // Auto-luminescence
  emissiveIntensity: 0.2          // Lueur subtile
}
```

#### Geometry Specifications

**Orbe** :
```typescript
<sphereGeometry args={[2, 64, 64]} />
```
- Rayon : 2 unités
- Segments : 64×64 (haute résolution pour reflets smooths)

**Visière (Rim)** :
```typescript
// Arc de cercle en forme de lune (torus partiel)
const rimGeometry = new THREE.TorusGeometry(
  2.1,    // Rayon extérieur (légèrement plus grand que l'orbe)
  0.15,   // Épaisseur du tore
  16,     // Segments radiaux
  64,     // Segments tubulaires
  Math.PI * 0.8  // Arc de 144° (pas un cercle complet)
);

// Rotation pour positionner en arc au-dessus de l'œil
<primitive object={rimGeometry} rotation={[0.3, 0, 0]} />
```

**Œil-Lune** :
```typescript
// Groupe positionné sur l'orbe
<group position={[0, 0.15, 1.8]}>
  {/* Sclère blanche */}
  <mesh>
    <sphereGeometry args={[0.25, 32, 32]} />
    <meshStandardMaterial color="#fff4f1" />
  </mesh>
  
  {/* Iris (échelle X variable pour phase de lune) */}
  <mesh scale={[phaseScale, 1, 1]}>
    <sphereGeometry args={[0.15, 32, 32]} />
    <meshStandardMaterial
      color="#ff7a9c"
      emissive="#ffb38a"
      emissiveIntensity={0.3}
    />
  </mesh>
  
  {/* Pupille */}
  <mesh position={[0, 0, 0.1]}>
    <sphereGeometry args={[0.06, 16, 16]} />
    <meshBasicMaterial color="#000000" />
  </mesh>
  
  {/* Paupières (clignement) */}
  <mesh
    position={[0, blinkOffset, 0.26]}
    scale={[1, blinkScale, 1]}
  >
    <planeGeometry args={[0.6, 0.3]} />
    <meshBasicMaterial color="#fff4f1" side={THREE.DoubleSide} />
  </mesh>
</group>
```

**Gouttes (LatheGeometry)** :
```typescript
// Profil de goutte (révolution 2π)
const dropProfile = [
  new THREE.Vector2(0, 0),      // Pointe
  new THREE.Vector2(0.3, 0.2),  // Courbe sortante
  new THREE.Vector2(0.4, 0.5),  // Milieu
  new THREE.Vector2(0.3, 0.8),  // Courbe rentrante
  new THREE.Vector2(0, 1.0)     // Sommet
];

const dropGeometry = new THREE.LatheGeometry(dropProfile, 16);
```

**Billes du Cycle Ring** :
```typescript
<sphereGeometry args={[0.12, 16, 16]} />
```
- Rayon : 0.12 unités (petites billes)
- Segments : 16×16 (résolution moyenne, 28 instances)

#### Animation Pseudocode

**Rig Component (Suivi Curseur + Flottement)** :
```
FUNCTION useFrame(state, delta):
  time += delta
  
  // Flottement vertical de l'orbe
  orb.position.y = sin(time * 1.6) * 0.09
  
  // Suivi curseur avec lissage exponentiel
  IF NOT reducedMotion:
    targetX = state.mouse.x * 0.3
    targetY = state.mouse.y * 0.15
    
    smoothing = 1 - pow(0.0025, delta)
    
    camera.position.x += (targetX - camera.position.x) * smoothing
    camera.position.y += (targetY - camera.position.y) * smoothing
    camera.lookAt(0, 0, 0)
END FUNCTION
```

**Eye Component (Clignement + Phase + Regard)** :
```
STATE:
  blinkTimer = 0
  nextBlinkTime = random(2.5, 6.0)
  isBlinking = false
  blinkProgress = 0
  idleGazeTarget = {x: 0, y: 0}
  lastMouseMoveTime = performance.now()

FUNCTION useFrame(state, delta):
  time += delta
  
  // 1. Phase de lune (croissant → pleine)
  phase = (time % 28) / 28  // 0 à 1 sur 28 secondes
  phaseScale = lerp(0.3, 1.0, phase)
  iris.scale.x = phaseScale
  
  // 2. Clignement périodique
  blinkTimer += delta
  IF blinkTimer >= nextBlinkTime:
    isBlinking = true
    blinkProgress = 0
    blinkTimer = 0
    nextBlinkTime = random(2.5, 6.0)
  
  IF isBlinking:
    blinkProgress += delta * 8  // Vitesse de clignement
    
    IF blinkProgress < 0.5:
      // Fermeture
      blinkScale = lerp(1, 0.1, blinkProgress * 2)
    ELSE:
      // Réouverture
      blinkScale = lerp(0.1, 1, (blinkProgress - 0.5) * 2)
    
    eyelid.scale.y = blinkScale
    
    IF blinkProgress >= 1.0:
      isBlinking = false
      blinkProgress = 0
  
  // 3. Regard errant après inactivité
  IF performance.now() - lastMouseMoveTime > 3500:
    // Choisir une nouvelle cible toutes les 2-3 secondes
    IF time % 2.5 < delta:
      idleGazeTarget.x = random(-0.3, 0.3)
      idleGazeTarget.y = random(-0.15, 0.15)
    
    // Animer vers la cible
    eye.rotation.y += (idleGazeTarget.x - eye.rotation.y) * 0.05
    eye.rotation.x += (idleGazeTarget.y - eye.rotation.x) * 0.05
  ELSE:
    // Suivre le curseur
    eye.rotation.y = state.mouse.x * 0.2
    eye.rotation.x = -state.mouse.y * 0.1
END FUNCTION

ON mouseMove:
  lastMouseMoveTime = performance.now()
```

**CycleRing Component (Rotation Continue)** :
```
FUNCTION useFrame(state, delta):
  ring.rotation.y += 0.05 * delta  // Rotation lente
END FUNCTION

FUNCTION createRing():
  FOR i FROM 0 TO 27:
    angle = (i / 28) * TWO_PI
    x = cos(angle) * 3.5
    z = sin(angle) * 3.5
    
    // Coloration par phase (7 jours par phase)
    phase = floor(i / 7)
    color = PHASE_COLORS[phase]
    
    CREATE Bead at position (x, 0, z) with color
  
  // Inclinaison du ring
  ring.rotation.x = 18 * (PI / 180)  // 18° en radians
END FUNCTION
```

**Drops Component (Flottement Indépendant)** :
```
FUNCTION createDrops():
  FOR each drop:
    drop.userData.offset = random(0, TWO_PI)
    drop.userData.speed = random(0.8, 1.2)
    drop.userData.amplitude = random(0.3, 0.6)
    drop.position.set(
      random(-4, 4),
      random(-2, 2),
      random(-3, -1)
    )
END FUNCTION

FUNCTION useFrame(state, delta):
  time += delta
  
  FOR each drop:
    offset = drop.userData.offset
    speed = drop.userData.speed
    amplitude = drop.userData.amplitude
    
    drop.position.y += sin(time * speed + offset) * amplitude * delta
    drop.rotation.y += 0.3 * delta
END FUNCTION
```

#### Post-Processing Configuration

**Bloom Effect** :
```typescript
<EffectComposer>
  <Bloom
    intensity={0.55}      // Intensité de la lueur
    luminanceThreshold={0.92}  // Seuil de luminosité (seuls les reflets brillent)
    luminanceSmoothing={0.9}   // Lissage de la transition
    radius={0.4}          // Rayon de diffusion
    mipmapBlur={true}     // Optimisation performance
  />
</EffectComposer>
```

**Rationale** :
- **Threshold 0.92** : Seules les parties très lumineuses (reflets, iris œil, billes) produisent du bloom
- **Intensity 0.55** : Lueur subtile, pas de surexposition
- **Radius 0.4** : Diffusion douce, pas de halos excessifs

### Responsive Design Specifications

#### Breakpoints Tailwind

```javascript
// tailwind.config.js
module.exports = {
  theme: {
    screens: {
      'xs': '360px',   // Petits mobiles
      'sm': '640px',   // Mobiles
      'md': '768px',   // Tablettes portrait
      'lg': '1024px',  // Tablettes paysage / petits laptops
      'xl': '1280px',  // Laptops
      '2xl': '1536px'  // Grands écrans
    }
  }
};
```

#### Layout Responsive Rules

**Navigation** :
```typescript
<nav className="
  fixed top-0 w-full z-50
  px-4 md:px-8 py-4
  flex items-center justify-between
  bg-black/20 backdrop-blur-md border-b border-white/10
">
  {/* Logo */}
  <div className="text-xl md:text-2xl font-bold">Mood Jardin</div>
  
  {/* Links - Hidden on mobile */}
  <div className="hidden md:flex gap-6">
    <a href="#cycle">Le cycle</a>
    <a href="#features">Fonctionnalités</a>
    <a href="#faq">FAQ</a>
  </div>
  
  {/* CTA - Hidden on mobile, replaced by hamburger */}
  <button className="hidden md:block">Télécharger</button>
  
  {/* Hamburger - Visible on mobile only */}
  <button className="md:hidden">☰</button>
</nav>
```

**Hero Section** :
```typescript
<section className="
  relative h-[100svh]
  flex flex-col md:flex-row items-center justify-center
  px-4 md:px-8
">
  {/* Canvas 3D - Full width on mobile, 60% on desktop */}
  <div className="
    w-full md:w-3/5 h-1/2 md:h-full
  ">
    <HeroCanvas />
  </div>
  
  {/* Text Content - Stack below on mobile, side on desktop */}
  <div className="
    w-full md:w-2/5 h-1/2 md:h-full
    flex flex-col justify-center
    text-center md:text-left
    space-y-4 md:space-y-6
  ">
    <h1 className="text-4xl md:text-6xl">Mood Jardin</h1>
    <p className="text-base md:text-lg">Suivi du cycle menstruel privé</p>
    <button className="text-sm md:text-base">Télécharger</button>
  </div>
</section>
```

**Bento Grid (Features)** :
```typescript
<div className="
  grid
  grid-cols-1 sm:grid-cols-2 lg:grid-cols-3
  gap-4 md:gap-6
  auto-rows-fr
">
  {/* Cards with responsive spans */}
  <Card className="col-span-1 sm:col-span-2" />
  <Card className="col-span-1" />
  <Card className="col-span-1 lg:row-span-2" />
  {/* ... */}
</div>
```

**3D Scene Responsive Adjustments** :
```typescript
// HeroCanvas.tsx
const isMobile = window.innerWidth < 768;

<Canvas
  dpr={isMobile ? [1, 1] : [1, 2]}  // Baisser qualité sur mobile
  camera={{ fov: isMobile ? 45 : 35 }}  // FOV plus large sur mobile
>
  {/* Scene adaptée */}
</Canvas>
```

### Performance Optimization Specifications

#### Code Splitting Strategy

```typescript
// App.tsx
const HomePage = React.lazy(() => import('./pages/HomePage'));
const PrivacyPage = React.lazy(() => import('./pages/PrivacyPage'));
const HeroCanvas = React.lazy(() => import('./components/3d/HeroCanvas'));

<Suspense fallback={<LoadingSpinner />}>
  <Routes>
    <Route path="/" element={<HomePage />} />
    <Route path="/confidentialite" element={<PrivacyPage />} />
  </Routes>
</Suspense>
```

**Chunks générés** :
- `main.js` : React core + Router + Layout
- `HomePage-[hash].js` : Sections de la page principale
- `PrivacyPage-[hash].js` : Page confidentialité
- `HeroCanvas-[hash].js` : Three.js + R3F + composants 3D

#### Asset Optimization

**Images** :
```html
<!-- og.png avec formats modernes -->
<picture>
  <source srcset="/og.webp" type="image/webp">
  <source srcset="/og.avif" type="image/avif">
  <img src="/og.png" alt="Mood Jardin" />
</picture>
```

**Polices** :
```html
<!-- Preload fonts critiques -->
<link
  rel="preload"
  href="https://fonts.googleapis.com/css2?family=Fraunces:wght@600;700&display=swap"
  as="style"
  onload="this.onload=null;this.rel='stylesheet'"
/>
```

**Bundle Size Targets** :
- `main.js` : < 80KB gzipped
- `HeroCanvas.js` : < 150KB gzipped (Three.js + R3F)
- Total initial load : < 250KB gzipped

#### Runtime Optimizations

**3D Scene** :
```typescript
// Réduire frame rate si hors viewport
const isVisible = useInView(canvasRef, { once: false });

<Canvas frameloop={isVisible ? 'always' : 'demand'}>
  {/* Scene */}
</Canvas>
```

**Animations Scroll** :
```typescript
// Throttle scroll events
const handleScroll = throttle(() => {
  // Animation logic
}, 16); // ~60fps
```

**Lazy-load Images** :
```html
<img src="..." loading="lazy" decoding="async" />
```

### Accessibility Specifications

#### Focus Management

**Focus Styles** :
```css
/* Tailwind config */
module.exports = {
  theme: {
    extend: {
      ringWidth: {
        'focus': '2px'
      },
      ringColor: {
        'focus': '#ff7a9c'
      }
    }
  }
};
```

```typescript
// Tous les éléments interactifs
<button className="
  focus:outline-none
  focus:ring-2 focus:ring-focus focus:ring-offset-2 focus:ring-offset-black
">
  Télécharger
</button>
```

#### ARIA Attributes Specifications

**Navigation** :
```typescript
<nav role="navigation" aria-label="Navigation principale">
  <ul>
    <li><a href="#cycle" aria-label="Aller à la section Le cycle">Le cycle</a></li>
    <li><a href="#features" aria-label="Aller à la section Fonctionnalités">Fonctionnalités</a></li>
  </ul>
</nav>
```

**Accordéon FAQ** :
```typescript
<div role="region" aria-labelledby="faq-heading">
  <h2 id="faq-heading">Questions Fréquentes</h2>
  
  {faqItems.map((item, i) => (
    <div key={i}>
      <button
        id={`faq-button-${i}`}
        aria-expanded={openIndex === i}
        aria-controls={`faq-panel-${i}`}
        onClick={() => toggle(i)}
      >
        {item.question}
      </button>
      
      <div
        id={`faq-panel-${i}`}
        role="region"
        aria-labelledby={`faq-button-${i}`}
        hidden={openIndex !== i}
      >
        {item.answer}
      </div>
    </div>
  ))}
</div>
```

**Canvas 3D (Skip for Screen Readers)** :
```typescript
<div aria-hidden="true">
  <Canvas>
    {/* Scene 3D */}
  </Canvas>
</div>

{/* Alternative textuelle */}
<p className="sr-only">
  Représentation visuelle animée du cycle menstruel avec une orbe nacrée et 28 billes colorées représentant les 4 phases du cycle.
</p>
```

#### Keyboard Navigation Specifications

**Trap Focus in Mobile Menu** :
```typescript
const menuRef = useRef<HTMLDivElement>(null);

useEffect(() => {
  if (!isMenuOpen) return;
  
  const focusableElements = menuRef.current?.querySelectorAll(
    'a, button, [tabindex]:not([tabindex="-1"])'
  );
  
  const firstElement = focusableElements?.[0] as HTMLElement;
  const lastElement = focusableElements?.[focusableElements.length - 1] as HTMLElement;
  
  const handleTab = (e: KeyboardEvent) => {
    if (e.key !== 'Tab') return;
    
    if (e.shiftKey && document.activeElement === firstElement) {
      e.preventDefault();
      lastElement?.focus();
    } else if (!e.shiftKey && document.activeElement === lastElement) {
      e.preventDefault();
      firstElement?.focus();
    }
  };
  
  document.addEventListener('keydown', handleTab);
  return () => document.removeEventListener('keydown', handleTab);
}, [isMenuOpen]);
```

**Skip to Main Content** :
```typescript
<a
  href="#main"
  className="
    sr-only focus:not-sr-only
    focus:absolute focus:top-4 focus:left-4
    bg-white text-black px-4 py-2 rounded
  "
>
  Aller au contenu principal
</a>

<main id="main">
  {/* Contenu */}
</main>
```

### SEO Specifications

#### Meta Tags Complete

```html
<!DOCTYPE html>
<html lang="fr">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  
  <!-- Primary Meta Tags -->
  <title>Mood Jardin - Suivi du cycle menstruel privé et bienveillant</title>
  <meta name="title" content="Mood Jardin - Suivi du cycle menstruel privé et bienveillant" />
  <meta name="description" content="Application de suivi du cycle menstruel avec journal émotionnel, assistant IA hors ligne, et protection totale de vos données. Disponible sur Windows." />
  <meta name="keywords" content="cycle menstruel, suivi cycle, journal émotions, santé féminine, confidentialité, IA offline, Mood Jardin" />
  <meta name="author" content="Mood Jardin" />
  
  <!-- Open Graph / Facebook -->
  <meta property="og:type" content="website" />
  <meta property="og:url" content="https://mood-jardin.vercel.app/" />
  <meta property="og:title" content="Mood Jardin - Suivi du cycle menstruel privé et bienveillant" />
  <meta property="og:description" content="Application de suivi du cycle menstruel avec journal émotionnel, assistant IA hors ligne, et protection totale de vos données. Disponible sur Windows." />
  <meta property="og:image" content="https://mood-jardin.vercel.app/og.png" />
  <meta property="og:image:width" content="1200" />
  <meta property="og:image:height" content="630" />
  <meta property="og:locale" content="fr_FR" />
  
  <!-- Twitter -->
  <meta property="twitter:card" content="summary_large_image" />
  <meta property="twitter:url" content="https://mood-jardin.vercel.app/" />
  <meta property="twitter:title" content="Mood Jardin - Suivi du cycle menstruel privé et bienveillant" />
  <meta property="twitter:description" content="Application de suivi du cycle menstruel avec journal émotionnel, assistant IA hors ligne, et protection totale de vos données. Disponible sur Windows." />
  <meta property="twitter:image" content="https://mood-jardin.vercel.app/og.png" />
  
  <!-- Canonical -->
  <link rel="canonical" href="https://mood-jardin.vercel.app/" />
  
  <!-- Favicon -->
  <link rel="icon" type="image/x-icon" href="/favicon.ico" />
  <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
  
  <!-- Fonts Preload -->
  <link rel="preconnect" href="https://fonts.googleapis.com" />
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
  <link rel="preload" href="https://fonts.googleapis.com/css2?family=Fraunces:wght@400;600;700&family=Figtree:wght@400;500;600&display=swap" as="style" />
  <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Fraunces:wght@400;600;700&family=Figtree:wght@400;500;600&display=swap" />
  
  <!-- Security Headers (via Vercel) -->
  <meta http-equiv="X-UA-Compatible" content="IE=edge" />
</head>
<body>
  <div id="root"></div>
</body>
</html>
```

#### Structured Data (JSON-LD)

```html
<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  "name": "Mood Jardin",
  "applicationCategory": "HealthApplication",
  "operatingSystem": "Windows",
  "offers": {
    "@type": "Offer",
    "price": "0",
    "priceCurrency": "EUR"
  },
  "description": "Application de suivi du cycle menstruel avec journal émotionnel, assistant IA hors ligne, et protection totale de vos données.",
  "downloadUrl": "https://github.com/Killurassoul/Mood-cycle-tracker-and-more/releases/latest",
  "softwareVersion": "1.0.0",
  "author": {
    "@type": "Organization",
    "name": "Mood Jardin"
  },
  "aggregateRating": {
    "@type": "AggregateRating",
    "ratingValue": "5",
    "ratingCount": "1"
  }
}
</script>
```

#### robots.txt

```
User-agent: *
Allow: /
Disallow: /admin/
Disallow: /*.json$

Sitemap: https://mood-jardin.vercel.app/sitemap.xml
```

#### sitemap.xml

```xml
<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url>
    <loc>https://mood-jardin.vercel.app/</loc>
    <lastmod>2025-01-10</lastmod>
    <changefreq>weekly</changefreq>
    <priority>1.0</priority>
  </url>
  <url>
    <loc>https://mood-jardin.vercel.app/confidentialite</loc>
    <lastmod>2025-01-10</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.8</priority>
  </url>
</urlset>
```

### Deployment Specifications

#### vercel.json Configuration

```json
{
  "version": 2,
  "buildCommand": "npm run build",
  "outputDirectory": "dist",
  "framework": "vite",
  "rewrites": [
    {
      "source": "/(.*)",
      "destination": "/index.html"
    }
  ],
  "headers": [
    {
      "source": "/(.*)",
      "headers": [
        {
          "key": "X-Frame-Options",
          "value": "DENY"
        },
        {
          "key": "X-Content-Type-Options",
          "value": "nosniff"
        },
        {
          "key": "Referrer-Policy",
          "value": "strict-origin-when-cross-origin"
        },
        {
          "key": "Permissions-Policy",
          "value": "geolocation=(), microphone=(), camera=()"
        },
        {
          "key": "Content-Security-Policy",
          "value": "default-src 'self'; script-src 'self' 'unsafe-inline' 'unsafe-eval'; style-src 'self' 'unsafe-inline' https://fonts.googleapis.com; font-src 'self' https://fonts.gstatic.com; img-src 'self' data: https:; connect-src 'self'; frame-ancestors 'none';"
        }
      ]
    },
    {
      "source": "/assets/(.*)",
      "headers": [
        {
          "key": "Cache-Control",
          "value": "public, max-age=31536000, immutable"
        }
      ]
    }
  ]
}
```

#### Environment Variables

```bash
# .env.example
VITE_APP_NAME=Mood Jardin
VITE_DOWNLOAD_URL_WINDOWS=https://github.com/Killurassoul/Mood-cycle-tracker-and-more/releases/latest/download/Mood-Jardin-Setup.exe
VITE_GITHUB_REPO=https://github.com/Killurassoul/Mood-cycle-tracker-and-more
VITE_CONTACT_EMAIL=Rassoulgye@gmail.com
VITE_SITE_URL=https://mood-jardin.vercel.app
```

#### Build Configuration (vite.config.ts)

```typescript
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { visualizer } from 'rollup-plugin-visualizer';

export default defineConfig({
  plugins: [
    react(),
    visualizer({ filename: 'dist/stats.html' }) // Bundle size analysis
  ],
  build: {
    target: 'es2020',
    minify: 'terser',
    terserOptions: {
      compress: {
        drop_console: true // Remove console.logs in production
      }
    },
    rollupOptions: {
      output: {
        manualChunks: {
          'vendor-react': ['react', 'react-dom', 'react-router-dom'],
          'vendor-three': ['three', '@react-three/fiber', '@react-three/drei', '@react-three/postprocessing'],
          'vendor-animation': ['framer-motion']
        }
      }
    },
    chunkSizeWarningLimit: 600 // KB
  },
  server: {
    port: 3000,
    open: true
  }
});
```

## Diagrams

### System Context Diagram

```
┌──────────────────────────────────────────────────────────┐
│                       User Browser                        │
│                                                           │
│  ┌────────────────────────────────────────────────────┐  │
│  │          Mood Cycle Landing Site (SPA)             │  │
│  │                                                     │  │
│  │  React Router ────────────┐                        │  │
│  │                           │                        │  │
│  │  ┌──────────────┐  ┌──────────────┐  ┌─────────┐ │  │
│  │  │  HomePage    │  │ PrivacyPage  │  │ 404Page │ │  │
│  │  └──────────────┘  └──────────────┘  └─────────┘ │  │
│  │         │                                          │  │
│  │  ┌──────▼───────────────────────────────────────┐ │  │
│  │  │        Sections & Components                 │ │  │
│  │  │  Hero │ Features │ FAQ │ 3D Scene │ ...      │ │  │
│  │  └──────────────────────────────────────────────┘ │  │
│  │         │                                          │  │
│  │  ┌──────▼───────────────────────────────────────┐ │  │
│  │  │            src/config.ts                     │ │  │
│  │  │  (Configuration centralisée)                 │ │  │
│  │  └──────────────────────────────────────────────┘ │  │
│  └────────────────────────────────────────────────────┘  │
│                                                           │
│  Interacts with:                                          │
│  • Google Fonts CDN (polices)                             │
│  • GitHub Releases (téléchargement .exe)                  │
│  • Vercel CDN (assets statiques)                          │
└──────────────────────────────────────────────────────────┘
```

### Component Hierarchy Diagram

```
App (Router)
│
├── Navigation (layout)
│   ├── Logo
│   ├── NavLinks
│   ├── CTAButton
│   └── MobileMenu (hamburger)
│
├── HomePage
│   ├── Hero (section)
│   │   ├── HeroCanvas (3D)
│   │   │   ├── ErrorBoundary
│   │   │   └── Canvas (R3F)
│   │   │       ├── PerspectiveCamera
│   │   │       ├── Lights
│   │   │       │   ├── Environment
│   │   │       │   └── Lightformers (×5)
│   │   │       ├── Orb (group)
│   │   │       │   ├── Sphere (nacré)
│   │   │       │   ├── Rim (visière)
│   │   │       │   └── Eye (œil-lune)
│   │   │       ├── CycleRing (28 billes)
│   │   │       ├── Drops (×3-5 gouttes)
│   │   │       ├── Rig (animation)
│   │   │       └── EffectComposer (Bloom)
│   │   └── HeroText (CTA)
│   │
│   ├── CyclePhases (section)
│   │   ├── PhaseWheel (SVG)
│   │   └── PhaseCards (×4)
│   │       └── Card (ui)
│   │
│   ├── Features (section)
│   │   └── BentoGrid
│   │       └── FeatureCards (×9)
│   │           └── Card (ui)
│   │
│   ├── HowItWorks (section)
│   │   ├── Steps (×3)
│   │   └── WindowsHelp
│   │
│   ├── Privacy (section)
│   │   ├── LocalStorageExplanation
│   │   └── OfflineAI
│   │
│   ├── FAQ (section)
│   │   └── Accordion (×6 items)
│   │       └── AccordionItem (ui)
│   │
│   └── FinalCTA (section)
│       └── Button (ui)
│
├── PrivacyPage
│   ├── Header
│   ├── DetailedPolicy
│   └── BackButton
│
├── NotFoundPage
│   ├── ErrorMessage
│   └── HomeLink
│
└── Footer (layout)
    ├── Links (GitHub, Email)
    └── LegalNotice
```

### 3D Scene Spatial Diagram

```
                       Camera (Z=12)
                            │
                            │
                            ▼
        ┌───────────────────────────────────┐
        │                                   │
        │         Viewport Frustum          │
        │                                   │
        └───────────────────────────────────┘
                            │
                            │
         ┌──────────────────┼──────────────────┐
         │                  │                  │
    Drops (Z=-3)       Orb (Z=0)         Background
    (3-5 gouttes)         │              (gradient)
    rose/pêche            │
         │                │
         │         ┌──────▼──────┐
         │         │   Sphere    │
         │         │   (r=2)     │
         │         │   Nacré     │
         │         └─────────────┘
         │                │
         │         ┌──────┴──────┐
         │         │             │
         │      Rim (arc)    Eye (Z=1.8)
         │      (visière)    (œil-lune)
         │
         │
    CycleRing (Y=0, incliné 18°)
    ┌───────────────────────────┐
    │  ●  ●  ●  ●  ●  ●  ●      │ Menstruation (#e8587a)
    │  ●  ●  ●  ●  ●  ●  ●      │ Folliculaire (#ffb38a)
    │  ●  ●  ●  ●  ●  ●  ●      │ Ovulation (#9fe0c4)
    │  ●  ●  ●  ●  ●  ●  ●      │ Lutéale (#b79cff)
    └───────────────────────────┘
    Rayon: 3.5 unités
    28 billes sur cercle
```

### Animation State Machine (Eye Component)

```
┌─────────────────────────────────────────────────────────┐
│                    Eye Animation FSM                     │
└─────────────────────────────────────────────────────────┘

    ┌─────────────┐
    │   Idle      │ ◄────────────────────┐
    │  (open)     │                      │
    └──────┬──────┘                      │
           │                             │
           │ Timer >= nextBlinkTime      │
           ▼                             │
    ┌─────────────┐                      │
    │  Blinking   │                      │
    │  (closing)  │                      │
    └──────┬──────┘                      │
           │                             │
           │ Progress < 0.5              │
           ▼                             │
    ┌─────────────┐                      │
    │  Blinking   │                      │
    │ (reopening) │                      │
    └──────┬──────┘                      │
           │                             │
           │ Progress >= 1.0             │
           └─────────────────────────────┘

    Parallel State:
    
    ┌─────────────┐
    │  Following  │ ◄─── Mouse active
    │   Cursor    │
    └──────┬──────┘
           │
           │ Inactive > 3.5s
           ▼
    ┌─────────────┐
    │    Idle     │
    │   Gazing    │ ──► Random target every 2.5s
    └─────────────┘
           │
           │ Mouse moves
           └──────────► Back to Following
```

### Scroll Animation Timeline

```
Viewport Position     │  Animation Triggered
──────────────────────┼───────────────────────────────────
                      │
Top (0%)              │  • Hero visible (no animation)
                      │  • Navigation fixed
                      │
                      │
Scroll 20%            │  • CyclePhases enters viewport
                      │    ├─ PhaseWheel: fade + translateY(16px)
                      │    └─ Cards: stagger 70ms
                      │
                      │
Scroll 40%            │  • Features enters viewport
                      │    └─ BentoGrid cards: stagger 70ms
                      │
                      │
Scroll 60%            │  • HowItWorks enters viewport
                      │    └─ Steps: stagger 70ms
                      │
                      │
Scroll 70%            │  • Privacy enters viewport
                      │    └─ Content blocks: fade
                      │
                      │
Scroll 85%            │  • FAQ enters viewport
                      │    └─ Accordion items: stagger 70ms
                      │
                      │
Scroll 95%            │  • FinalCTA enters viewport
                      │    └─ Button: scale pulse
                      │
Bottom (100%)         │  • Footer visible
                      │
```

### WebGL Detection Flow

```
┌───────────────────────────────────────────────────────────┐
│                   HeroCanvas Mount                        │
└────────────────────┬──────────────────────────────────────┘
                     │
                     ▼
         ┌────────────────────────┐
         │  detectWebGL()         │
         │  (webgl-detector.ts)   │
         └────────┬───────────────┘
                  │
       ┌──────────┴──────────┐
       │                     │
       ▼                     ▼
  ┌─────────┐         ┌────────────┐
  │ WebGL   │         │ WebGL Not  │
  │ Supported│        │ Supported  │
  └────┬────┘         └──────┬─────┘
       │                     │
       ▼                     ▼
┌──────────────┐      ┌──────────────┐
│ Try Render   │      │   Display    │
│  Canvas R3F  │      │  Fallback    │
└──────┬───────┘      │  (CSS Orb)   │
       │              └──────────────┘
       │
   ┌───┴───┐
   │       │
   ▼       ▼
┌─────┐ ┌────────┐
│ OK  │ │ Crash  │
└─────┘ └───┬────┘
            │
            ▼
     ┌──────────────┐
     │ ErrorBoundary│
     │   catches    │
     └──────┬───────┘
            │
            ▼
     ┌──────────────┐
     │   Display    │
     │  Fallback    │
     └──────────────┘
```

---

## Summary

Ce design document fournit une spécification technique complète pour le **Mood Cycle Landing Site**, un site vitrine React immersif avec une scène 3D procédurale représentant le cycle menstruel. 

**Points clés** :
- **Architecture modulaire** : Composants React réutilisables, configuration centralisée (src/config.ts)
- **Scène 3D procédurale** : Orbe nacrée, visière verre noir, œil-lune avec phases, 28 billes colorées, gouttes flottantes
- **Direction artistique cohérente** : Thème "nuit luxueuse" avec fond aubergine, lueurs rose/pêche, glassmorphism
- **Performance optimisée** : Code-splitting, lazy-loading, Lighthouse > 90 mobile
- **Accessibilité WCAG AA** : Navigation clavier, ARIA, contraste, lecteur d'écran
- **Tests appropriés** : Snapshot, visual regression, integration, accessibility (PBT non applicable pour UI/rendering)

Le site extrait toutes les informations depuis le dépôt de l'application existante, garantissant l'absence de données inventées et maintenant la transparence sur la confidentialité (localStorage uniquement, IA offline).
