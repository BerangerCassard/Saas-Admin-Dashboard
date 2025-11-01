# SaaS Admin Dashboard

Un tableau de bord d'administration moderne et complet pour la gestion d'une application SaaS (Software as a Service).

## 🚀 Fonctionnalités

### Vue d'ensemble (Overview)
- **Indicateurs KPI clés** : Suivi du MRR (Monthly Recurring Revenue), utilisateurs actifs, taux de conversion et taux d'attrition
- **Graphiques interactifs** :
  - Évolution du MRR (revenu récurrent mensuel) avec visualisation des nouveaux MRR, expansions et churn
  - Croissance des utilisateurs par plan (Free, Trial, Basic, Pro, Enterprise)
  - Revenus générés par plan
- **Tableau des abonnements récents** : Liste des dernières souscriptions avec statut, montant et date

### Gestion des clients (Customers)
- **Liste complète des clients** avec pagination (20 clients par page)
- **Recherche avancée** : Recherche par nom, email ou entreprise
- **Filtres multiples** :
  - Filtrage par plan (Free, Basic, Pro, Enterprise)
  - Filtrage par statut (Active, Trial, Canceled, Past Due, Churned)
- **Informations détaillées** : MRR, date d'inscription, entreprise, segment
- **Indicateurs de risque** : Badges de risque d'attrition (High/Medium Risk)
- **Actions rapides** : Accès rapide aux emails et détails clients

### Abonnements (Subscriptions)
- Visualisation et gestion de tous les abonnements actifs
- Informations sur les cycles de facturation (mensuel/annuel)
- Suivi des dates de paiement

### Analytics
- **Acquisition** :
  - Entonnoir de conversion (Visitors → Signups → Trials → Paid)
  - Sources de trafic (Organique, Payant, Référence, Direct)
- **Engagement** :
  - Métriques DAU/MAU (Daily/Monthly Active Users)
  - Utilisation des fonctionnalités
- **Rétention** :
  - Analyse de cohortes avec tableau de rétention mois par mois
  - Taux d'attrition par plan

### Paramètres (Settings)
- Configuration de l'application

## 🛠️ Technologies utilisées

- **React 18** : Bibliothèque JavaScript pour l'interface utilisateur
- **TypeScript** : Typage statique pour JavaScript
- **React Router DOM** : Routage côté client
- **Recharts** : Bibliothèque de graphiques pour React
- **Tailwind CSS** : Framework CSS utilitaire
- **Vite** : Build tool moderne et rapide
- **Lucide React** : Icônes SVG
- **date-fns** : Manipulation de dates
- **Supabase** : Backend as a Service (prêt pour intégration)

## 📦 Installation

1. **Cloner le repository** (si applicable) ou naviguer vers le dossier du projet

2. **Installer les dépendances** :
```bash
npm install
```

3. **Lancer le serveur de développement** :
```bash
npm run dev
```

L'application sera accessible à l'adresse `http://localhost:5173` (ou un autre port si celui-ci est occupé).

## 🏗️ Structure du projet

```
src/
├── components/          # Composants réutilisables
│   ├── Badge.tsx       # Badge pour afficher des statuts
│   ├── Button.tsx      # Bouton personnalisable
│   ├── Card.tsx       # Carte conteneur
│   ├── Header.tsx     # En-tête de l'application
│   ├── Input.tsx      # Champ de saisie
│   ├── KPICard.tsx    # Carte d'indicateur KPI
│   ├── Layout.tsx     # Layout principal avec sidebar
│   └── Sidebar.tsx    # Barre latérale de navigation
├── pages/             # Pages de l'application
│   ├── Overview.tsx   # Page d'accueil
│   ├── Customers.tsx  # Gestion des clients
│   ├── Subscriptions.tsx # Gestion des abonnements
│   ├── Analytics.tsx  # Page d'analyses
│   └── Settings.tsx   # Paramètres
├── data/              # Données mockées
│   └── mockData.ts   # Générateur de données de démonstration
├── types/             # Définitions TypeScript
│   └── index.ts      # Types et interfaces
├── App.tsx            # Composant racine avec routage
└── main.tsx           # Point d'entrée de l'application
```

## 📊 Données

L'application utilise actuellement des **données mockées** générées dynamiquement dans `src/data/mockData.ts`. Ces données incluent :
- 120 clients générés aléatoirement
- Abonnements associés
- Métriques KPI
- Données de graphiques (MRR, croissance utilisateurs, etc.)
- Sources d'acquisition
- Analyses de cohortes

**Note** : Pour une utilisation en production, vous devrez remplacer ces données mockées par des appels API réels (par exemple, via Supabase).

## 🎨 Personnalisation

### Couleurs et styles
L'application utilise Tailwind CSS avec une palette de couleurs personnalisable via `tailwind.config.js`.

### Plans de tarification
Les prix des plans sont définis dans `src/data/mockData.ts` :
- Free : $0
- Basic : $29/mois
- Pro : $79/mois
- Enterprise : $299/mois

## 📝 Scripts disponibles

- `npm run dev` : Lance le serveur de développement
- `npm run build` : Compile l'application pour la production
- `npm run preview` : Prévisualise la build de production
- `npm run lint` : Lance le linter ESLint
- `npm run typecheck` : Vérifie les types TypeScript

## 🔧 Configuration

### TypeScript
La configuration TypeScript est définie dans :
- `tsconfig.json` : Configuration principale
- `tsconfig.app.json` : Configuration pour l'application
- `tsconfig.node.json` : Configuration pour Node.js

### Linting
- **ESLint** : Configuration dans `eslint.config.js`
- **Biome** : Configuration dans `biome.json` (alternative à ESLint)

## 🚀 Déploiement

Pour déployer l'application :

1. **Construire l'application** :
```bash
npm run build
```

2. Le dossier `dist/` contiendra tous les fichiers statiques prêts à être déployés sur n'importe quel hébergeur statique (Netlify, Vercel, GitHub Pages, etc.).

## 📄 Licence

Ce projet est privé et destiné à un usage interne.

## 👥 Contribution

Pour contribuer au projet, veuillez créer une branche pour votre fonctionnalité et soumettre une pull request.

---

**Version** : 1.0.0
