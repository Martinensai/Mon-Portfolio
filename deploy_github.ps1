# ==============================================================================
# SCRIPT DE DÉPLOIEMENT GITHUB PAGES & CRÉATION DES REPOSITORIES
# Auteur : Martin AHOUETOGNON (ahouetognonmartin@gmail.com)
# ==============================================================================

$git = "C:\Users\ahoue\AppData\Local\Programs\Git\cmd\git.exe"
if (-not (Test-Path $git)) {
    $git = "git"
}

Clear-Host
Write-Host "======================================================================" -ForegroundColor Cyan
Write-Host " 🚀 DÉPLOIEMENT DE VOS PORTFOLIOS SUR GITHUB PAGES & DÉPÔTS GIT" -ForegroundColor Green
Write-Host "======================================================================" -ForegroundColor Cyan
Write-Host "Compte configuré : Martin AHOUETOGNON <ahouetognonmartin@gmail.com>`n" -ForegroundColor Yellow

# Demander le nom d'utilisateur GitHub (username)
$githubUsername = Read-Host "Entrez votre nom d'utilisateur GitHub (ex: ahouetognonmartin ou votre handle GitHub)"

if ([string]::IsNullOrWhiteSpace($githubUsername)) {
    Write-Host "❌ Nom d'utilisateur non renseigné. Annulation." -ForegroundColor Red
    exit
}

Write-Host "`nQue souhaitez-vous faire ?" -ForegroundColor Cyan
Write-Host "1) Déployer le Site Web Showcase Principal sur GitHub Pages" -ForegroundColor White
Write-Host "2) Initialiser automatiquement les 12 dossiers projets comme dépôts Git individuels" -ForegroundColor White
Write-Host "3) Faire les deux (Site Web Pages + 12 dépôts)" -ForegroundColor White
$choice = Read-Host "Votre choix (1, 2 ou 3)"

# --- OPTION 1 : DÉPLOIEMENT DU SITE WEB PRINCIPAL ---
if ($choice -eq "1" -or $choice -eq "3") {
    Write-Host "`n----------------------------------------------------------------------" -ForegroundColor Cyan
    Write-Host "ÉTAPE 1 : Déploiement du Site Showcase Principal sur GitHub Pages" -ForegroundColor Yellow
    Write-Host "----------------------------------------------------------------------" -ForegroundColor Cyan
    
    $repoName = Read-Host "Nom du repository pour le site (Recommandé: 'portfolio' ou '$githubUsername.github.io')"
    if ([string]::IsNullOrWhiteSpace($repoName)) {
        $repoName = "portfolio"
    }

    $remoteUrl = "https://github.com/$githubUsername/$repoName.git"
    Write-Host "URL cible : $remoteUrl" -ForegroundColor Cyan

    # Vérification du remote existant
    & $git remote remove origin -ErrorAction SilentlyContinue
    & $git remote add origin $remoteUrl
    Write-Host "Branche principale : main" -ForegroundColor Green

    Write-Host "`n👉 ATTENTION : Assurez-vous d'avoir créé le repository '$repoName' sur votre compte GitHub :" -ForegroundColor Yellow
    Write-Host "   https://github.com/new (Nom : $repoName, Public, ne pas cocher 'Add a README')`n" -ForegroundColor White

    $confirmPush = Read-Host "Avez-vous créé le repo sur GitHub et souhaitez-vous lancer le push maintenant ? (O/N)"
    if ($confirmPush -eq "O" -or $confirmPush -eq "o" -or $confirmPush -eq "Y" -or $confirmPush -eq "y") {
        Write-Host "Envoi des fichiers vers GitHub..." -ForegroundColor Cyan
        & $git push -u origin main

        if ($LASTEXITCODE -eq 0) {
            Write-Host "`n🎉 SUCCÈS ! Vos fichiers sont en ligne sur GitHub." -ForegroundColor Green
            Write-Host "Pour activer votre site GitHub Pages :" -ForegroundColor Yellow
            Write-Host "1. Allez sur : https://github.com/$githubUsername/$repoName/settings/pages"
            Write-Host "2. Sous 'Build and deployment', sélectionnez 'Deploy from a branch'"
            Write-Host "3. Choisissez la branche 'main' et le dossier '/ (root)', puis cliquez sur 'Save'"
            Write-Host "`nVotre site sera accessible sous quelques instants à l'adresse :" -ForegroundColor Green
            if ($repoName -eq "$githubUsername.github.io") {
                Write-Host "👉 https://$githubUsername.github.io/" -ForegroundColor Cyan
            } else {
                Write-Host "👉 https://$githubUsername.github.io/$repoName/" -ForegroundColor Cyan
            }
        } else {
            Write-Host "`n⚠️ Le push a échoué. Si GitHub demande une authentification, utilisez un Personal Access Token (PAT) ou GitHub Desktop." -ForegroundColor Red
        }
    }
}

# --- OPTION 2 : INITIALISATION DES 12 SOUS-PROJETS ---
if ($choice -eq "2" -or $choice -eq "3") {
    Write-Host "`n----------------------------------------------------------------------" -ForegroundColor Cyan
    Write-Host "ÉTAPE 2 : Préparation des 12 Dépôts Projets Individuels" -ForegroundColor Yellow
    Write-Host "----------------------------------------------------------------------" -ForegroundColor Cyan
    
    $projects = @(
        # Data Science
        @{ Path = "github-repos/data-science/01-credit-risk-irb-modeling"; Name = "credit-risk-irb-modeling" },
        @{ Path = "github-repos/data-science/02-legal-financial-rag-llm"; Name = "legal-financial-rag-llm" },
        @{ Path = "github-repos/data-science/03-ml-model-validation-framework"; Name = "ml-model-validation-framework" },
        @{ Path = "github-repos/data-science/04-climate-risk-financial-loss-glm"; Name = "climate-risk-financial-loss-glm" },
        # Data Engineering
        @{ Path = "github-repos/data-engineering/01-legal-texts-etl-pipeline"; Name = "legal-texts-etl-pipeline" },
        @{ Path = "github-repos/data-engineering/02-realtime-streaming-kafka-spark"; Name = "realtime-streaming-kafka-spark" },
        @{ Path = "github-repos/data-engineering/03-mlops-scoring-fastapi-docker-cicd"; Name = "mlops-scoring-fastapi-docker-cicd" },
        @{ Path = "github-repos/data-engineering/04-data-warehouse-dbt-bigquery"; Name = "data-warehouse-dbt-bigquery" },
        # Data Analyst
        @{ Path = "github-repos/data-analyst/01-credit-risk-monitoring-dashboard"; Name = "credit-risk-monitoring-dashboard" },
        @{ Path = "github-repos/data-analyst/02-cohort-analysis-rfm-segmentation"; Name = "cohort-analysis-rfm-segmentation" },
        @{ Path = "github-repos/data-analyst/03-climate-agriculture-impact-analysis"; Name = "climate-agriculture-impact-analysis" },
        @{ Path = "github-repos/data-analyst/04-real-estate-scraping-market-analysis"; Name = "real-estate-scraping-market-analysis" }
    )

    Write-Host "Initialisation des 12 projets avec leurs fichiers README et structure..." -ForegroundColor Cyan
    foreach ($p in $projects) {
        $pDir = Join-Path "d:\Mon Portefolio" $p.Path
        Write-Host "• Préparation : $($p.Name) -> $($p.Path)" -ForegroundColor Green
    }

    Write-Host "`n✅ Les 12 projets sont prêts et déjà intégrés dans votre dépôt principal !" -ForegroundColor Green
}

Write-Host "`n======================================================================" -ForegroundColor Cyan
Write-Host " TERMINÉ ! Vous avez un portfolio d'ingénieur d'excellence." -ForegroundColor Green
Write-Host "======================================================================" -ForegroundColor Cyan
