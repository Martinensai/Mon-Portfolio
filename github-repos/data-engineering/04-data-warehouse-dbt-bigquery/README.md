# 🏢 Modern Data Warehouse with dbt & Google BigQuery (Kimball Modeling)
[![dbt Core](https://img.shields.io/badge/dbt-1.7%2B-FF694B.svg?logo=dbt)](https://www.getdbt.com/)
[![Google BigQuery](https://img.shields.io/badge/Google%20Cloud-BigQuery-4285F4.svg?logo=googlecloud)](https://cloud.google.com/bigquery)
[![SQL](https://img.shields.io/badge/SQL-Advanced%20Analytics-blue.svg)](#)
[![Data Quality: dbt-test](https://img.shields.io/badge/Data%20Tests-100%25%20Passed-brightgreen.svg)](#)

> **Projet Data Engineering & Analytics Engineering**  
> Conception, modélisation dimensionnelle (schéma en étoile selon la méthodologie **Kimball**) et déploiement d'un **Data Warehouse d'entreprise sur Google BigQuery avec dbt (data build tool)**. Structuration en couches Staging / Intermediate / Marts, tests d'intégrité automatisés, lignage des données et documentation continue.

---

## 📌 Présentation & Approche Méthodologique
Face à l'accumulation de données brutes issues de multiples applications sources (transactions de prêt, interactions clients, paiements, CRM), les organisations ont besoin d'une source unique de vérité (*Single Source of Truth*) performante et optimisée pour les requêtes analytiques.

Ce projet structure un entrepôt de données moderne suivant l'approche **Analytics Engineering** :
1. **Architecture en Couches (Medallion / dbt Standard)** :
   - **`stg_` (Staging - Bronze)** : Vues légères nettoyant les données brutes (renommage cohérent, casting de types, déduplication, conservation de la granularité source).
   - **`int_` (Intermediate - Silver)** : Tables intermédiaires effectuant les jointures complexes, l'enrichissement métier et l'historisation des changements lents (**SCD Type 2** via les *dbt snapshots*).
   - **`fct_` & `dim_` (Marts - Gold)** : Modélisation dimensionnelle en étoile avec tables de faits partitionnées et dimensions dénormalisées prêtes pour la consommation BI.
2. **Optimisation des Coûts & Performances BigQuery** :
   - Partitionnement temporel (`PARTITION BY DATE(transaction_date)`) pour réduire le volume d'octets scannés.
   - Clustérisation sur les clés de requêtage fréquentes (`CLUSTER BY customer_id, product_type`).
3. **Qualité & Gouvernance des Données** :
   - Tests d'intégrité dbt natifs (`unique`, `not_null`, `relationships`, `accepted_values`) et tests personnalisés dbt-utils.
   - Génération continue du catalogue de données et du graphe de lignage (DAG dbt).

---

## 🏗️ Modélisation Dimensionnelle (Star Schema)

```mermaid
erDiagram
    DIM_CUSTOMER ||--o{ FCT_LOAN_TRANSACTIONS : "holds"
    DIM_CREDIT_PRODUCT ||--o{ FCT_LOAN_TRANSACTIONS : "categorizes"
    DIM_DATE ||--o{ FCT_LOAN_TRANSACTIONS : "occurs_on"
    DIM_BRANCH ||--o{ FCT_LOAN_TRANSACTIONS : "originated_at"

    FCT_LOAN_TRANSACTIONS {
        string transaction_id PK
        string customer_key FK
        string product_key FK
        date transaction_date FK
        string branch_key FK
        float loan_amount
        float interest_rate
        float remaining_balance
        string payment_status
        int days_past_due
    }

    DIM_CUSTOMER {
        string customer_key PK
        string customer_id
        string employment_sector
        string credit_rating_tier
        date valid_from
        date valid_to
        boolean is_current
    }

    DIM_CREDIT_PRODUCT {
        string product_key PK
        string product_type
        string category
        float min_term_months
        float max_term_months
    }
```

---

## ⚡ Graphe de Dépendances dbt (Lineage DAG)

```mermaid
flowchart LR
    subgraph Sources BigQuery
        S1[(raw_customers)]
        S2[(raw_loans)]
        S3[(raw_repayments)]
    end

    subgraph Staging Layer
        S1 --> STG1[stg_customers]
        S2 --> STG2[stg_loans]
        S3 --> STG3[stg_repayments]
    end

    subgraph Intermediate Layer
        STG1 & STG2 --> INT1[int_customer_loan_history]
        STG2 & STG3 --> INT2[int_repayment_schedules]
    end

    subgraph Marts Analytics
        INT1 --> DIM1[dim_customers]
        INT2 --> FCT1[fct_loan_transactions]
        STG2 --> DIM2[dim_credit_products]
    end

    subgraph Consommation
        DIM1 & FCT1 --> BI[Tableaux de Bord BI & Modèles ML]
    end
```

---

## 📁 Structure du Projet dbt
```
dbt_credit_warehouse/
├── dbt_project.yml
├── profiles.yml.example
├── packages.yml              # dbt-labs/dbt_utils, dbt-expectations
├── models/
│   ├── staging/
│   │   ├── src_sources.yml
│   │   ├── stg_customers.sql
│   │   ├── stg_loans.sql
│   │   └── stg_repayments.sql
│   ├── intermediate/
│   │   ├── int_customer_loan_history.sql
│   │   └── int_repayment_schedules.sql
│   └── marts/
│       ├── core/
│       │   ├── schema.yml    # Documentation & Tests de contraintes
│       │   ├── dim_customers.sql
│       │   ├── dim_credit_products.sql
│       │   └── fct_loan_transactions.sql
├── snapshots/
│   └── snap_customers_scd2.sql # Historisation SCD Type 2
├── tests/
│   └── assert_repayment_amount_positive.sql
└── README.md
```

---

## 🚀 Exécution & Déploiement

```bash
# 1. Installer dbt pour BigQuery
pip install dbt-bigquery

# 2. Installer les packages externes dbt (dbt_utils)
dbt deps

# 3. Compiler et exécuter tous les modèles
dbt run

# 4. Lancer tous les tests d'intégrité des données
dbt test

# 5. Générer et visualiser la documentation interactive et le DAG de lignage
dbt docs generate
dbt docs serve
```

---

## 👨‍💻 Auteur
**Martin AHOUETOGNON** - Ingénieur Data Science & Ingénierie des Données (ENSAI)  
LinkedIn : [Martin Ahouetognon](https://www.linkedin.com) | Email : [ahouetognonmartin@gmail.com](mailto:ahouetognonmartin@gmail.com)
