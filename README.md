# Portfolio BTS SIO - Maksene Dalil

## 📁 Structure du Projet

```
portfolio/
│
├── index.html              # Page d'accueil avec modal RPG interactif
├── certifications.html     # Page des certifications et formations
├── style.css              # Feuille de style globale (réutilisable)
├── main.js                # Script principal avec animations (réutilisable)
└── README.md              # Ce fichier
```

## 🎨 Design

Le portfolio utilise un thème **RPG/Gaming rétro** avec :
- Police principale : Press Start 2P (pixel style)
- Palette de couleurs : tons chauds (marron, or, cuivre)
- Animations fluides et effets interactifs
- Particules au clic et trail du curseur

## ✨ Fonctionnalités

### Page d'accueil (index.html)
- Modal d'introduction RPG avec système de questions/réponses
- Timeline interactive du parcours
- Barres de progression animées pour les compétences
- Formulaire de contact avec mailto
- Animations au scroll

### Page Certifications (certifications.html)
- Cartes de certifications avec animations au survol
- Distinction visuelle entre certifications complétées et en cours
- Barres de progression pour les formations en cours
- Tags de compétences interactifs
- Section "Pourquoi ces certifications ?"

## 🚀 Réutilisation du CSS

Le fichier `style.css` contient tous les styles réutilisables :
- Styles de base (reset, typographie, couleurs)
- Composants (cartes, boutons, formulaires)
- Animations (fadeIn, slideIn, float, glow, etc.)
- Layout (header, hero, sections, footer)
- Styles spécifiques certifications

Pour créer une nouvelle page :
1. Inclure `<link rel="stylesheet" href="style.css">`
2. Utiliser les classes existantes (card, animate-on-scroll, etc.)
3. Ajouter des styles spécifiques si nécessaire

## 🎯 Classes CSS Principales

### Layout
- `.stone-bg` : Fond avec texture de pierre
- `.hero` : Section d'en-tête avec dégradé
- `.section-title` : Titre de section avec bordures

### Composants
- `.card` : Carte de contenu standard
- `.cert-card` : Carte spéciale pour certifications
- `.skill-bar` : Barre de progression de compétence
- `.timeline` : Timeline verticale

### Animations
- `.animate-on-scroll` : Animation au défilement
- `.visible` : Classe ajoutée quand visible
- Diverses keyframes : fadeIn, slideInLeft, float, glow, etc.

### États
- `.status-completed` : Badge vert pour complété
- `.status-in-progress` : Badge doré pour en cours
- `.hidden` : Masque un élément

## 📱 Responsive

Le design est responsive avec breakpoint à 768px :
- Navigation adaptative
- Grilles flexibles
- Tailles de police ajustées
- Timeline verticale sur mobile

## 🔧 JavaScript

Le fichier `main.js` contient :
- Effet de particules au clic
- Trail du curseur
- Observer pour animations au scroll
- Animation des barres de progression
- Smooth scroll pour navigation

## 🎮 Animations Spéciales

- **Particules au clic** : 8 particules colorées à chaque clic
- **Trail du curseur** : Points qui suivent le curseur
- **Cartes flottantes** : Animation de lévitation douce
- **Icônes rotatives** : Rotation continue sur les certifications
- **Effets de brillance** : Glows pulsants sur éléments importants

## 📝 Pages à Créer

Vous pouvez créer les pages suivantes en réutilisant le même système :
- `veille.html` : Veille technologique
- `projets.html` : Portfolio de projets
- `stages.html` : Expériences de stage

Chaque page devrait :
1. Inclure `style.css` et `main.js`
2. Utiliser le même header/footer
3. Utiliser les classes `.animate-on-scroll` pour les animations
4. Suivre la même structure de sections

## 🎨 Personnalisation

Pour modifier le thème :
- Couleurs : Variables CSS dans `:root` (à ajouter pour facilité)
- Animations : Modifier les @keyframes dans style.css
- Effets : Ajuster les paramètres dans main.js

## 📧 Contact

Email : eportfolio.dalil.maksene@gmail.com

---

**Développé avec passion ⚔️**
