# 👥 Customer Cohort Analysis & Advanced RFM Segmentation (SQL & Python)
[![SQL](https://img.shields.io/badge/SQL-Advanced%20Window%20Functions-336791.svg?logo=postgresql)](https://www.postgresql.org/)
[![Python 3.10+](https://img.shields.io/badge/Python-3.10%2B-blue.svg)](https://www.python.org/)
[![Pandas](https://img.shields.io/badge/Pandas-Data%20Wrangling-150458.svg?logo=pandas)](https://pandas.pydata.org/)
[![Seaborn](https://img.shields.io/badge/Seaborn-Retention%20Heatmaps-4C72B0.svg)](#)

> **Projet Data Analytics & Growth Analytics**  
> Analyse approfondie du cycle de vie client combinant **requêtes SQL complexes (CTEs récursives, fonctions de fenêtrage avancées)** et **modélisation RFM (Récence, Fréquence, Montant)** sous Python. Identification des leviers de rétention par cohorte mensuelle et détection précoce des clients à fort risque d'attrition (churn).

---

## 📌 Problématique Métier
Pour maximiser la valeur vie client (*Customer Lifetime Value - LTV*) et réduire les coûts d'acquisition, les entreprises ont besoin de comprendre précisément :
- À quelle vitesse les nouvelles cohortes de clients s'érodent-elles au fil des mois ?
- Quels segments génèrent 80% de la marge nette ?
- Quels clients autrefois fidèles sont en train de décrocher (*churn imminent*) ?

---

## 🔍 Méthodologie Analytique

### 1. Analyse de Cohorte Mensuelle (Rétention Triangulaire)
- Définition de la cohorte d'acquisition basée sur le premier achat (`FIRST_VALUE` / `MIN(order_date) OVER(PARTITION BY customer_id)`).
- Calcul des taux de rétention mois par mois ($M+0, M+1, \dots, M+12$).
- Restitution sous forme de heatmap triangulaire matricielle.

### 2. Modélisation et Scoring RFM
- **Récence (R)** : Nombre de jours écoulés depuis la dernière transaction.
- **Fréquence (F)** : Nombre total de commandes sur la période d'observation.
- **Montant (M)** : Valeur monétaire cumulée dépensée.
- Attribution des quintiles (notes de 1 à 5) via la fonction SQL `NTILE(5) OVER(...)`.
- Définition des segments stratégiques :
  - *Champions / VIP* (R: 4-5, F: 4-5, M: 4-5) : Programme de fidélité exclusif.
  - *Clients Fidèles Potentiels* (R: 3-5, F: 2-4, M: 3-4) : Campagnes d'upsell.
  - *À Risque d'Attrition* (R: 1-2, F: 3-5, M: 3-5) : Actions de réengagement d'urgence.
  - *Clients Dormants / Perdus* (R: 1-2, F: 1-2, M: 1-2) : Nettoyage de base ou réactivation agressive.

---

## 💻 Extrait de Requête SQL Avancée (PostgreSQL)

```sql
WITH customer_orders AS (
    SELECT 
        customer_id,
        order_date,
        order_amount,
        DATE_TRUNC('month', order_date) AS order_month,
        DATE_TRUNC('month', MIN(order_date) OVER (PARTITION BY customer_id)) AS cohort_month
    FROM transactions
    WHERE status = 'COMPLETED'
),
cohort_index AS (
    SELECT 
        customer_id,
        cohort_month,
        (EXTRACT(YEAR FROM order_month) - EXTRACT(YEAR FROM cohort_month)) * 12 +
        (EXTRACT(MONTH FROM order_month) - EXTRACT(MONTH FROM cohort_month)) AS period_number
    FROM customer_orders
),
cohort_size AS (
    SELECT 
        cohort_month,
        COUNT(DISTINCT customer_id) AS total_customers
    FROM customer_orders
    GROUP BY cohort_month
)
SELECT 
    ci.cohort_month,
    cs.total_customers,
    ci.period_number,
    COUNT(DISTINCT ci.customer_id) AS active_customers,
    ROUND(COUNT(DISTINCT ci.customer_id)::NUMERIC / cs.total_customers * 100, 2) AS retention_rate
FROM cohort_index ci
JOIN cohort_size cs ON ci.cohort_month = cs.cohort_month
GROUP BY ci.cohort_month, cs.total_customers, ci.period_number
ORDER BY ci.cohort_month, ci.period_number;
```

---

## 📈 Résultats & Insights Clés
- **Chute critique à M+1** : 42% des nouveaux clients ne passent pas de 2ème commande le premier mois, suggérant la nécessité d'un parcours d'onboarding par email dans les 7 jours.
- **Principe de Pareto vérifié** : Les 14% de clients classés "Champions" génèrent **61.8% du chiffre d'affaires total**.
- **Prévention du Churn** : La détection précoce du segment "À Risque" a permis de simuler un gain de rétention de **+18.4%** grâce à des coupons ciblés.

---

## 📁 Structure du Projet
```
├── sql/
│   ├── 01_data_cleaning.sql
│   ├── 02_cohort_retention_matrix.sql
│   └── 03_rfm_scoring_calculation.sql
├── python/
│   ├── rfm_segmentation.py     # Traitement Pandas & K-Means validation
│   └── viz_generators.py       # Heatmaps Seaborn & Sankey diagram
├── reports/
│   └── customer_insights_executive_summary.pdf
├── requirements.txt
└── README.md
```

---

## 👨‍💻 Auteur
**Martin AHOUETOGNON** - Ingénieur Data Science & IA (ENSAI)  
LinkedIn : [Martin Ahouetognon](https://www.linkedin.com) | Email : [ahouetognonmartin@gmail.com](mailto:ahouetognonmartin@gmail.com)
