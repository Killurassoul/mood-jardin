# Requirements Document

## Introduction

Ce document décrit les exigences pour le site vitrine "Mood Cycle Landing Site", une page web immersive créée avec React Three Fiber pour présenter l'application "Mood Jardin". Le site est conçu comme une expérience visuelle d'une seule page avec une scène 3D interactive représentant le cycle menstruel, une direction artistique "nuit luxueuse" (fond aubergine, lueurs rose/pêche), et un parcours utilisateur guidant vers le téléchargement de l'application desktop Windows.

Le site vitrine doit extraire ses informations uniquement du dépôt de l'application existante, sans inventer de données fictives (chiffres d'utilisateurs, témoignages, certifications médicales). Il doit être totalement autonome, sans backend, sans clés API, sans système de tracking, et garantir la confidentialité comme l'application elle-même.

## Glossary

- **Site_Vitrine**: La page web unique présentant l'application Mood Jardin
- **Application_Mood_Jardin**: L'application desktop/mobile de suivi du cycle menstruel (dépôt existant)
- **Scene_3D**: La scène Three.js interactive avec l'orbe du cycle
- **Orbe_Cycle**: Sphère nacrée 3D représentant visuellement le cycle menstruel
- **Repli_WebGL**: Version CSS alternative affichée si WebGL n'est pas disponible
- **Guide_Medical**: L'encyclopédie médicale intégrée dans l'application
- **Contact_Email**: L'adresse email Rassoulgye@gmail.com pour les demandes de support
- **Dépôt_App**: Le dépôt GitHub source de l'application Mood Jardin
- **Configuration_Centrale**: Le fichier src/config.ts contenant toutes les URLs et constantes modifiables
- **Direction_Artistique**: Le thème visuel "nuit luxueuse" avec fond aubergine et lueurs rose/pêche
- **Bento_Grid**: Grille de cartes visuelles présentant les fonctionnalités
- **Carte_Verre**: Composant UI avec effet de verre sombre (glassmorphism)
- **Animation_Scroll**: Animation déclenchée lors du défilement de la page
- **Polices_Site**: Fraunces (titres) et Figtree (texte)
- **Palette_Cycle**: Couleurs des 4 phases (#e8587a menstruation, #ffb38a folliculaire, #9fe0c4 ovulation, #b79cff lutéale)
- **Version_PC**: Version Electron Windows téléchargeable
- **Version_Android**: Version Capacitor en cours de développement
- **Phare_Lighthouse**: Outil de mesure de performance web de Google
- **WCAG_AA**: Niveau de conformité d'accessibilité web

## Requirements

### Requirement 1: Extraction des Informations de l'Application

**User Story:** En tant que développeur du site vitrine, je veux extraire les informations réelles du dépôt de l'application, afin que le site présente uniquement des données vérifiables et ne contienne aucune affirmation inventée.

#### Acceptance Criteria

1. THE Site_Vitrine SHALL extract le nom officiel "Mood Jardin" depuis le fichier capacitor.config.ts du Dépôt_App
2. THE Site_Vitrine SHALL extract la liste des fonctionnalités depuis le code source réel du Dépôt_App (App.tsx, views/)
3. THE Site_Vitrine SHALL extract la palette de couleurs depuis les fichiers de style du Dépôt_App
4. THE Site_Vitrine SHALL extract les polices utilisées depuis index.css du Dépôt_App
5. THE Site_Vitrine SHALL identify que le stockage est localStorage uniquement (pas de serveur)
6. THE Site_Vitrine SHALL identify que l'assistant IA fonctionne hors ligne sans appel API externe
7. THE Site_Vitrine SHALL NOT contain de chiffres d'utilisateurs inventés
8. THE Site_Vitrine SHALL NOT contain de témoignages fictifs
9. THE Site_Vitrine SHALL NOT contain de certifications médicales non vérifiables
10. THE Site_Vitrine SHALL NOT modify le Dépôt_App pendant l'extraction d'informations

### Requirement 2: Configuration Centrale

**User Story:** En tant que mainteneur du site, je veux une configuration centralisée, afin de pouvoir modifier facilement les URLs et constantes sans chercher dans tout le code.

#### Acceptance Criteria

1. THE Site_Vitrine SHALL create un fichier src/config.ts contenant toutes les URLs et constantes modifiables
2. THE Configuration_Centrale SHALL contain l'URL de téléchargement Windows
3. THE Configuration_Centrale SHALL contain l'URL du dépôt GitHub
4. THE Configuration_Centrale SHALL contain le Contact_Email
5. THE Configuration_Centrale SHALL contain le statut de disponibilité pour chaque plateforme (PC, Android, iOS)
6. THE Configuration_Centrale SHALL contain les couleurs de la Palette_Cycle
7. THE Configuration_Centrale SHALL contain les URLs des polices Google Fonts
8. THE Configuration_Centrale SHALL be le seul fichier nécessitant modification pour changer les liens

### Requirement 3: Structure de Navigation et Sections

**User Story:** En tant que visiteur, je veux une navigation claire et des sections bien organisées, afin de comprendre rapidement l'application et de savoir où la télécharger.

#### Acceptance Criteria

1. THE Site_Vitrine SHALL display une navigation fixe en haut avec effet de verre sombre et blur
2. THE Site_Vitrine SHALL contain une section Hero de 100svh avec la Scene_3D et un CTA téléchargement
3. THE Site_Vitrine SHALL contain une section "Le cycle en 4 phases" avec roue SVG et 4 cartes pédagogiques
4. THE Site_Vitrine SHALL contain une section "Fonctionnalités" avec Bento_Grid de cartes en verre
5. THE Site_Vitrine SHALL contain une section "Comment ça marche" avec 3 étapes + aide installation Windows
6. THE Site_Vitrine SHALL contain une section "Confidentialité" basée sur le code réel du Dépôt_App
7. THE Site_Vitrine SHALL contain une section FAQ avec accordéon accessible
8. THE Site_Vitrine SHALL contain une section CTA final avant le footer
9. THE Site_Vitrine SHALL contain un footer avec liens de contact et mentions légales
10. THE Site_Vitrine SHALL implement un scroll fluide vers les sections lors des clics sur la navigation

### Requirement 4: Scène 3D Interactive (Procédurale)

**User Story:** En tant que visiteur, je veux une expérience visuelle immersive en 3D, afin de comprendre visuellement le concept du cycle menstruel d'une manière esthétique et engageante.

#### Acceptance Criteria

1. THE Scene_3D SHALL render avec @react-three/fiber dans un Canvas React
2. THE Orbe_Cycle SHALL be une sphère procédurale avec effet fresnel nacré
3. THE Orbe_Cycle SHALL contain une visière de verre noir semi-transparente
4. THE Orbe_Cycle SHALL contain un œil-lune dont la phase évolue selon l'animation
5. THE Scene_3D SHALL display un CycleRing avec 28 billes colorées selon la Palette_Cycle disposées en cercle incliné
6. THE Scene_3D SHALL display des gouttes flottantes en verre poli (rose et pêche)
7. THE Scene_3D SHALL use un système d'éclairage avec Environment et Lightformers de @react-three/drei
8. THE Scene_3D SHALL apply un effet Bloom avec @react-three/postprocessing
9. THE Scene_3D SHALL NOT load de modèles GLB externes (création procédurale uniquement)
10. THE Scene_3D SHALL animate l'Orbe_Cycle pour suivre le curseur avec lissage
11. THE Scene_3D SHALL animate l'Orbe_Cycle avec flottement vertical subtil
12. THE Scene_3D SHALL animate l'œil-lune avec clignement périodique
13. WHEN le curseur reste inactif pendant 3 secondes, THE Scene_3D SHALL make l'œil-lune regarder aléatoirement
14. THE Scene_3D SHALL set dpr to [1, 2] pour optimiser les performances
15. THE Scene_3D SHALL use frameloop conditionnel pour économiser les ressources

### Requirement 5: Repli WebGL et Accessibilité 3D

**User Story:** En tant que visiteur sur un appareil sans WebGL, je veux voir une version alternative, afin de pouvoir quand même accéder au contenu du site.

#### Acceptance Criteria

1. WHEN WebGL n'est pas disponible, THE Site_Vitrine SHALL display le Repli_WebGL
2. THE Repli_WebGL SHALL be une div CSS avec dégradé radial simulant l'orbe
3. THE Repli_WebGL SHALL maintain les mêmes proportions que la Scene_3D
4. THE Repli_WebGL SHALL use les couleurs de la Palette_Cycle
5. THE Site_Vitrine SHALL detect la disponibilité de WebGL au chargement initial
6. THE Site_Vitrine SHALL NOT crash si WebGL échoue à initialiser
7. THE Site_Vitrine SHALL log un message console informatif lors du repli

### Requirement 6: Direction Artistique "Nuit Luxueuse"

**User Story:** En tant que designer, je veux une direction artistique cohérente et féminine sans cliché, afin que le site reflète l'élégance et le sérieux de l'application.

#### Acceptance Criteria

1. THE Site_Vitrine SHALL use un fond de couleur #120912 (aubergine profond)
2. THE Site_Vitrine SHALL apply des lueurs floues rose (#ff7a9c) et lilas (#b79cff) en arrière-plan
3. THE Site_Vitrine SHALL apply un grain SVG à 3% d'opacité sur tout le site
4. THE Site_Vitrine SHALL apply une vignette radiale sombre sur les bords
5. THE Carte_Verre SHALL use blanc à 5% d'opacité avec blur de 16px
6. THE Carte_Verre SHALL have une bordure de 1px et un rayon de 22px
7. THE Site_Vitrine SHALL use le dégradé d'accent de #ff7a9c vers #ffb38a
8. THE Site_Vitrine SHALL use les Polices_Site: Fraunces pour les titres et Figtree pour le texte
9. THE Site_Vitrine SHALL maintain un contraste minimum de 4.5:1 pour le texte (WCAG_AA)
10. THE Site_Vitrine SHALL NOT use de roses criardes, de fleurs clipart, ou de tons pastel sucrés

### Requirement 7: Animations et Micro-interactions

**User Story:** En tant que visiteur, je veux des animations fluides et subtiles, afin que l'expérience soit agréable sans être distrayante.

#### Acceptance Criteria

1. WHEN une section entre dans le viewport, THE Site_Vitrine SHALL animate avec fade-in et translateY de 16px
2. THE Animation_Scroll SHALL use un stagger de 70ms entre les éléments
3. THE Animation_Scroll SHALL use Framer Motion avec les hooks useInView
4. WHEN un bouton est survolé, THE Site_Vitrine SHALL apply une transition de 200ms
5. THE Site_Vitrine SHALL animate les cartes au survol avec scale(1.02) et lift shadow
6. THE Site_Vitrine SHALL animate l'accordéon FAQ avec collapse/expand fluide
7. WHEN prefers-reduced-motion est activé, THE Site_Vitrine SHALL disable toutes les animations non essentielles
8. THE Site_Vitrine SHALL respect prefers-reduced-motion pour la Scene_3D (réduction des mouvements)
9. THE Site_Vitrine SHALL NOT use d'animations qui démarrent automatiquement au chargement (sauf Scene_3D)

### Requirement 8: Responsive Design Mobile-First

**User Story:** En tant que visiteur mobile, je veux que le site s'affiche parfaitement sur mon téléphone, afin de pouvoir découvrir l'application en déplacement.

#### Acceptance Criteria

1. THE Site_Vitrine SHALL support une largeur minimale de 360px
2. THE Site_Vitrine SHALL use Tailwind CSS avec breakpoints responsive (sm:, md:, lg:, xl:)
3. WHEN la largeur est inférieure à 768px, THE Site_Vitrine SHALL collapse la navigation en menu hamburger
4. WHEN la largeur est inférieure à 768px, THE Site_Vitrine SHALL stack les cartes du Bento_Grid verticalement
5. WHEN la largeur est inférieure à 768px, THE Scene_3D SHALL reduce la qualité (dpr à [1, 1])
6. THE Site_Vitrine SHALL NOT produce de scroll horizontal sur aucune taille d'écran
7. THE Site_Vitrine SHALL use des unités svh pour la hauteur du Hero (support iOS Safari)
8. THE Site_Vitrine SHALL optimize les tailles de police pour mobile (min 14px pour le corps)
9. THE Site_Vitrine SHALL test sur viewport 360×640, 375×667, 414×896, 1920×1080
10. THE Site_Vitrine SHALL ensure que tous les boutons ont une zone tactile minimale de 44×44px

### Requirement 9: Performance et Optimisation

**User Story:** En tant que visiteur sur mobile 4G, je veux un chargement rapide, afin de ne pas attendre et de ne pas consommer trop de data.

#### Acceptance Criteria

1. THE Site_Vitrine SHALL achieve un score Phare_Lighthouse mobile supérieur à 90
2. THE Site_Vitrine SHALL lazy-load la Scene_3D après le First Contentful Paint
3. THE Site_Vitrine SHALL preload les Polices_Site (Fraunces et Figtree)
4. THE Site_Vitrine SHALL optimize les images avec formats modernes (WebP avec repli PNG)
5. THE Site_Vitrine SHALL generate une image og.png de 1200×630px pour le partage social
6. THE Site_Vitrine SHALL minify le bundle JavaScript avec Vite
7. THE Site_Vitrine SHALL use code-splitting pour séparer la Scene_3D du code initial
8. THE Site_Vitrine SHALL limit le bundle Three.js à 150KB gzippé maximum
9. THE Site_Vitrine SHALL NOT include de bibliothèques inutiles dans le bundle final
10. THE Site_Vitrine SHALL set des cache headers appropriés dans vercel.json

### Requirement 10: Contenu de la Section Fonctionnalités

**User Story:** En tant que visiteur, je veux comprendre précisément ce que fait l'application, afin de décider si elle correspond à mes besoins.

#### Acceptance Criteria

1. THE Site_Vitrine SHALL list "Suivi du cycle menstruel" comme fonctionnalité (extraite du code réel)
2. THE Site_Vitrine SHALL list "Journal quotidien des émotions et symptômes" comme fonctionnalité (extraite du code réel)
3. THE Site_Vitrine SHALL list "Suivi corporel (douleurs, localisations)" comme fonctionnalité (extraite du code réel)
4. THE Site_Vitrine SHALL list "Rappels personnalisés" comme fonctionnalité (extraite du code réel)
5. THE Site_Vitrine SHALL list "Dossier médical (rendez-vous, médicaments, contraception)" comme fonctionnalité (extraite du code réel)
6. THE Site_Vitrine SHALL list "Statistiques et graphiques" comme fonctionnalité (extraite du code réel)
7. THE Site_Vitrine SHALL list "Assistant IA hors ligne" comme fonctionnalité (extraite du code réel)
8. THE Site_Vitrine SHALL list "Encyclopédie médicale intégrée" comme fonctionnalité (extraite du Guide_Medical)
9. THE Site_Vitrine SHALL list "Mode discret avec code PIN" comme fonctionnalité (extraite du code réel)
10. THE Site_Vitrine SHALL specify que toutes les données restent sur l'appareil (localStorage)
11. THE Site_Vitrine SHALL NOT mention de synchronisation cloud (non implémentée)
12. THE Site_Vitrine SHALL NOT mention de communauté ou de forum (non implémentée)

### Requirement 11: Contenu de la Section Confidentialité

**User Story:** En tant que visiteur soucieux de ma vie privée, je veux savoir comment mes données seront traitées, afin de décider en connaissance de cause.

#### Acceptance Criteria

1. THE Site_Vitrine SHALL state que toutes les données restent sur l'appareil de l'utilisateur
2. THE Site_Vitrine SHALL state qu'aucune donnée n'est envoyée à un serveur externe
3. THE Site_Vitrine SHALL state que l'application utilise localStorage (mention technique claire)
4. THE Site_Vitrine SHALL state que l'assistant IA fonctionne hors ligne sans appel API
5. THE Site_Vitrine SHALL state qu'il n'y a aucun tracker, aucune analyse, aucun cookie tiers
6. THE Site_Vitrine SHALL state que le code source est disponible sur GitHub pour vérification
7. THE Site_Vitrine SHALL provide un lien vers le Dépôt_App pour transparence
8. THE Site_Vitrine SHALL recommend la sauvegarde manuelle des données (export JSON)
9. THE Site_Vitrine SHALL warn que la désinstallation supprime les données locales
10. THE Site_Vitrine SHALL NOT claim de conformité RGPD/HIPAA non vérifiée

### Requirement 12: Contenu de la Section "Comment ça marche"

**User Story:** En tant que visiteur non technique, je veux des instructions simples pour installer l'application, afin de pouvoir l'utiliser sans aide technique.

#### Acceptance Criteria

1. THE Site_Vitrine SHALL describe "Étape 1: Télécharger l'installeur Windows"
2. THE Site_Vitrine SHALL describe "Étape 2: Exécuter le fichier .exe et suivre l'assistant"
3. THE Site_Vitrine SHALL describe "Étape 3: Lancer Mood Jardin et commencer le suivi"
4. THE Site_Vitrine SHALL provide un lien vers l'installeur Windows dans la Configuration_Centrale
5. THE Site_Vitrine SHALL explain que Windows Defender peut afficher un avertissement (application non signée)
6. THE Site_Vitrine SHALL provide des instructions pour contourner l'avertissement Windows ("Plus d'infos" puis "Exécuter quand même")
7. THE Site_Vitrine SHALL mention que l'application ne nécessite pas de connexion Internet après installation
8. THE Site_Vitrine SHALL NOT provide d'instructions pour Android (version en développement)
9. THE Site_Vitrine SHALL NOT provide d'instructions pour iOS (non disponible)

### Requirement 13: Disponibilité des Plateformes

**User Story:** En tant que visiteur, je veux savoir sur quelles plateformes l'application est disponible, afin de ne pas perdre de temps sur une plateforme non supportée.

#### Acceptance Criteria

1. THE Site_Vitrine SHALL display la Version_PC comme "Disponible et téléchargeable"
2. THE Site_Vitrine SHALL display un badge "Télécharger pour Windows" actif
3. THE Site_Vitrine SHALL display la Version_Android comme "En cours de développement"
4. THE Site_Vitrine SHALL display un badge "Bientôt sur Android" inactif (non cliquable)
5. THE Site_Vitrine SHALL NOT display de badge iOS
6. THE Site_Vitrine SHALL NOT claim que l'application est disponible sur Android
7. THE Site_Vitrine SHALL NOT provide de lien de téléchargement Android (.apk)
8. THE Site_Vitrine SHALL use des icônes claires pour chaque plateforme (Windows logo, Android robot)

### Requirement 14: Section FAQ

**User Story:** En tant que visiteur, je veux des réponses aux questions fréquentes, afin de lever mes doutes avant de télécharger.

#### Acceptance Criteria

1. THE Site_Vitrine SHALL answer "L'application est-elle gratuite ?"
2. THE Site_Vitrine SHALL answer "Mes données sont-elles sécurisées ?"
3. THE Site_Vitrine SHALL answer "L'application fonctionne-t-elle sans Internet ?"
4. THE Site_Vitrine SHALL answer "Puis-je exporter mes données ?"
5. THE Site_Vitrine SHALL answer "L'application est-elle médicalement certifiée ?"
6. THE Site_Vitrine SHALL answer "Comment contacter le support ?"
7. THE Site_Vitrine SHALL implement un accordéon accessible (ARIA expanded/collapsed)
8. THE Site_Vitrine SHALL allow keyboard navigation (Enter/Space pour ouvrir/fermer)
9. THE Site_Vitrine SHALL NOT invent de réponses non vérifiables
10. THE Site_Vitrine SHALL provide le Contact_Email dans la réponse support

### Requirement 15: SEO et Meta Tags

**User Story:** En tant que propriétaire du site, je veux un bon référencement, afin que les visiteurs trouvent le site via les moteurs de recherche.

#### Acceptance Criteria

1. THE Site_Vitrine SHALL set un titre HTML: "Mood Jardin - Suivi du cycle menstruel privé et bienveillant"
2. THE Site_Vitrine SHALL set une meta description de 150-160 caractères
3. THE Site_Vitrine SHALL set des balises Open Graph (og:title, og:description, og:image, og:url)
4. THE Site_Vitrine SHALL set des balises Twitter Card (twitter:card, twitter:title, twitter:description, twitter:image)
5. THE Site_Vitrine SHALL generate une image og.png de 1200×630px avec le titre et le visuel de l'orbe
6. THE Site_Vitrine SHALL set un favicon.ico et des apple-touch-icon
7. THE Site_Vitrine SHALL set la lang attribute à "fr" sur la balise html
8. THE Site_Vitrine SHALL use des balises sémantiques HTML5 (header, main, section, article, footer, nav)
9. THE Site_Vitrine SHALL set un canonical link vers l'URL de production
10. THE Site_Vitrine SHALL NOT use de balises meta robots noindex

### Requirement 16: Accessibilité Web (WCAG AA)

**User Story:** En tant que visiteur avec un handicap, je veux pouvoir naviguer et comprendre le site, afin d'accéder aux mêmes informations que les autres.

#### Acceptance Criteria

1. THE Site_Vitrine SHALL maintain un contraste de couleur minimum de 4.5:1 pour le texte normal
2. THE Site_Vitrine SHALL maintain un contraste de couleur minimum de 3:1 pour le texte large (18pt+)
3. THE Site_Vitrine SHALL provide des alt text descriptifs pour toutes les images décoratives
4. THE Site_Vitrine SHALL use des labels ARIA pour les boutons sans texte visible
5. THE Site_Vitrine SHALL ensure que tous les éléments interactifs sont accessibles au clavier
6. THE Site_Vitrine SHALL display un focus visible sur tous les éléments interactifs
7. THE Site_Vitrine SHALL use des balises de titre hiérarchiques (h1 > h2 > h3)
8. THE Site_Vitrine SHALL provide des attributs ARIA pour l'accordéon FAQ
9. THE Site_Vitrine SHALL skip la Scene_3D pour les lecteurs d'écran (aria-hidden="true")
10. THE Site_Vitrine SHALL test avec un lecteur d'écran (NVDA ou JAWS)
11. THE Site_Vitrine SHALL NOT use de texte en image sans alternative textuelle

### Requirement 17: Routing et Pages

**User Story:** En tant que visiteur, je veux accéder à une page de confidentialité dédiée, afin de lire les détails en entier.

#### Acceptance Criteria

1. THE Site_Vitrine SHALL implement React Router avec route "/" pour la page principale
2. THE Site_Vitrine SHALL implement React Router avec route "/confidentialite" pour la politique de confidentialité
3. THE Site_Vitrine SHALL implement une page 404 pour les routes inconnues
4. WHEN un visiteur accède à "/confidentialite", THE Site_Vitrine SHALL display une page dédiée (pas une section)
5. THE Site_Vitrine SHALL provide un lien "Politique de confidentialité" dans le footer
6. THE Site_Vitrine SHALL provide un bouton "Retour à l'accueil" sur la page /confidentialite
7. THE Site_Vitrine SHALL maintain la navigation fixe sur toutes les pages
8. THE Site_Vitrine SHALL set le titre de page approprié pour chaque route
9. THE Site_Vitrine SHALL scroll en haut lors du changement de route

### Requirement 18: Déploiement sur Vercel

**User Story:** En tant que développeur, je veux un déploiement simple et optimisé, afin que le site soit accessible rapidement et de manière fiable.

#### Acceptance Criteria

1. THE Site_Vitrine SHALL include un fichier vercel.json avec configuration de build
2. THE Site_Vitrine SHALL configure des en-têtes de sécurité (X-Frame-Options, X-Content-Type-Options, CSP)
3. THE Site_Vitrine SHALL configure une réécriture SPA (toutes les routes vers index.html)
4. THE Site_Vitrine SHALL configure des en-têtes de cache pour les assets statiques
5. THE Site_Vitrine SHALL generate un fichier robots.txt permettant l'indexation
6. THE Site_Vitrine SHALL generate un fichier sitemap.xml avec les routes principales
7. THE Site_Vitrine SHALL build avec "npm run build" (commande Vite standard)
8. THE Site_Vitrine SHALL output le build dans le dossier "dist"
9. THE Site_Vitrine SHALL NOT deploy automatiquement (l'utilisateur déploiera manuellement)
10. THE Site_Vitrine SHALL document les instructions de déploiement dans le README.md

### Requirement 19: Gestion du Dépôt Git

**User Story:** En tant que développeur, je veux un dépôt Git propre et bien organisé, afin de faciliter la collaboration et les contributions futures.

#### Acceptance Criteria

1. THE Site_Vitrine SHALL create un nouveau dépôt public GitHub nommé "mood-cycle-site"
2. THE Site_Vitrine SHALL initialize git avec "git init" dans le dossier du site
3. THE Site_Vitrine SHALL create un fichier .gitignore excluant node_modules, dist, .env
4. THE Site_Vitrine SHALL create un fichier .gitignore excluant les binaires (.exe, .msi, .apk, .zip)
5. THE Site_Vitrine SHALL create un fichier README.md avec description du projet
6. THE Site_Vitrine SHALL create un fichier README.md avec instructions d'installation (npm install)
7. THE Site_Vitrine SHALL create un fichier README.md avec instructions de développement (npm run dev)
8. THE Site_Vitrine SHALL create un fichier README.md avec instructions de build (npm run build)
9. THE Site_Vitrine SHALL create un fichier README.md avec instructions de déploiement Vercel
10. THE Site_Vitrine SHALL create un commit initial avec message "Initial commit: Mood Cycle Landing Site"
11. THE Site_Vitrine SHALL NOT commit node_modules ou fichiers de build
12. WHERE un nouveau dépôt ne peut pas être créé, THE Site_Vitrine SHALL create une branche "landing-site" dans le Dépôt_App avec dossier /site

### Requirement 20: Tests et Vérifications Finales

**User Story:** En tant que développeur, je veux vérifier que tout fonctionne correctement, afin de livrer un site sans bugs critiques.

#### Acceptance Criteria

1. THE Site_Vitrine SHALL launch en local avec "npm run dev" sans erreur console
2. THE Site_Vitrine SHALL build avec "npm run build" sans erreur TypeScript
3. THE Site_Vitrine SHALL display l'Orbe_Cycle interactive au chargement
4. THE Site_Vitrine SHALL animate l'Orbe_Cycle au survol de la souris
5. THE Site_Vitrine SHALL display les 4 phases du cycle avec les bonnes couleurs
6. THE Site_Vitrine SHALL display toutes les fonctionnalités extraites du code réel
7. THE Site_Vitrine SHALL display le Repli_WebGL si WebGL est désactivé manuellement
8. THE Site_Vitrine SHALL respect prefers-reduced-motion (test avec DevTools)
9. THE Site_Vitrine SHALL NOT display de scroll horizontal sur aucune taille (360px, 1920px)
10. THE Site_Vitrine SHALL respond au clavier (Tab, Enter, Espace) sur tous les éléments interactifs
11. THE Site_Vitrine SHALL display le bon lien de téléchargement dans la Configuration_Centrale
12. THE Site_Vitrine SHALL generate un rapport listant: URL du dépôt, lien de téléchargement à remplacer, affirmations à vérifier, risques trouvés
