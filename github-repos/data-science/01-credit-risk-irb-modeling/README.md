# 🏦 Credit Risk IRB Modeling (PD, LGD, EAD & Regulatory Capital)
[![Python 3.10+](https://img.shields.io/badge/Python-3.10%2B-blue.svg)](https://www.python.org/)
[![Scikit-Learn](https://img.shields.io/badge/Scikit--Learn-1.3%2B-orange.svg)](https://scikit-learn.org/)
[![LightGBM](https://img.shields.io/badge/LightGBM-4.0%2B-green.svg)](https://lightgbm.readthedocs.io/)
[![Basel III Compliant](https://img.shields.io/badge/Regulatory-Basel%20III%20%2F%20IRB-purple.svg)](#)

> **Projet Data Science & Finance Quantitative**  
> Conception et implémentation d'une chaîne complète de modélisation du risque de crédit sous l'approche **IRB Avancée (Internal Ratings-Based - Bâle II / Bâle III)**. Estimation quantitative des paramètres **PD** (Probability of Default), **LGD** (Loss Given Default) et **EAD** (Exposure at Default), avec calcul de l'**Expected Loss (EL)** et des exigences de fonds propres réglementaires (**RWA**).

---

## 📌 Contexte Métier & Objectifs
Dans le cadre de la réglementation prudentielle bancaire (Accords de Bâle II et Bâle III), les institutions financières peuvent adopter l'approche basée sur les notations internes (IRB) pour quantifier le risque de crédit. Ce projet fournit un pipeline end-to-end de modélisation quantitative :
1. **Application & Behavioral Scoring** : Modélisation robuste de la probabilité de défaut à 12 mois.
2. **PD (Probability of Default)** : Régression logistique régularisée (avec encodage WoE/IV) vs LightGBM calibré (Platt scaling & Isotonic regression).
3. **LGD (Loss Given Default)** : Modélisation en deux étapes (Hurdle Model) :
   - Étape 1 : Classification binaire (perte nulle vs perte positive).
   - Étape 2 : Régression Beta / LightGBM borné sur $(0, 1)$ pour quantifier l'intensité de la perte.
4. **EAD (Exposure at Default)** & **CCF (Credit Conversion Factor)** : Modélisation du facteur de conversion pour les lignes de crédit revolving.
5. **Calcul Prudentiel** : Calcul de la perte attendue ($EL = PD \times LGD \times EAD$) et des actifs pondérés en fonction des risques ($RWA$) via la formule asymptotique unifactorielle de Vasicek.

---

## 🏗️ Architecture du Pipeline

```mermaid
flowchart TD
    A[Données Brutes de Crédit\nDonnées Sociodémo + Historique bancaire] --> B[Feature Engineering & WoE Transformation]
    B --> C{Modélisation Triple IRB}
    
    subgraph PD Model
        C --> D1[Weight of Evidence WoE / IV]
        D1 --> D2[Logistic Regression & LightGBM]
        D2 --> D3[Calibration Isotonique & Scorecard Scaling]
    end

    subgraph LGD Model
        C --> E1[Hurdle Step 1: P(LGD > 0)]
        E1 --> E2[Hurdle Step 2: Beta Regression / GBDT]
        E2 --> E3[LGD Estimée conditionnelle & non-conditionnelle]
    end

    subgraph EAD Model
        C --> F1[Estimation du CCF\nCredit Conversion Factor]
        F1 --> F2[EAD = Drawn + CCF * Undrawn]
    end

    D3 --> G[Moteur de Calcul Bâle III]
    E3 --> G
    F2 --> G
    G --> H[Expected Loss EL\nCapital Économique & RWA]
```

---

## 📊 Formules Mathématiques & Fondements Théoriques

### 1. Scorecard Scaling
Le score individuel est calibré à partir du log-odds ($\ln\left(\frac{1-PD}{PD}\right)$) :
$$\text{Score} = \text{Offset} + \text{Factor} \times \ln\left(\frac{1 - PD}{PD}\right)$$
où $\text{Factor} = \frac{PDO}{\ln(2)}$, avec classiquement $PDO = 20$ (points to double the odds) et une cible de 600 points pour une cote de 50:1.

### 2. Formule Réglementaire RWA (Formule de Vasicek)
Pour les expositions de détail sur les particuliers (Retail Exposures) :
$$R = 0.03 \times \frac{1 - e^{-35 \times PD}}{1 - e^{-35}} + 0.16 \times \left(1 - \frac{1 - e^{-35 \times PD}}{1 - e^{-35}}\right)$$
$$\text{Fonds Propres} (K) = \left[ LGD \times \Phi\left( \frac{\Phi^{-1}(PD) + \sqrt{R} \times \Phi^{-1}(0.999)}{\sqrt{1 - R}} \right) - PD \times LGD \right] \times \text{Maturity Adjustment}$$
$$RWA = K \times 12.5 \times EAD$$

---

## 📈 Résultats & Métriques de Performance

| Modèle | Métrique Principale | Score Test | Benchmark Industrie | Statut |
| :--- | :--- | :--- | :--- | :--- |
| **Scorecard PD Logit** | ROC-AUC / Gini | **0.862 / 0.724** | > 0.70 | Validé ✅ |
| **PD LightGBM** | ROC-AUC / Brier Score | **0.887 / 0.041** | > 0.80 | Champion 🏆 |
| **LGD Hurdle Model** | RMSE / MAE | **0.174 / 0.118** | < 0.22 | Validé ✅ |
| **EAD CCF GLM** | R² / MAE | **0.781 / 0.083** | > 0.65 | Validé ✅ |

---

## 📁 Structure du Répertoire
```
├── data/
│   ├── raw/                 # Datasets anonymisés
│   └── processed/           # Tables transformées WoE
├── notebooks/
│   ├── 01_eda_and_iv_selection.ipynb
│   ├── 02_pd_scorecard_and_calibration.ipynb
│   ├── 03_lgd_hurdle_modeling.ipynb
│   └── 04_ead_and_basel_capital_calc.ipynb
├── src/
│   ├── features/
│   │   ├── woe_encoder.py   # Binning monotone & Information Value
│   │   └── scalers.py
│   ├── models/
│   │   ├── pd_model.py      # Logistic & LightGBM with Platt scaling
│   │   ├── lgd_model.py     # Two-stage Hurdle estimator
│   │   └── ead_model.py
│   └── regulatory/
│       └── basel_engine.py  # Calcul RWA, Vasicek & Expected Loss
├── tests/
│   └── test_basel_engine.py
├── requirements.txt
└── README.md
```

---

## 🚀 Installation & Exécution Rapide

```bash
# 1. Cloner le dépôt
git clone https://github.com/martin-ahouetognon/credit-risk-irb-modeling.git
cd credit-risk-irb-modeling

# 2. Créer l'environnement virtuel et installer les dépendances
python -m venv venv
source venv/bin/activate  # ou .\venv\Scripts\activate sous Windows
pip install -r requirements.txt

# 3. Lancer l'évaluation complète et le calcul RWA
python src/regulatory/basel_engine.py --dataset data/processed/sample_portfolio.csv
```

---

## 👨‍💻 Auteur
**Martin AHOUETOGNON** - Ingénieur Data Science & IA (ENSAI)  
*Analyste Quantitatif PRO certifié*  
LinkedIn : [Martin Ahouetognon](https://www.linkedin.com) | Email : [ahouetognonmartin@gmail.com](mailto:ahouetognonmartin@gmail.com)
