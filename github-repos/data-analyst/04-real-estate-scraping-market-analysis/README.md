# 🏠 Real Estate Web Scraping & Market Yield Analysis (Python, BeautifulSoup & Plotly)
[![Python 3.10+](https://img.shields.io/badge/Python-3.10%2B-blue.svg)](https://www.python.org/)
[![Scraping](https://img.shields.io/badge/Scraping-BeautifulSoup%20%26%20Playwright-yellow.svg)](https://www.crummy.com/software/BeautifulSoup/)
[![Plotly](https://img.shields.io/badge/Plotly-Interactive%20Charts-3F4F75.svg?logo=plotly)](https://plotly.com/)
[![GeoAnalytics](https://img.shields.io/badge/GeoAnalytics-OpenStreetMap%20Overpass-green.svg)](#)

> **Projet Data Analytics & Économie Immobilière**  
> Pipeline automatisé de **collecte de données par web scraping**, nettoyage statistique et modélisation de la **rentabilité locative brute et nette** du marché immobilier résidentiel. Croisement avec les données d'accessibilité aux transports publics (OpenStreetMap) et détection des opportunités d'investissement à fort rendement.

---

## 📌 Contexte & Problématique Investisseur
Sur le marché de l'immobilier, identifier les biens sous-évalués ou présentant un potentiel de rendement locatif élevé nécessite d'analyser en temps réel des milliers d'annonces tout en tenant compte des caractéristiques micro-géographiques (proximité du métro, écoles, parcs, commerces).

Ce projet offre une solution analytique complète pour éclairer les décisions d'investissement :
1. **Pipeline de Web Scraping Éthique & Distribué** :
   - Extraction automatisée d'annonces de vente et de location sur les portails immobiliers majeurs (prix affiché, surface en m², nombre de pièces, diagnostic de performance énergétique DPE, étage, charges).
   - Gestion des en-têtes tournants, limitation du taux de requêtes (rate limiting) et gestion des proxies.
2. **Nettoyage de Données & Feature Engineering Avancé** :
   - Détection et élimination des doublons d'annonces multi-agences par similarité textuelle et géo-matching.
   - Normalisation du prix au mètre carré ($€/\text{m}^2$) et estimation des rendements locatifs bruts :
     $$\text{Rendement Brut} (\%) = \frac{\text{Loyer Annuel Estimé}}{\text{Prix d'Achat Total}} \times 100$$
3. **Enrichissement Géographique (API OpenStreetMap / Overpass)** :
   - Calcul des temps de marche et distances aux stations de métro/tramway et aux pôles d'attractivité universitaires.
4. **Analyse Statistique & Dataviz Interactive** :
   - Modélisation de régression hédonique (impact marginal du DPE et d'un balcon sur le prix du m²).
   - Cartes de chaleur (Heatmaps) des prix médians et simulateur interactif d'amortissement de crédit.

---

## 🏗️ Architecture du Projet

```mermaid
flowchart LR
    subgraph Collecte de Données
        A[Portails Immobiliers] -->|Web Scraper Playwright / BS4| B[Données d'Annonces Brutes]
        C[OpenStreetMap API] -->|Overpass Query| D[Points d'Intérêt : Transports & Écoles]
    end

    subgraph Data Processing & Analytics
        B & D --> E[Pipeline de Nettoyage Pandas]
        E --> F[Feature Engineering : €/m², Distances Métro]
        F --> G[Modélisation Statistique & Détection d'Outliers]
    end

    subgraph Restitution Décisionnelle
        G --> H[Tableaux de Bord Interactifs Plotly]
        G --> I[Rapport des Meilleures Opportunités d'Investissement]
    end
```

---

## 📊 Insights & Résultats Principaux
- **Prime de proximité aux transports** : Les appartements situés à moins de 5 minutes à pied d'une station de métro affichent une surcote de **+8.7%** par rapport aux biens situés à plus de 15 minutes.
- **Impact de l'étiquette DPE** : Une passoire thermique (DPE F ou G) subit une décote moyenne de **-14.2%** à la vente, créant des opportunités de forte plus-value après rénovation énergétique.
- **Top Quartiers à Rendement Élevé** : Identification de zones périphériques dynamiques offrant des rendements bruts supérieurs à **7.5%**, contre 3.8% dans les hyper-centres saturés.

---

## 📁 Structure du Projet
```
├── scraping/
│   ├── scraper_config.yaml
│   ├── listing_spider.py     # Collecteur BeautifulSoup / Playwright
│   └── osm_enrichment.py     # Enrichissement géo OpenStreetMap
├── data/
│   ├── raw_listings/
│   └── processed_market_data.csv
├── analysis/
│   ├── hedonic_pricing_model.py
│   └── rental_yield_calculator.py
├── visualizer/
│   └── market_dashboard.py   # Application interactive Plotly Dash
├── requirements.txt
└── README.md
```

---

## 🚀 Lancer la Collecte & l'Analyse

```bash
# 1. Cloner le projet
git clone https://github.com/martin-ahouetognon/real-estate-scraping-market-analysis.git
cd real-estate-scraping-market-analysis
pip install -r requirements.txt

# 2. Lancer l'analyse et la visualisation
python visualizer/market_dashboard.py
```

---

## 👨‍💻 Auteur
**Martin AHOUETOGNON** - Ingénieur Data Science & IA (ENSAI)  
LinkedIn : [Martin Ahouetognon](https://www.linkedin.com) | Email : [ahouetognonmartin@gmail.com](mailto:ahouetognonmartin@gmail.com)
