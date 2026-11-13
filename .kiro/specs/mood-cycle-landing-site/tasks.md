# Implementation Plan: Mood Cycle Landing Site

## Overview

Ce plan détaille l'implémentation complète du site vitrine "Mood Cycle Landing Site", un site React + Three.js statique avec scène 3D procédurale, déployable sur Vercel. Le site sera créé dans un nouveau dépôt GitHub public "mood-cycle-site" et respectera la direction artistique "nuit luxueuse" avec extraction des données réelles depuis le dépôt de l'application.

## Tasks

- [-] 1. Setup et configuration initiale du projet
  - Créer le dossier mood-cycle-site à côté du workspace actuel
  - Initialiser le projet Vite avec template react-ts
  - Installer les dépendances React, TypeScript, React Router
  - Installer les dépendances Three.js (@react-three/fiber, @react-three/drei, @react-three/postprocessing)
  - Installer Tailwind CSS, PostCSS, Autoprefixer
  - Installer Framer Motion pour les animations
  - Configurer tailwind.config.js avec thème personnalisé (breakpoints, couleurs)
  - Configurer tsconfig.json avec paths alias (@/ → src/)
  - Créer .gitignore (node_modules, dist, .env, binaires)
  - Tester le projet avec `npm run dev`
  - _Requirements: 18.1, 18.3, 18.4, 18.7, 18.8, 19.3_

- [~] 2. Extraction des informations de l'application existante
  - Cloner le dépôt de l'app en lecture seule dans un dossier temporaire (../Mood-cycle-tracker-and-more-temp)
  - Extraire le nom officiel depuis capacitor.config.ts
  - Extraire la liste des fonctionnalités depuis App.tsx et views/
  - Extraire la palette de couleurs depuis les fichiers de style (CSS/SCSS)
  - Extraire les polices utilisées depuis index.css
  - Confirmer que le stockage est localStorage uniquement (vérifier le code)
  - Confirmer que l'assistant IA fonctionne hors ligne (vérifier absence d'appels API externes)
  - Documenter les findings dans un fichier EXTRACTION_REPORT.md
  - Supprimer le clone temporaire après extraction
  - _Requirements: 1.1, 1.2, 1.3, 1.4, 1.5, 1.6, 1.10_

- [~] 3. Créer la configuration centrale (src/config.ts)
  - Créer src/config.ts avec structure CONFIG exportée
  - Ajouter section appName, appTagline (extraits du dépôt)
  - Ajouter section downloads (windows, android, ios) avec URLs et statuts
  - Ajouter section links (github, email, privacy)
  - Ajouter section colors (background, cardGlass, text, cycle phases)
  - Ajouter section fonts (heading, body, googleFontsUrl)
  - Ajouter section seo (title, description, ogImage, url)
  - Utiliser `as const` pour inférence TypeScript stricte
  - _Requirements: 2.1, 2.2, 2.3, 2.4, 2.5, 2.6, 2.7, 2.8_

- [~] 4. Créer les types TypeScript (src/types/index.ts)
  - Définir type PlatformStatus ('available' | 'development' | 'unavailable')
  - Définir interface DownloadPlatform (available, url, label)
  - Définir type CyclePhase ('menstruation' | 'follicular' | 'ovulation' | 'luteal')
  - Définir interface PhaseInfo (name, color, description, days)
  - Définir interface FeatureCard (title, description, icon, span)
  - Définir interface FAQItem (question, answer)
  - Définir interface OrbAnimationState (mouseX, mouseY, lastMouseMoveTime, etc.)
  - Définir interface WebGLCapabilities (supported, version, maxTextureSize)
  - _Requirements: Design Component Interfaces_

- [~] 5. Setup des styles globaux et Tailwind
  - Créer src/index.css avec imports Tailwind (@tailwind base/components/utilities)
  - Ajouter custom CSS pour grain SVG (3% opacité)
  - Ajouter custom CSS pour vignette radiale sombre
  - Ajouter custom CSS pour scroll smooth (scroll-behavior: smooth)
  - Ajouter custom CSS pour sr-only (screen reader only)
  - Configurer les classes de focus visible (ring-2, ring-focus)
  - Importer Google Fonts (Fraunces et Figtree) avec preconnect
  - Ajouter styles pour glassmorphism (backdrop-blur-md, bg-white/5)
  - _Requirements: 6.1, 6.2, 6.3, 6.4, 6.5, 6.8, 16.6_

- [~] 6. Créer le composant Navigation (layout/Navigation.tsx)
  - Créer structure nav fixe avec glassmorphism (sticky, backdrop-blur-md)
  - Ajouter logo texte "Mood Jardin" avec police Fraunces
  - Ajouter liens de navigation (Le cycle, Fonctionnalités, FAQ)
  - Ajouter bouton CTA "Télécharger" (masqué sur mobile)
  - Ajouter menu hamburger (visible uniquement sur mobile <768px)
  - Implémenter état ouvert/fermé du menu mobile avec useState
  - Implémenter scroll fluide vers les sections (smooth scroll)
  - Ajouter trap focus dans le menu mobile (accessibilité)
  - Ajouter gestion clavier (Tab, Enter, Escape)
  - Ajouter attributs ARIA (role="navigation", aria-label)
  - _Requirements: 3.1, 3.10, 8.3, 16.5, 16.6, 16.8_

- [~] 7. Créer le composant Footer (layout/Footer.tsx)
  - Créer structure footer avec glassmorphism
  - Ajouter liens de contact (GitHub, Email)
  - Ajouter lien "Politique de confidentialité" vers /confidentialite
  - Ajouter mentions légales (© 2025 Mood Jardin, Open Source)
  - Ajouter validation email côté client avant mailto:
  - Ajouter focus visible sur tous les liens
  - _Requirements: 3.9, 17.5_

- [~] 8. Créer le composant Card (ui/Card.tsx)
  - Créer composant réutilisable avec props (variant, children, className)
  - Implémenter variant "default" (bg-white/5, backdrop-blur-md)
  - Implémenter variant "feature" (hover:scale-[1.02])
  - Implémenter variant "phase" (bg-white/8, border-2)
  - Ajouter transition smooth de 200ms
  - Ajouter border-radius de 22px et border de 1px
  - _Requirements: 6.5, 6.6, 7.5, Design Card Component_

- [~] 9. Créer le composant Button (ui/Button.tsx)
  - Créer composant avec props (variant, disabled, onClick, children)
  - Implémenter variant "primary" (dégradé accent #ff7a9c → #ffb38a)
  - Implémenter variant "secondary" (border blanc, transparent)
  - Implémenter variant "ghost" (texte seul)
  - Ajouter états hover, active, disabled
  - Ajouter transition de 200ms
  - Ajouter focus visible (ring-2, ring-focus)
  - Assurer zone tactile minimale 44×44px
  - _Requirements: 7.4, 8.10, 16.6_

- [~] 10. Créer le composant Badge (ui/Badge.tsx)
  - Créer composant avec props (platform, status, label)
  - Implémenter icône Windows (SVG logo)
  - Implémenter icône Android (SVG robot)
  - Implémenter état "available" (cliquable, vert)
  - Implémenter état "development" (non cliquable, orange)
  - Implémenter état "unavailable" (non cliquable, gris)
  - Ajouter tooltip sur hover pour statut
  - _Requirements: 13.2, 13.4, 13.8_

- [~] 11. Créer le composant Accordion (ui/Accordion.tsx)
  - Créer composant avec props (items: FAQItem[])
  - Implémenter état ouvert/fermé avec useState
  - Ajouter bouton avec aria-expanded et aria-controls
  - Ajouter panel avec role="region" et aria-labelledby
  - Implémenter animation collapse/expand avec Framer Motion
  - Implémenter navigation clavier (Enter, Space, Arrow keys)
  - Ajouter icône chevron avec rotation sur ouverture
  - Permettre plusieurs items ouverts simultanément
  - _Requirements: 14.7, 14.8, 16.8, Design Accordion Component_

- [~] 12. Créer le composant PhaseWheel (ui/PhaseWheel.tsx)
  - Créer SVG circulaire avec viewBox="0 0 200 200"
  - Ajouter cercle central (stroke blanc, fill none)
  - Ajouter 4 segments colorés (90° chacun) avec paths SVG
  - Utiliser les couleurs de CONFIG.colors.cycle
  - Ajouter labels texte pour chaque phase
  - Ajouter icônes SVG pour chaque phase (optionnel)
  - Rendre responsive avec className et width/height
  - _Requirements: 3.3, Design PhaseWheel Component_

- [~] 13. Créer le service webgl-detector.ts
  - Créer fonction detectWebGL() retournant WebGLCapabilities
  - Créer un canvas temporaire
  - Tester contexte webgl2 puis webgl
  - Détecter version WebGL (1.0 ou 2.0)
  - Extraire maxTextureSize avec gl.getParameter()
  - Retourner { supported: false } si échec
  - Nettoyer le canvas temporaire
  - _Requirements: 5.5, Design webgl-detector Service_

- [~] 14. Créer le service scroll-observer.ts
  - Créer fonction observeScrollAnimations(elements, options)
  - Créer IntersectionObserver avec callback
  - Déclencher classe "animate-in" lors de l'intersection
  - Implémenter stagger de 70ms entre éléments
  - Retourner fonction cleanup pour disconnect()
  - Respecter prefers-reduced-motion
  - _Requirements: 7.1, 7.2, 7.3, Design scroll-observer Service_

- [~] 15. Créer la section Hero (sections/Hero.tsx)
  - Créer structure section avec hauteur 100svh
  - Diviser en deux colonnes (60% Canvas, 40% Texte sur desktop)
  - Stacker verticalement sur mobile (<768px)
  - Ajouter lazy-loading pour HeroCanvas avec React.lazy()
  - Ajouter Suspense avec spinner de chargement
  - Ajouter titre h1 avec police Fraunces
  - Ajouter tagline avec police Figtree
  - Ajouter bouton CTA "Télécharger pour Windows"
  - Lier le bouton à CONFIG.downloads.windows.url
  - Ajouter scroll indicator (flèche vers le bas)
  - _Requirements: 3.2, 8.2, 8.5, 8.7_

- [~] 16. Créer la section CyclePhases (sections/CyclePhases.tsx)
  - Créer structure section avec titre h2
  - Ajouter PhaseWheel centré
  - Créer grille de 4 cartes (2×2 sur desktop, 1 colonne sur mobile)
  - Créer données des 4 phases avec nom, couleur, description, jours
  - Utiliser CONFIG.colors.cycle pour les couleurs
  - Utiliser Card component avec variant "phase"
  - Ajouter animation scroll avec fade-in et translateY
  - Ajouter stagger de 70ms entre les cartes
  - _Requirements: 3.3, 7.1, 7.2, Design CyclePhases Section_

- [~] 17. Créer les données Features (sections/features-data.ts)
  - Créer tableau FEATURES avec les 9 fonctionnalités extraites
  - Feature 1: Suivi du cycle menstruel (col-span-2)
  - Feature 2: Journal quotidien (col-span-1)
  - Feature 3: Suivi corporel (col-span-1)
  - Feature 4: Rappels personnalisés (col-span-1)
  - Feature 5: Dossier médical (col-span-1)
  - Feature 6: Statistiques et graphiques (col-span-2)
  - Feature 7: Assistant IA hors ligne (col-span-1)
  - Feature 8: Encyclopédie médicale (col-span-1)
  - Feature 9: Mode discret avec PIN (col-span-1)
  - Ajouter icônes React (lucide-react recommandé)
  - _Requirements: 10.1 à 10.9, 3.4_

- [~] 18. Créer la section Features (sections/Features.tsx)
  - Créer structure section avec titre h2
  - Créer Bento Grid avec grid CSS
  - Configurer grid responsive (1 col mobile, 2 cols tablet, 3 cols desktop)
  - Implémenter spans dynamiques (col-span-1, col-span-2)
  - Utiliser Card component avec variant "feature"
  - Mapper sur FEATURES data
  - Ajouter animation scroll avec stagger
  - _Requirements: 3.4, 8.4, Design Features Section_

- [~] 19. Créer la section HowItWorks (sections/HowItWorks.tsx)
  - Créer structure section avec titre h2
  - Créer 3 étapes avec numérotation
  - Étape 1: Télécharger l'installeur Windows
  - Étape 2: Exécuter le .exe et suivre l'assistant
  - Étape 3: Lancer Mood Jardin et commencer
  - Ajouter encadré d'aide pour Windows Defender
  - Expliquer "Plus d'infos" → "Exécuter quand même"
  - Ajouter animation scroll avec stagger
  - Utiliser Card component pour l'encadré d'aide
  - _Requirements: 12.1 à 12.7, 3.5_

- [~] 20. Créer la section Privacy (sections/Privacy.tsx)
  - Créer structure section avec titre h2
  - Ajouter bloc "Stockage local uniquement" avec explication localStorage
  - Ajouter bloc "Assistant IA hors ligne" avec explication pas d'API
  - Ajouter bloc "Aucun tracking" avec liste (pas de cookies, analytics, serveur)
  - Ajouter bloc "Code source ouvert" avec lien GitHub
  - Ajouter bloc "Sauvegarde manuelle" avec recommandation export JSON
  - Ajouter warning sur désinstallation = perte données
  - Ajouter lien vers page /confidentialite pour détails
  - Utiliser Card component pour chaque bloc
  - _Requirements: 11.1 à 11.9, 3.6_

- [~] 21. Créer les données FAQ (sections/faq-data.ts)
  - Créer tableau FAQ_ITEMS avec 6 questions/réponses
  - Q1: L'application est-elle gratuite ? (Oui, 100% gratuite, open source)
  - Q2: Mes données sont-elles sécurisées ? (localStorage, aucun serveur)
  - Q3: L'application fonctionne-t-elle sans Internet ? (Oui, 100% offline)
  - Q4: Puis-je exporter mes données ? (Oui, format JSON)
  - Q5: L'application est-elle médicalement certifiée ? (Non, outil bien-être)
  - Q6: Comment contacter le support ? (CONFIG.links.email)
  - _Requirements: 14.1 à 14.6, 14.10_

- [~] 22. Créer la section FAQ (sections/FAQ.tsx)
  - Créer structure section avec titre h2
  - Utiliser Accordion component avec FAQ_ITEMS
  - Ajouter animation scroll
  - _Requirements: 3.7, 14.7_

- [~] 23. Créer la section FinalCTA (sections/FinalCTA.tsx)
  - Créer structure section centrée
  - Ajouter titre h2 accrocheur
  - Ajouter sous-titre avec bénéfices clés
  - Ajouter bouton CTA large "Télécharger pour Windows"
  - Lier à CONFIG.downloads.windows.url
  - Ajouter animation pulse sur le bouton
  - Utiliser Card component avec glassmorphism
  - _Requirements: 3.8, 7.5_

- [~] 24. Checkpoint - Vérifier les sections statiques
  - Lancer `npm run dev` et vérifier que toutes les sections s'affichent
  - Vérifier le responsive sur 360px, 768px, 1024px, 1920px
  - Vérifier que les animations scroll fonctionnent
  - Vérifier que tous les liens de navigation fonctionnent
  - Vérifier que les boutons CTA ouvrent les bons URLs
  - Vérifier l'accessibilité clavier (Tab, Enter)
  - Vérifier les focus visible
  - Corriger les erreurs console s'il y en a
  - _Requirements: 20.1, 20.9, 20.10_

- [~] 25. Créer le composant HeroCanvas (3d/HeroCanvas.tsx)
  - Créer composant avec props (reducedMotion: boolean)
  - Détecter WebGL avec detectWebGL()
  - Retourner WebGLFallback si WebGL non supporté
  - Wrapper Canvas avec ErrorBoundary
  - Configurer Canvas (dpr, camera, gl, frameloop)
  - Adapter dpr selon isMobile (window.innerWidth < 768)
  - Adapter FOV selon isMobile (45 sur mobile, 35 sur desktop)
  - Ajouter Suspense avec fallback spinner
  - Respecter reducedMotion pour frameloop
  - _Requirements: 4.1, 4.14, 4.15, 5.1, 5.5, 8.5_

- [~] 26. Créer le composant WebGLFallback (3d/WebGLFallback.tsx)
  - Créer div avec dimensions identiques au Canvas
  - Ajouter orbe CSS avec dégradé radial
  - Utiliser couleurs from-[#fff4f1]/80 via-[#ff7a9c]/40 to-transparent
  - Ajouter blur-xl pour effet de lueur
  - Ajouter message informatif "WebGL non supporté"
  - Centrer le contenu avec flexbox
  - _Requirements: 5.2, 5.3, 5.4, 20.7_

- [~] 27. Créer le composant Lights (3d/Lights.tsx)
  - Importer Environment et Lightformer de @react-three/drei
  - Configurer Environment avec preset="city" et resolution=256
  - Ajouter Lightformer clé blanche (position [5, 5, -5], scale [3, 5, 1])
  - Ajouter Lightformer bande blanche (position [0, 0, -5], scale [10, 1, 1])
  - Ajouter Lightformer lueur rose (position [-5, 2, 0], color #ff7a9c)
  - Ajouter Lightformer lueur lilas (position [5, -2, 0], color #b79cff)
  - Ajouter Lightformer rebond pêche (position [0, -5, 0], color #ffb38a)
  - Ajouter HemisphereLight (color #fff4f1, groundColor #120912)
  - _Requirements: 4.7, Design Lights Component_

- [~] 28. Créer le composant Rim (3d/Rim.tsx)
  - Créer TorusGeometry (rayon 2.1, épaisseur 0.15, arc Math.PI * 0.8)
  - Positionner avec rotation [0.3, 0, 0] pour arc au-dessus de l'œil
  - Appliquer MeshPhysicalMaterial verre noir
  - Propriétés: color #0a0508, transmission 0.4, opacity 0.6
  - Propriétés: roughness 0, metalness 0, side DoubleSide
  - _Requirements: 4.3, Design Rim Component_

- [~] 29. Créer le composant Eye (3d/Eye.tsx)
  - Créer groupe positionné à [0, 0.15, 1.8]
  - Ajouter sphère sclère blanche (rayon 0.25)
  - Ajouter sphère iris avec scale.x variable (phase de lune)
  - Calculer phase = (time % 28) / 28, phaseScale = lerp(0.3, 1.0, phase)
  - Ajouter sphère pupille noire (rayon 0.06)
  - Ajouter plane paupières pour clignement
  - Implémenter logique de clignement (timer 2.5-6s aléatoire)
  - Implémenter animation clignement (fermeture/réouverture)
  - Implémenter regard suivant curseur (rotation.x, rotation.y)
  - Implémenter regard errant après 3.5s d'inactivité
  - Utiliser useFrame pour animations
  - _Requirements: 4.4, 4.12, 4.13, Design Eye Component_

- [~] 30. Créer le composant Orb (3d/Orb.tsx)
  - Créer groupe pivot pour rotation
  - Ajouter sphère avec sphereGeometry (rayon 2, segments 64×64)
  - Appliquer MeshPhysicalMaterial nacré
  - Propriétés: color #fff4f1, roughness 0.1, metalness 0.05
  - Propriétés: clearcoat 1.0, iridescence 0.8, transmission 0.1
  - Intégrer Rim component
  - Intégrer Eye component
  - Animer flottement vertical: position.y = sin(time * 1.6) * 0.09
  - Utiliser useFrame pour animation
  - _Requirements: 4.2, 4.11, Design Orb Component_

- [~] 31. Créer le composant CycleRing (3d/CycleRing.tsx)
  - Créer groupe avec rotation.x = 18° (inclinaison)
  - Créer 28 billes sur cercle de rayon 3.5
  - Pour chaque bille i: angle = (i / 28) * 2π, position = [cos × 3.5, 0, sin × 3.5]
  - Assigner couleur selon phase (i / 7 → 0-3)
  - Utiliser CONFIG.colors.cycle pour les couleurs
  - Appliquer MeshStandardMaterial avec emissive
  - Animer rotation lente: rotation.y += 0.05 * delta
  - Utiliser useFrame pour animation
  - _Requirements: 4.5, Design CycleRing Component_

- [~] 32. Créer le composant Drops (3d/Drops.tsx)
  - Créer profil de goutte avec points 2D (LatheGeometry)
  - Points: [0,0], [0.3,0.2], [0.4,0.5], [0.3,0.8], [0,1.0]
  - Créer LatheGeometry avec 16 segments
  - Générer 3-5 gouttes avec positions aléatoires
  - Appliquer MeshPhysicalMaterial verre (transmission 0.7)
  - Alterner couleurs #e8587a et #ffb38a
  - Animer flottement indépendant par goutte (userData offset/speed)
  - Utiliser useFrame pour animation
  - _Requirements: 4.6, Design Drops Component_

- [~] 33. Créer le composant Rig (3d/Rig.tsx)
  - Créer hook pour suivre la position de la souris
  - Implémenter lissage exponentiel: smoothing = 1 - pow(0.0025, delta)
  - Calculer targetX = mouse.x * 0.3, targetY = mouse.y * 0.15
  - Animer camera.position.x et camera.position.y vers target
  - Faire regarder la caméra vers [0, 0, 0]
  - Détecter inactivité curseur (3.5s)
  - Retourner à centre si inactif
  - Respecter reducedMotion (pas d'animation si true)
  - Utiliser useFrame pour animation
  - _Requirements: 4.10, 7.8, Design Rig Component_

- [~] 34. Créer le post-processing Bloom
  - Importer EffectComposer et Bloom de @react-three/postprocessing
  - Ajouter EffectComposer après la scène
  - Configurer Bloom avec intensity 0.55
  - Configurer luminanceThreshold 0.92 (seuls les reflets brillent)
  - Configurer luminanceSmoothing 0.9
  - Configurer radius 0.4
  - Activer mipmapBlur pour performance
  - _Requirements: 4.8, Design Post-Processing_

- [~] 35. Intégrer tous les composants 3D dans HeroCanvas
  - Ajouter PerspectiveCamera (fov 35, position [0, 0, 12])
  - Ajouter Lights component
  - Ajouter Orb component (contient Rim et Eye)
  - Ajouter CycleRing component
  - Ajouter Drops component
  - Ajouter Rig component
  - Ajouter EffectComposer avec Bloom
  - Détecter prefers-reduced-motion avec CSS media query
  - Passer reducedMotion aux composants animés
  - _Requirements: 4.1 à 4.15, 7.8_

- [~] 36. Checkpoint - Vérifier la scène 3D
  - Vérifier que la scène 3D s'affiche correctement
  - Vérifier que l'orbe suit le curseur avec lissage
  - Vérifier que l'œil cligne périodiquement
  - Vérifier que l'œil regarde aléatoirement après inactivité
  - Vérifier que le cycle ring tourne lentement
  - Vérifier que les gouttes flottent indépendamment
  - Vérifier que le Bloom fonctionne (reflets brillants)
  - Tester le fallback WebGL (désactiver WebGL dans DevTools)
  - Tester prefers-reduced-motion (DevTools → Rendering)
  - Vérifier l'absence d'erreurs console
  - _Requirements: 20.3, 20.4, 20.5, 20.7, 20.8_

- [~] 37. Créer le Router et les pages (App.tsx)
  - Installer react-router-dom si pas déjà fait
  - Importer BrowserRouter, Routes, Route
  - Créer route "/" pour HomePage
  - Créer route "/confidentialite" pour PrivacyPage
  - Créer route "*" pour NotFoundPage (catch-all)
  - Wrapper l'app avec BrowserRouter
  - Ajouter Navigation et Footer en dehors des routes (persistants)
  - _Requirements: 17.1, 17.2, 17.3, 17.7_

- [~] 38. Créer la page HomePage (pages/HomePage.tsx)
  - Créer composant avec balise main
  - Importer et composer toutes les sections dans l'ordre
  - Hero → CyclePhases → Features → HowItWorks → Privacy → FAQ → FinalCTA
  - Ajouter IDs de section pour navigation (#cycle, #features, #faq)
  - Utiliser balises sémantiques (section avec IDs)
  - Implémenter scroll observer pour animations
  - _Requirements: 3.2 à 3.8, 15.8_

- [~] 39. Créer la page PrivacyPage (pages/PrivacyPage.tsx)
  - Créer composant avec balise main
  - Ajouter titre h1 "Politique de confidentialité"
  - Ajouter introduction sur respect de la vie privée
  - Ajouter section "Stockage des données" (localStorage détaillé)
  - Ajouter section "Assistant IA" (fonctionnement offline)
  - Ajouter section "Aucun tracking" (pas de cookies, analytics)
  - Ajouter section "Code source" (lien GitHub pour transparence)
  - Ajouter section "Vos droits" (export, suppression)
  - Ajouter bouton "Retour à l'accueil" (Link vers /)
  - Utiliser Card component pour chaque section
  - _Requirements: 17.4, 17.6, 11.1 à 11.9_

- [~] 40. Créer la page NotFoundPage (pages/NotFoundPage.tsx)
  - Créer composant avec balise main
  - Ajouter titre h1 "Page introuvable"
  - Ajouter message d'erreur sympathique
  - Ajouter lien de retour à l'accueil (Link vers /)
  - Ajouter suggestions de navigation (liens vers sections)
  - Utiliser Card component pour le contenu
  - _Requirements: 17.3, Design NotFoundPage_

- [~] 41. Implémenter le scroll vers sections
  - Ajouter event listeners sur les liens de navigation
  - Implémenter scrollIntoView avec behavior: 'smooth'
  - Ajuster le scroll offset pour la navigation fixe (top offset)
  - Tester tous les liens de navigation
  - _Requirements: 3.10_

- [~] 42. Implémenter scroll to top sur changement de route
  - Utiliser useEffect avec useLocation de react-router
  - Appeler window.scrollTo(0, 0) au changement de route
  - _Requirements: 17.9_

- [~] 43. Ajouter la gestion prefers-reduced-motion globale
  - Créer hook useReducedMotion avec matchMedia
  - Écouter changement de préférence avec addEventListener
  - Passer reducedMotion à HeroCanvas
  - Désactiver animations Framer Motion si reducedMotion
  - Tester avec DevTools → Rendering → Emulate prefers-reduced-motion
  - _Requirements: 7.7, 7.8, 20.8_

- [~] 44. Optimiser les performances
  - Lazy-load HeroCanvas avec React.lazy()
  - Ajouter Suspense avec fallback spinner
  - Preload Google Fonts dans index.html
  - Ajouter rel="preconnect" pour fonts.googleapis.com
  - Configurer Vite pour code-splitting (vendor chunks)
  - Vérifier que le bundle Three.js est séparé
  - Tester le chargement avec DevTools Network throttling (Fast 3G)
  - _Requirements: 9.2, 9.3, 9.7, 9.8_

- [~] 45. Créer les assets SEO
  - Créer public/favicon.ico (icône simple)
  - Créer public/apple-touch-icon.png (180×180px)
  - Générer public/og.png (1200×630px) avec titre + visuel orbe
  - Créer public/robots.txt (Allow /, Disallow admin, Sitemap URL)
  - Créer public/sitemap.xml avec routes / et /confidentialite
  - _Requirements: 15.6, 18.5, 18.6_

- [~] 46. Ajouter les meta tags SEO dans index.html
  - Ajouter lang="fr" sur la balise html
  - Ajouter title avec CONFIG.seo.title
  - Ajouter meta description avec CONFIG.seo.description
  - Ajouter meta keywords pertinents
  - Ajouter Open Graph tags (og:title, og:description, og:image, og:url, og:type, og:locale)
  - Ajouter Twitter Card tags (twitter:card, twitter:title, twitter:description, twitter:image)
  - Ajouter canonical link vers CONFIG.seo.url
  - Ajouter structured data JSON-LD (SoftwareApplication schema)
  - _Requirements: 15.1 à 15.10_

- [~] 47. Configurer Tailwind avec thème personnalisé
  - Ajouter couleurs personnalisées (aubergine, accent gradient, cycle phases)
  - Ajouter polices personnalisées (Fraunces, Figtree)
  - Configurer breakpoints (xs: 360px, sm, md, lg, xl, 2xl)
  - Configurer focus ring (width, color, offset)
  - Ajouter utilities personnalisés (grain, vignette)
  - _Requirements: 6.1 à 6.8, 8.1, 8.2_

- [~] 48. Implémenter l'accessibilité complète
  - Vérifier contraste de couleur (min 4.5:1) avec outil automatisé
  - Ajouter alt text descriptifs sur toutes les images
  - Vérifier hiérarchie des titres (h1 unique, h2 > h3)
  - Ajouter aria-hidden="true" sur le Canvas 3D
  - Ajouter description textuelle alternative pour la scène 3D (sr-only)
  - Ajouter skip to main content link (sr-only, visible on focus)
  - Vérifier ordre de tabulation logique
  - Vérifier focus visible sur tous les interactifs
  - Tester avec lecteur d'écran (NVDA sur Windows)
  - _Requirements: 16.1 à 16.11_

- [~] 49. Créer vercel.json pour le déploiement
  - Configurer buildCommand: "npm run build"
  - Configurer outputDirectory: "dist"
  - Configurer framework: "vite"
  - Ajouter rewrites SPA (toutes routes vers /index.html)
  - Ajouter headers de sécurité (X-Frame-Options, X-Content-Type-Options, CSP, Referrer-Policy)
  - Ajouter headers de cache pour /assets/* (max-age 31536000, immutable)
  - _Requirements: 18.1, 18.2, 18.3, 18.4, 9.10_

- [~] 50. Créer README.md complet
  - Ajouter titre et description du projet
  - Ajouter screenshot (capture d'écran du site)
  - Ajouter section Technologies (React, TypeScript, Three.js, Tailwind, Vite)
  - Ajouter section Prérequis (Node.js 18+, npm)
  - Ajouter section Installation: `npm install`
  - Ajouter section Développement: `npm run dev`
  - Ajouter section Build: `npm run build`
  - Ajouter section Preview: `npm run preview`
  - Ajouter section Déploiement sur Vercel avec instructions
  - Ajouter section Configuration (src/config.ts)
  - Ajouter section Licence (MIT)
  - _Requirements: 19.5, 19.6, 19.7, 19.8, 19.9_

- [~] 51. Initialiser le dépôt Git
  - Vérifier que .gitignore est complet (node_modules, dist, .env, *.exe, *.msi, *.apk, *.zip)
  - Initialiser git avec `git init` dans le dossier mood-cycle-site
  - Ajouter tous les fichiers avec `git add .`
  - Créer commit initial: "Initial commit: Mood Cycle Landing Site"
  - Vérifier que node_modules et dist ne sont pas commités
  - _Requirements: 19.2, 19.3, 19.10, 19.11_

- [~] 52. Créer le dépôt GitHub public
  - Créer nouveau dépôt public sur GitHub nommé "mood-cycle-site"
  - Ajouter description: "Site vitrine React + Three.js pour l'application Mood Jardin"
  - NE PAS initialiser avec README (déjà créé localement)
  - Copier l'URL du dépôt distant
  - Ajouter remote origin: `git remote add origin <URL>`
  - Push initial: `git push -u origin main`
  - Vérifier que le dépôt est accessible publiquement
  - _Requirements: 19.1, 19.12_

- [~] 53. Tests de performance avec Lighthouse
  - Lancer `npm run build` pour build de production
  - Lancer `npm run preview` pour servir le build
  - Ouvrir Chrome DevTools → Lighthouse
  - Lancer audit mobile avec toutes catégories
  - Vérifier Performance > 90
  - Vérifier Accessibility = 100
  - Vérifier Best Practices > 95
  - Vérifier SEO = 100
  - Corriger les problèmes identifiés si score insuffisant
  - Documenter les résultats
  - _Requirements: 9.1, 20.2_

- [~] 54. Tests responsive sur toutes tailles
  - Tester sur 360×640 (petit mobile)
  - Tester sur 375×667 (iPhone SE)
  - Tester sur 414×896 (iPhone 11)
  - Tester sur 768×1024 (iPad portrait)
  - Tester sur 1024×768 (iPad paysage)
  - Tester sur 1920×1080 (desktop)
  - Vérifier pas de scroll horizontal sur aucune taille
  - Vérifier lisibilité des textes (min 14px)
  - Vérifier zones tactiles minimales 44×44px
  - _Requirements: 8.1 à 8.9, 20.9_

- [~] 55. Tests d'accessibilité automatisés
  - Installer axe DevTools extension Chrome
  - Lancer scan axe sur la page d'accueil
  - Lancer scan axe sur la page confidentialité
  - Corriger toutes les violations critiques
  - Corriger toutes les violations sérieuses
  - Documenter les warnings (si non applicables)
  - _Requirements: 16.1 à 16.11_

- [~] 56. Créer le rapport d'extraction final (EXTRACTION_REPORT.md)
  - Lister URL du dépôt GitHub public créé
  - Lister URL de téléchargement Windows à vérifier/remplacer
  - Lister les affirmations extraites du code (fonctionnalités, localStorage, IA offline)
  - Lister les affirmations à vérifier manuellement (si applicable)
  - Lister les risques potentiels trouvés (avertissements Windows Defender, etc.)
  - Ajouter instructions de déploiement Vercel
  - Ajouter checklist de vérification finale
  - _Requirements: 20.12, 1.1 à 1.10_

- [~] 57. Checkpoint final - Vérification complète
  - Relire le README.md pour clarté
  - Vérifier que CONFIG.downloads.windows.url est correct
  - Vérifier que CONFIG.links.email est correct
  - Vérifier que CONFIG.links.github pointe vers le bon dépôt
  - Vérifier que tous les imports TypeScript sont corrects
  - Vérifier absence d'erreurs TypeScript: `npm run build`
  - Vérifier absence d'erreurs ESLint: `npm run lint` (si configuré)
  - Vérifier que le site fonctionne en production: `npm run preview`
  - Vérifier que le dépôt GitHub est public et accessible
  - Créer tag git v1.0.0: `git tag v1.0.0 && git push origin v1.0.0`
  - _Requirements: 20.1 à 20.11_

## Notes

- **Langage d'implémentation** : TypeScript (choisi par l'utilisateur)
- **Ordre recommandé** : Suivre la numérotation pour les dépendances, mais les tâches 3D (27-34) peuvent être développées en parallèle après la tâche 25
- **Checkpoints critiques** : Tâches 24, 36, 57 pour validation incrémentale
- **Configuration centrale** : src/config.ts est la seule source de vérité pour URLs et constantes
- **Extraction de données** : Tâche 2 doit être complétée avant la tâche 17 (features data)
- **Tests** : Aucun test unitaire n'est requis (site vitrine UI/rendering), focus sur Lighthouse et accessibilité
- **Déploiement** : L'utilisateur déploiera manuellement sur Vercel après réception du dépôt GitHub
- **Dépôt temporaire** : Le clone de l'app sera supprimé après extraction (tâche 2)
- **Binaires exclus** : Aucun fichier .exe, .msi, .apk, .zip ne doit être commité

## Task Dependency Graph

```json
{
  "waves": [
    {
      "id": 0,
      "tasks": ["1"]
    },
    {
      "id": 1,
      "tasks": ["2", "3", "4", "5"]
    },
    {
      "id": 2,
      "tasks": ["6", "7", "8", "9", "10", "11", "12", "13", "14"]
    },
    {
      "id": 3,
      "tasks": ["15", "16", "17", "19", "20", "21", "25", "26"]
    },
    {
      "id": 4,
      "tasks": ["18", "22", "23", "27", "28", "29", "30", "31", "32", "33", "34"]
    },
    {
      "id": 5,
      "tasks": ["24", "35", "37", "38", "39", "40"]
    },
    {
      "id": 6,
      "tasks": ["36", "41", "42", "43", "44", "45", "46", "47", "48", "49", "50"]
    },
    {
      "id": 7,
      "tasks": ["51", "52"]
    },
    {
      "id": 8,
      "tasks": ["53", "54", "55", "56"]
    },
    {
      "id": 9,
      "tasks": ["57"]
    }
  ]
}
```
