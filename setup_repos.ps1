# ==============================================================================
# SCRIPT D'INITIALISATION ET DÉPLOIEMENT GITHUB - MARTIN AHOUETOGNON
# Email : ahouetognonmartin@gmail.com
# ==============================================================================

Write-Host "==========================================================" -ForegroundColor Cyan
Write-Host " Configuration Git pour Martin AHOUETOGNON" -ForegroundColor Green
Write-Host "==========================================================" -ForegroundColor Cyan

# 1. Configuration globale de l'identité Git
git config --global user.name "Martin AHOUETOGNON"
git config --global user.email "ahouetognonmartin@gmail.com"
git config --global init.defaultBranch main

Write-Host "Identité Git configurée :" -ForegroundColor Yellow
Write-Host "• Nom   : Martin AHOUETOGNON"
Write-Host "• Email : ahouetognonmartin@gmail.com"
Write-Host "• Branche par défaut : main"

# 2. Initialisation du dépôt principal (Portfolio Hub / GitHub Pages)
Write-Host "`nInitialisation du dépôt principal pour GitHub Pages..." -ForegroundColor Cyan
if (-not (Test-Path ".git")) {
    git init
    git add .
    git commit -m "feat: initial commit - Portfolio Showcase Hub (Data Science, Data Engineering, Data Analytics)"
    git branch -M main
    Write-Host "✅ Dépôt local principal initialisé avec succès !" -ForegroundColor Green
} else {
    git add .
    git commit -m "update: refresh portfolio showcases and project READMEs" -ErrorAction SilentlyContinue
    Write-Host "✅ Dépôt local principal mis à jour !" -ForegroundColor Green
}

Write-Host "`n----------------------------------------------------------" -ForegroundColor Cyan
Write-Host "ÉTAPES SUIVANTES POUR PUBLIER SUR GITHUB PAGES :" -ForegroundColor Yellow
Write-Host "----------------------------------------------------------" -ForegroundColor Cyan
Write-Host "1. Rendez-vous sur https://github.com/new"
Write-Host "2. Créez un nouveau dépôt public nommé :"
Write-Host "   -> Option A (Recommandée) : 'mon-portfolio' (ou votre-username.github.io)"
Write-Host "3. Liez ce dépôt local à votre GitHub avec les commandes :"
Write-Host "   git remote add origin https://github.com/VOTRE_USERNAME/mon-portfolio.git"
Write-Host "   git push -u origin main"
Write-Host "4. Dans GitHub -> Settings -> Pages :"
Write-Host "   • Source : Deploy from a branch"
Write-Host "   • Branch : main / (root)"
Write-Host "   • Cliquez sur 'Save' !"
Write-Host "==========================================================" -ForegroundColor Cyan
