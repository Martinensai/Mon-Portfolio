# 🚀 Guide de Déploiement : GitHub Pages & Repositories Git
**Martin AHOUETOGNON | Ingénieur Data Science & IA (ENSAI)**  
Email configuré : `ahouetognonmartin@gmail.com`

---

## 📋 Ce qui a été préparé et validé sur votre machine

1. ✅ **Installation de Git** : MinGit configuré dans votre profil utilisateur et ajouté à votre PATH.
2. ✅ **Identité Git configurée** :
   - Nom d'utilisateur : `Martin AHOUETOGNON`
   - Email : `ahouetognonmartin@gmail.com`
   - Branche par défaut : `main`
3. ✅ **Dépôt Git local initialisé** dans `d:\Mon Portfolio` avec un commit initial complet regroupant :
   - Le site web vitrine interactif ([index.html](index.html))
   - Les feuilles de style et design system ([styles/main.css](styles/main.css), [styles/components.css](styles/components.css))
   - Les 3 simulateurs interactifs en JavaScript ([scripts/simulators.js](scripts/simulators.js), [scripts/app.js](scripts/app.js))
   - Les 12 READMEs techniques détaillés dans [github-repos/](github-repos/)
   - Le README de profil personnel [github-repos/PROFILE_README.md](github-repos/PROFILE_README.md)

---

## 🌐 Méthode Simple : Publier sur GitHub Pages en 3 étapes

### Étape 1 : Créer le dépôt sur GitHub
1. Connectez-vous sur votre compte GitHub (associé à `ahouetognonmartin@gmail.com`).
2. Rendez-vous sur : **[https://github.com/new](https://github.com/new)**
3. Renseignez :
   - **Repository name** : `portfolio` (ou `mon-portfolio`, ou `votre-nom-utilisateur.github.io`)
   - **Visibility** : **Public**
   - ⚠️ **Laissez décochées** les cases "Add a README file", ".gitignore" et "license" (car tout est déjà prêt en local).
4. Cliquez sur **Create repository**.

---

### Étape 2 : Envoyer votre code sur GitHub (Push)

Ouvrez un terminal PowerShell dans `d:\Mon Portfolio` (ou utilisez le script automatisé `deploy_github.ps1`) et tapez :

```powershell
# Remplacez <VOTRE_USERNAME_GITHUB> par votre identifiant GitHub réel :
git remote add origin https://github.com/<VOTRE_USERNAME_GITHUB>/portfolio.git

# Envoi de la branche main vers GitHub :
git push -u origin main
```

*(Si GitHub vous demande une authentification, connectez-vous via votre navigateur ou utilisez un Personal Access Token).*

---

### Étape 3 : Activer l'hébergement gratuit GitHub Pages

1. Sur la page de votre repository GitHub, cliquez sur l'onglet **Settings** (⚙️ Paramètres en haut à droite).
2. Dans le menu de gauche, cliquez sur **Pages**.
3. Sous la section **Build and deployment** :
   - **Source** : Sélectionnez **Deploy from a branch**
   - **Branch** : Choisissez **main** et le dossier **/ (root)**
4. Cliquez sur **Save**.

🎉 **Votre site web sera en ligne sous 1 à 2 minutes à l'adresse :**  
`https://<VOTRE_USERNAME_GITHUB>.github.io/portfolio/`

---

## ⭐ Activer la Page Spéciale de Profil GitHub

Sur GitHub, vous pouvez afficher une page d'accueil de profil remarquable qui impressionne les recruteurs :
1. Allez sur **[https://github.com/new](https://github.com/new)**
2. Nommez le repository **exactement comme votre nom d'utilisateur GitHub** (ex: si votre pseudo est `martin-ahouetognon`, nommez le repo `martin-ahouetognon`).
3. GitHub vous indiquera : *"You found a secret! This repository is a special repository to add a README.md to your profile"*.
4. Cochez **Public** et créez-le.
5. Copiez-y le contenu du fichier [github-repos/PROFILE_README.md](github-repos/PROFILE_README.md) que nous avons préparé : il contient la table comparative de vos 3 spécialités, les liens vers vos projets et les badges de vos diplômes (ENSAI, ENEAM, Nexialog, Crédit Logement).

---

## 🛠️ Outil d'automatisation inclus

Vous disposez également d'un script interactif prêt à l'emploi :
Double-cliquez sur `deploy_github.ps1` (ou lancez `.\deploy_github.ps1` dans PowerShell) pour être guidé pas-à-pas.
