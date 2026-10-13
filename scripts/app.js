/**
 * ==========================================================================
 * APPLICATION LOGIC & NAVIGATION - MARTIN AHOUETOGNON PORTFOLIOS
 * ==========================================================================
 */

const ProjectDatabase = {
  // DATA SCIENCE (4 Projets)
  "ds-01": {
    domain: "data-science",
    badge: "Quant & Modélisation IRB",
    title: "Modélisation Complète du Risque de Crédit IRB (PD, LGD, EAD & RWA)",
    subtitle: "Régression logistique régularisée, WoE, LightGBM, Hurdle LGD et capital réglementaire Bâle III",
    summary: "Conception d'une chaîne quantitative d'évaluation du risque de crédit bancaire sous l'approche notations internes (IRB Avancée). Ce projet quantifie la Probabilité de Défaut (PD), la Perte en Cas de Défaut (LGD à deux étapes) et l'Exposition au Moment du Défaut (EAD), avec projection des Actifs Pondérés (RWA) selon la formule de Vasicek.",
    highlights: [
      "ROC-AUC de 0.887 et Brier score de 0.041 pour le modèle PD LightGBM calibré",
      "Modèle Hurdle en 2 étapes pour la LGD (classification zéro-perte puis régression Beta)",
      "Moteur d'arbitrage de capital réglementaire Bâle II / Bâle III",
      "Scorecard normalisée avec scaling de 600 points (PDO = 20)"
    ],
    techStack: ["Python", "Scikit-Learn", "LightGBM", "Statsmodels", "Basel III", "Pandas", "PyTest"],
    repoPath: "github-repos/data-science/01-credit-risk-irb-modeling/README.md",
    codeSnippet: `# Extrait de calcul réglementaire RWA (Formule de Vasicek)
r = 0.03 * (1 - np.exp(-35 * pd)) / (1 - np.exp(-35)) + 0.16 * (1 - (1 - np.exp(-35 * pd)) / (1 - np.exp(-35)))
k = (norm.cdf((norm.ppf(pd) + np.sqrt(r) * norm.ppf(0.999)) / np.sqrt(1 - r)) - pd) * lgd
rwa = k * 12.5 * ead`
  },
  "ds-02": {
    domain: "data-science",
    badge: "GenAI & NLP Juridique",
    title: "Architecture RAG & LLM pour Textes Juridiques et Financiers",
    subtitle: "Extraction OCR Tesseract, Indexation sémantique ChromaDB & Génération GPT-4o avec citations",
    summary: "Système de Retrieval-Augmented Generation (RAG) pour l'interrogation contextuelle de décrets, arrêtés et rapports financiers non structurés. Intègre une chaîne de prétraitement OCR pour documents scannés, un chunking sémantique respectant la hiérarchie des articles et un reranker cross-encoder.",
    highlights: [
      "Score Faithfulness Ragas de 0.96 / 1.00 (aucun fait non sourcé généré)",
      "Recherche hybride combinant BM25 et Dense Embeddings (OpenAI / BGE)",
      "Prétraitement d'images et binarisation OpenCV pour un OCR Tesseract à 98.4% de fidélité",
      "Interface d'interrogation conversationnelle avec surlignage des références"
    ],
    techStack: ["Python", "LangChain", "OpenAI API", "ChromaDB", "Tesseract OCR", "OpenCV", "Ragas"],
    repoPath: "github-repos/data-science/02-legal-financial-rag-llm/README.md",
    codeSnippet: `# Recherche hybride et réordonnancement (RRF)
dense_results = vector_db.similarity_search_with_score(query, k=15)
bm25_results = bm25_retriever.get_relevant_documents(query)
reranked_docs = cohere_reranker.rerank(query=query, docs=combined_docs, top_k=3)`
  },
  "ds-03": {
    domain: "data-science",
    badge: "Model Risk Governance",
    title: "Package Python d'Audit & Validation de Modèles de Machine Learning",
    subtitle: "Contrôle de stabilité PSI/CSI, backtesting, tests de robustesse et conformité SR 11-7",
    summary: "Inspiré de mes travaux chez Crédit Logement, ce framework standardise et automatise l'audit indépendant des modèles ML en milieu bancaire. Il quantifie la puissance prédictive, la dérive de distribution (Population Stability Index), la robustesse face aux perturbations et l'explicabilité SHAP.",
    highlights: [
      "Détection instantanée de drift de population via PSI et CSI matriciel",
      "Évaluation automatique de la calibration (Brier score & Hosmer-Lemeshow)",
      "Génération automatisée de rapports d'audit PDF/HTML conformes à la guidance SR 11-7",
      "Module de stress tests par injection de bruit aléatoire et adversarial perturbations"
    ],
    techStack: ["Python", "Model Risk SR 11-7", "SHAP", "Scikit-Learn", "Jinja2", "WeasyPrint", "PyTest"],
    repoPath: "github-repos/data-science/03-ml-model-validation-framework/README.md",
    codeSnippet: `# Calcul matriciel du Population Stability Index (PSI)
def calculate_psi(baseline, actual, bins=10):
    b_counts, bin_edges = np.histogram(baseline, bins=bins)
    a_counts, _ = np.histogram(actual, bins=bin_edges)
    b_perc = np.maximum(b_counts / len(baseline), 1e-4)
    a_perc = np.maximum(a_counts / len(actual), 1e-4)
    return np.sum((b_perc - a_perc) * np.log(b_perc / a_perc))`
  },
  "ds-04": {
    domain: "data-science",
    badge: "Risque Climatique & ESG",
    title: "Modélisation Prédictive du Risque Climatique & Pertes par GLM",
    subtitle: "GLM Tweedie / Poisson-Gamma, quantification de sinistres d'inondation et choc de défaut",
    summary: "Développé dans le cadre de mes missions chez Nexialog Consulting, ce projet modélise le risque physique climatique sur un portefeuille d'actifs corporate. Il croise données hydrologiques et bilans d'entreprises pour estimer les pertes financières via des lois de Tweedie et projeter l'impact sur la probabilité de défaut.",
    highlights: [
      "Amélioration de 44% du Gini des pertes par rapport à une régression linéaire classique",
      "Modélisation continue de la prime pure via la loi de Tweedie (p = 1.52)",
      "Stress testing aligné sur les scénarios macro-climatiques NGFS (Net Zero 2050)",
      "Croisement spatial de 10 000+ actifs avec les zones inondables décennales/centennales"
    ],
    techStack: ["Python", "Statsmodels (GLM)", "GeoPandas", "Scikit-Learn", "Copernicus Data", "NGFS"],
    repoPath: "github-repos/data-science/04-climate-risk-financial-loss-glm/README.md",
    codeSnippet: `# Estimation GLM Tweedie Compound Poisson-Gamma
import statsmodels.api as sm
glm_tweedie = sm.GLM(
    endog=y_losses,
    exog=X_features,
    family=sm.families.Tweedie(var_power=1.52, link=sm.families.links.Log())
).fit()`
  },

  // DATA ENGINEERING (4 Projets)
  "de-01": {
    domain: "data-engineering",
    badge: "Orchestration & Cloud ETL",
    title: "Pipeline ETL Automatisé pour Textes Juridiques (Airflow, NLP & GCP)",
    subtitle: "Ingestion résiliente, extraction NLP d'entités, Cloud Storage et BigQuery",
    summary: "Pipeline de données de bout en bout orchestré par Apache Airflow assurant la collecte quotidienne, le parsing, l'enrichissement par NER et l'indexation de textes juridiques et réglementaires officiels dans un Data Lakehouse Google Cloud Platform (GCS Bronze / BigQuery Silver & Gold).",
    highlights: [
      "Architecture ELT moderne avec partitionnement temporel et clustering BigQuery",
      "Garantie d'idempotence et capacité de backfilling sur les 5 dernières années",
      "Qualité de données automatisée via des contrats Great Expectations",
      "Déploiement conteneurisé Docker Compose et alertes Slack intégrées"
    ],
    techStack: ["Apache Airflow", "GCP BigQuery", "Google Cloud Storage", "Python", "Docker", "Great Expectations"],
    repoPath: "github-repos/data-engineering/01-legal-texts-etl-pipeline/README.md",
    codeSnippet: `# Tâche DAG Airflow : Ingestion incrémentale BigQuery
with DAG(dag_id='legal_decrees_etl', schedule_interval='@daily', catchup=False) as dag:
    ingest_task = PythonOperator(task_id='extract_decrees', python_callable=extract_daily_decrees)
    clean_task = PythonOperator(task_id='nlp_normalize', python_callable=normalize_legal_text)
    upload_gcs = LocalFilesystemToGCSOperator(task_id='upload_to_gcs', bucket_name='legal-bronze-lake')
    load_bq = GCSToBigQueryOperator(task_id='load_to_bigquery', destination_project_dataset_table='corp.legal_decrees')
    ingest_task >> clean_task >> upload_gcs >> load_bq`
  },
  "de-02": {
    domain: "data-engineering",
    badge: "Streaming Haute Fréquence",
    title: "Architecture de Données Streaming Temps Réel (Kafka, PySpark & Redis)",
    subtitle: "Ingestion WebSocket de flux boursiers, fenêtrage glissant VWAP et double stockage hybride",
    summary: "Architecture distribuée de traitement d'événements à haute cadence ingérant des données de marché en direct. Les flux sont diffusés dans Apache Kafka, agrégés par fenêtres glissantes avec PySpark Structured Streaming, puis persistés en mémoire dans Redis (< 15ms) et historisés dans PostgreSQL TimescaleDB.",
    highlights: [
      "Débit soutenu supérieur à 12 000 messages / seconde sans goulot d'étranglement",
      "Latence de bout en bout de 180 ms entre le tick WebSocket et la persistance Redis",
      "Watermarking Spark à 30 secondes pour gestion transparente des données hors séquence",
      "Sémantique de traitement effectively-once via checkpointing distribué"
    ],
    techStack: ["Apache Kafka", "Apache Spark (PySpark)", "Redis", "TimescaleDB / PostgreSQL", "Docker Compose"],
    repoPath: "github-repos/data-engineering/02-realtime-streaming-kafka-spark/README.md",
    codeSnippet: `# Job PySpark Structured Streaming avec Watermarking & VWAP
stream_df = spark.readStream.format("kafka") \\
    .option("kafka.bootstrap.servers", "localhost:9092") \\
    .option("subscribe", "raw-market-ticks").load()
aggregated = stream_df \\
    .withWatermark("timestamp", "30 seconds") \\
    .groupBy(window("timestamp", "1 minute", "10 seconds"), "symbol") \\
    .agg((sum(col("price") * col("volume")) / sum(col("volume"))).alias("vwap"))`
  },
  "de-03": {
    domain: "data-engineering",
    badge: "MLOps & Microservices",
    title: "Industrialisation MLOps d'un Modèle de Scoring (FastAPI, Docker & CI/CD)",
    subtitle: "API REST asynchrone, conteneurisation multi-stage, pipeline CI/CD GitHub Actions et monitoring",
    summary: "Passage du modèle de risque de crédit en produit logiciel prêt pour la production bancaire. Déploiement d'une API FastAPI haute disponibilité avec validation stricte Pydantic, pipeline CI/CD automatisant tests unitaires et builds d'images, et surveillance continue de dérive des prédictions avec Evidently AI et Prometheus.",
    highlights: [
      "Temps de réponse d'inférence moyen de 7.4 ms par requête",
      "Pipeline CI/CD complet (Linting, Tests PyTest > 90% couverture, Security scan Trivy)",
      "Image Docker multi-stage optimisée (< 180 Mo, utilisateur non-root sécurisé)",
      "Sondes de monitoring et alertes automatiques en cas de PSI > 0.15"
    ],
    techStack: ["FastAPI", "Docker", "GitHub Actions CI/CD", "Pydantic v2", "Evidently AI", "Prometheus"],
    repoPath: "github-repos/data-engineering/03-mlops-scoring-fastapi-docker-cicd/README.md",
    codeSnippet: `# Endpoint FastAPI de scoring unitaire
@app.post("/api/v1/score", response_model=ScoringResponse)
async def score_applicant(applicant: ApplicantInput):
    X = preprocessor.transform(applicant.to_dataframe())
    score_val, pd_val = model.predict_score_and_pd(X)
    grade = assign_risk_grade(score_val)
    record_metrics(score_val, pd_val)
    return ScoringResponse(score=score_val, pd_12m=pd_val, decision="APPROVED" if score_val >= 610 else "REJECTED")`
  },
  "de-04": {
    domain: "data-engineering",
    badge: "Analytics Engineering",
    title: "Conception d'un Data Warehouse avec dbt et BigQuery (Modélisation Kimball)",
    subtitle: "Architecture en étoile (Star Schema), couches Staging/Intermediate/Marts et tests d'intégrité",
    summary: "Conception et implémentation d'un entrepôt de données moderne pour un établissement financier sur Google BigQuery. Mise en œuvre des meilleures pratiques Analytics Engineering avec dbt (data build tool) : partitionnement, dimension slowly changing (SCD Type 2), tests automatisés et catalogue de données interactif.",
    highlights: [
      "Schéma en étoile optimisé réduisant les coûts de scan BigQuery de 68%",
      "Historisation des statuts clients via dbt snapshots (SCD Type 2)",
      "Couverture de tests d'intégrité à 100% sur les clés primaires et relations étrangères",
      "Documentation de lignage de données (DAG de lignage dbt) déployée en CI"
    ],
    techStack: ["dbt Core", "Google BigQuery", "SQL Avancé", "Kimball Modeling", "Git", "dbt-utils"],
    repoPath: "github-repos/data-engineering/04-data-warehouse-dbt-bigquery/README.md",
    codeSnippet: `# Modèle de mart dbt : fct_loan_transactions.sql
{{ config(materialized='incremental', partition_by={"field": "transaction_date", "data_type": "date"}, cluster_by=["customer_id"]) }}
SELECT
    t.transaction_id,
    c.customer_key,
    p.product_key,
    t.transaction_date,
    t.loan_amount,
    t.interest_rate,
    t.days_past_due
FROM {{ ref('stg_loans') }} t
JOIN {{ ref('dim_customers') }} c ON t.customer_id = c.customer_id AND c.is_current = TRUE
JOIN {{ ref('dim_credit_products') }} p ON t.product_code = p.product_code`
  },

  // DATA ANALYST (4 Projets)
  "da-01": {
    domain: "data-analyst",
    badge: "BI Financière & Dataviz",
    title: "Dashboard Interactif de Suivi du Risque de Crédit & Stress-Testing",
    subtitle: "Application Streamlit/Plotly de surveillance des NPL, matrices de migration et simulation macro",
    summary: "Application web d'aide à la décision pour comités de risques et directions financières. Permet de piloter dynamiquement les encours bancaires, de visualiser la migration des notes de crédit d'un trimestre à l'autre et de simuler des chocs macroéconomiques (hausse du chômage, des taux BCE) avec recalcul instantané des provisions IFRS 9.",
    highlights: [
      "Visualisations dynamiques multi-angles (heatmaps de transition, distributions de scores)",
      "Simulateur de sensibilité macroéconomique réactif recalculant les provisions IFRS 9",
      "Filtres croisés par maturité, segment d'activité et type de contrepartie",
      "Exportation instantanée des synthèses exécutives et métriques NPL"
    ],
    techStack: ["Streamlit", "Plotly", "Python", "Pandas", "IFRS 9 Provisions", "Risk Analytics"],
    repoPath: "github-repos/data-analyst/01-credit-risk-monitoring-dashboard/README.md",
    codeSnippet: `# Calcul des provisions IFRS 9 sous scénario de stress
def compute_stressed_provisions(df, rate_shock, unemp_shock):
    df_stressed = df.copy()
    elasticity_factor = 1 + (rate_shock * 0.25 + unemp_shock * 0.35)
    df_stressed['stressed_pd'] = np.clip(df_stressed['base_pd'] * elasticity_factor, 0, 1)
    df_stressed['ecl_stage1_2'] = df_stressed['stressed_pd'] * df_stressed['lgd'] * df_stressed['exposure']
    return df_stressed.groupby('segment')['ecl_stage1_2'].sum()`
  },
  "da-02": {
    domain: "data-analyst",
    badge: "SQL Avancé & CRM Analytics",
    title: "Analyse de Cohorte et Segmentation Client RFM Avancée",
    subtitle: "Requêtes SQL complexes (Window functions, CTEs), clustering RFM et réduction de l'attrition",
    summary: "Étude quantitative approfondie des dynamiques de fidélisation et de churn client. Combine des requêtes SQL de haut niveau pour construire les matrices de rétention triangulaires par cohorte mensuelle et une segmentation RFM (Récence, Fréquence, Montant) sous Python pour activer des stratégies marketing chirurgicales.",
    highlights: [
      "Identification de la chute critique de rétention à M+1 (-42% de réachat sans relance)",
      "Segmentation RFM en 5 classes distinguant les 'Champions' (61.8% du CA) des 'Dormants'",
      "Modélisation du churn prédictif apportant un gain de rétention estimé à +18.4%",
      "Requêtes SQL standardisées compatibles PostgreSQL et BigQuery"
    ],
    techStack: ["SQL Avancé (PostgreSQL / BigQuery)", "Pandas", "Seaborn", "RFM Scoring", "Matplotlib"],
    repoPath: "github-repos/data-analyst/02-cohort-analysis-rfm-segmentation/README.md",
    codeSnippet: `-- Requête SQL de fenêtrage RFM (Quintiles)
SELECT 
    customer_id,
    recency_days,
    frequency_orders,
    monetary_total,
    NTILE(5) OVER (ORDER BY recency_days DESC) AS r_score,
    NTILE(5) OVER (ORDER BY frequency_orders ASC) AS f_score,
    NTILE(5) OVER (ORDER BY monetary_total ASC) AS m_score
FROM customer_aggregates;`
  },
  "da-03": {
    domain: "data-analyst",
    badge: "Économétrie Spatiale & Agro",
    title: "Analyse de l'Impact Climatique sur les Rendements Agricoles (Bénin)",
    subtitle: "EDA croisant réanalyses météo (ERA5/CHIRPS) et statistiques de terrain avec cartes Folium",
    summary: "Valorisation de mon expérience à la Direction de l'Agriculture et de ma formation d'Ingénieur Statisticien Économiste (ENEAM). Ce projet croise séries chronologiques climatiques et rendements de cultures vivrières pour identifier les départements vulnérables et estimer l'élasticité marginale du rendement aux canicules.",
    highlights: [
      "Cartographie choroplèthe interactive (Folium / GeoJSON) avec filtres de criticité",
      "Mise en évidence de l'impact des séquences de jours secs (CDD) durant la floraison",
      "Économétrie sur données de panel avec effets fixes régionaux et temporels",
      "Recommandations d'étalonnage pour des programmes d'assurance indicielle agricole"
    ],
    techStack: ["GeoPandas", "Folium", "Plotly", "Python", "Économétrie de Panel", "Bénin Agriculture Data"],
    repoPath: "github-repos/data-analyst/03-climate-agriculture-impact-analysis/README.md",
    codeSnippet: `# Création de carte choroplèthe interactive Folium
m = folium.Map(location=[9.3077, 2.3158], zoom_start=7, tiles="CartoDB dark_matter")
folium.Choropleth(
    geo_data=benin_departments_geojson,
    data=df_vulnerability,
    columns=['department_code', 'vulnerability_index'],
    key_on='feature.properties.code',
    fill_color='YlOrRd',
    legend_name='Indice de Vulnérabilité Climatique Agricole'
).add_to(m)`
  },
  "da-04": {
    domain: "data-analyst",
    badge: "Web Scraping & Économétrie",
    title: "Web Scraping et Analyse du Marché Immobilier Résidentiel",
    subtitle: "Collecte automatisée d'annonces, modélisation de rentabilité locative et enrichissement OpenStreetMap",
    summary: "Étude statistique du marché immobilier résidentiel combinant collecte par web scraping éthique (BeautifulSoup, Playwright), nettoyage statistique et modélisation de rentabilité brute/nette. Intègre les distances aux transports publics via l'API Overpass pour modéliser le prix hédonique au m².",
    highlights: [
      "Extraction et déduplication de plus de 15 000 annonces immobilières",
      "Calcul des primes d'accessibilité (+8.7% de surcote à < 5 min d'une station de métro)",
      "Évaluation de la décote moyenne des passoires thermiques (DPE F/G : -14.2%)",
      "Dashboard interactif de simulation d'amortissement d'emprunt et de cash-flow locatif"
    ],
    techStack: ["Python", "BeautifulSoup / Playwright", "Plotly", "OpenStreetMap API", "Pandas", "Régression Hédonique"],
    repoPath: "github-repos/data-analyst/04-real-estate-scraping-market-analysis/README.md",
    codeSnippet: `# Calcul du rendement locatif brut et prime de transport
df['rentabilite_brute'] = (df['loyer_mensuel_estime'] * 12) / df['prix_acquisition'] * 100
hedonic_model = smf.ols('prix_m2 ~ surface + C(dpe) + distance_metro_minutes + C(arrondissement)', data=df).fit()`
  }
};

const App = {
  activeView: 'hub',

  init() {
    this.setupNavigation();
    this.setupModals();
    this.setupViewSwitching();
    this.handleInitialHash();

    // Init interactive simulators
    if (window.Simulators) {
      window.Simulators.initCreditRiskSimulator();
      window.Simulators.initStreamingSimulator();
      window.Simulators.initAnalystSimulator();
    }
  },

  setupNavigation() {
    const navLinks = document.querySelectorAll('.nav-link[data-target]');
    navLinks.forEach(link => {
      link.addEventListener('click', (e) => {
        e.preventDefault();
        const target = link.getAttribute('data-target');
        this.navigateTo(target);
      });
    });

    // Domain card CTAs in the Hero
    const exploreButtons = document.querySelectorAll('[data-explore-target]');
    exploreButtons.forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.preventDefault();
        const target = btn.getAttribute('data-explore-target');
        this.navigateTo(target);
      });
    });
  },

  navigateTo(viewId) {
    this.activeView = viewId;
    window.location.hash = viewId;

    // Hide all views
    const allViews = document.querySelectorAll('.domain-view');
    allViews.forEach(v => v.classList.remove('active'));

    // Show target view
    const targetView = document.getElementById(`view-${viewId}`);
    if (targetView) {
      targetView.classList.add('active');
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }

    // Update nav links styling
    const navLinks = document.querySelectorAll('.nav-link[data-target]');
    navLinks.forEach(link => {
      link.classList.remove('active', 'active-ds', 'active-de', 'active-da');
      if (link.getAttribute('data-target') === viewId) {
        if (viewId === 'data-science') link.classList.add('active-ds');
        else if (viewId === 'data-engineering') link.classList.add('active-de');
        else if (viewId === 'data-analyst') link.classList.add('active-da');
        else link.classList.add('active');
      }
    });
  },

  handleInitialHash() {
    const hash = window.location.hash.replace('#', '');
    if (hash && ['hub', 'data-science', 'data-engineering', 'data-analyst', 'about'].includes(hash)) {
      this.navigateTo(hash);
    } else {
      this.navigateTo('hub');
    }
  },

  setupViewSwitching() {
    window.addEventListener('hashchange', () => {
      const hash = window.location.hash.replace('#', '');
      if (hash && hash !== this.activeView) {
        this.navigateTo(hash);
      }
    });
  },

  setupModals() {
    const modalOverlay = document.getElementById('project-modal');
    const closeBtn = document.getElementById('modal-close-btn');

    if (!modalOverlay) return;

    // Close listeners
    if (closeBtn) closeBtn.addEventListener('click', () => this.closeModal());
    modalOverlay.addEventListener('click', (e) => {
      if (e.target === modalOverlay) this.closeModal();
    });

    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && modalOverlay.classList.contains('open')) {
        this.closeModal();
      }
    });

    // Delegate click on project detail buttons
    document.addEventListener('click', (e) => {
      const btn = e.target.closest('[data-project-id]');
      if (btn) {
        e.preventDefault();
        const projId = btn.getAttribute('data-project-id');
        this.openProjectModal(projId);
      }
    });
  },

  openProjectModal(projectId) {
    const project = ProjectDatabase[projectId];
    if (!project) return;

    const modal = document.getElementById('project-modal');
    document.getElementById('modal-title').textContent = project.title;
    document.getElementById('modal-subtitle').textContent = project.subtitle;
    document.getElementById('modal-badge').textContent = project.badge;
    document.getElementById('modal-summary').textContent = project.summary;

    // Highlights list
    const highlightsContainer = document.getElementById('modal-highlights');
    highlightsContainer.innerHTML = '';
    project.highlights.forEach(item => {
      const li = document.createElement('li');
      li.style.marginBottom = '0.5rem';
      li.innerHTML = `<strong>•</strong> ${item}`;
      highlightsContainer.appendChild(li);
    });

    // Tech stack tags
    const tagsContainer = document.getElementById('modal-tags');
    tagsContainer.innerHTML = '';
    project.techStack.forEach(t => {
      const span = document.createElement('span');
      span.className = 'skill-tag';
      span.textContent = t;
      tagsContainer.appendChild(span);
    });

    // Code snippet
    const codeElem = document.getElementById('modal-code');
    if (codeElem) codeElem.textContent = project.codeSnippet;

    // GitHub Repo Link
    const repoBtn = document.getElementById('modal-repo-link');
    if (repoBtn) {
      repoBtn.href = project.repoPath;
      repoBtn.textContent = `Consulter le README du Repo (${project.repoPath.split('/')[1]})`;
    }

    modal.classList.add('open');
    document.body.style.overflow = 'hidden';
  },

  closeModal() {
    const modal = document.getElementById('project-modal');
    if (modal) {
      modal.classList.remove('open');
      document.body.style.overflow = '';
    }
  }
};

document.addEventListener('DOMContentLoaded', () => {
  App.init();
});
