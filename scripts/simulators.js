/**
 * ==========================================================================
 * SIMULATEURS INTERACTIFS - MARTIN AHOUETOGNON PORTFOLIOS
 * 1. Simulateur Risque de Crédit IRB & Scorecard (Data Science)
 * 2. Visualiseur Streaming & Pipeline ETL Temps Réel (Data Engineering)
 * 3. Dashboard Analytique & Stress-Testing Macroéconomique (Data Analyst)
 * ==========================================================================
 */

const Simulators = {
  // ------------------------------------------------------------------------
  // 1. DATA SCIENCE : Simulateur de Scoring & Modélisation IRB
  // ------------------------------------------------------------------------
  initCreditRiskSimulator() {
    const incomeInput = document.getElementById('sim-income');
    const loanInput = document.getElementById('sim-loan');
    const dtiInput = document.getElementById('sim-dti');
    const tenureInput = document.getElementById('sim-tenure');
    const ageInput = document.getElementById('sim-age');
    const delinqInput = document.getElementById('sim-delinq');

    if (!incomeInput) return;

    const updateDisplayValues = () => {
      document.getElementById('val-income').textContent = `${Number(incomeInput.value).toLocaleString('fr-FR')} €`;
      document.getElementById('val-loan').textContent = `${Number(loanInput.value).toLocaleString('fr-FR')} €`;
      document.getElementById('val-dti').textContent = `${dtiInput.value} %`;
      document.getElementById('val-tenure').textContent = `${tenureInput.value} ans`;
      document.getElementById('val-age').textContent = `${ageInput.value} ans`;
      document.getElementById('val-delinq').textContent = `${delinqInput.value}`;

      this.computeIRBMetrics({
        income: parseFloat(incomeInput.value),
        loan: parseFloat(loanInput.value),
        dti: parseFloat(dtiInput.value),
        tenure: parseFloat(tenureInput.value),
        age: parseFloat(ageInput.value),
        delinq: parseFloat(delinqInput.value)
      });
    };

    [incomeInput, loanInput, dtiInput, tenureInput, ageInput, delinqInput].forEach(elem => {
      elem.addEventListener('input', updateDisplayValues);
    });

    updateDisplayValues();
  },

  computeIRBMetrics({ income, loan, dti, tenure, age, delinq }) {
    // 1. Log-odds scorecard calculation
    // Base log-odds for typical prime portfolio
    let logOdds = 3.6;

    // Weight of Evidence (WoE) coefficients from Logistic Regression / Scorecard
    logOdds += (income - 50000) / 45000 * 0.9;
    logOdds -= (dti - 25) / 10 * 0.75;
    logOdds += (tenure - 5) / 5 * 0.55;
    logOdds += (age - 30) / 15 * 0.4;
    logOdds -= delinq * 1.35;
    logOdds -= (loan / income > 0.6 ? 0.8 : 0);

    // Probability of Default PD = 1 / (1 + exp(logOdds))
    const pd = Math.max(0.0005, Math.min(0.35, 1 / (1 + Math.exp(logOdds))));
    const pdPercent = (pd * 100).toFixed(2);

    // Scorecard standard (Points = Offset + Factor * log-odds)
    // 600 pts for odds 50:1, PDO = 20
    const factor = 20 / Math.LN2;
    const offset = 600 - factor * Math.log(50);
    const score = Math.round(Math.max(300, Math.min(850, offset + factor * logOdds)));

    // LGD (Loss Given Default) Hurdle estimation
    // Higher loan-to-income and delinq increase LGD
    let lgd = 0.35 + (loan / (income * 2)) * 0.15 + (delinq > 0 ? 0.08 : 0);
    lgd = Math.max(0.15, Math.min(0.65, lgd));
    const lgdPercent = (lgd * 100).toFixed(1);

    // EAD (Exposure at Default)
    const ead = loan;

    // Expected Loss (EL = PD * LGD * EAD)
    const el = Math.round(pd * lgd * ead);

    // Basel III Vasicek RWA Formula for Retail Exposures
    const r = 0.03 * (1 - Math.exp(-35 * pd)) / (1 - Math.exp(-35)) + 0.16 * (1 - (1 - Math.exp(-35 * pd)) / (1 - Math.exp(-35)));
    // Inverse normal approximation
    const normalInv = (p) => {
      const a1 = -3.969683028665376e+01, a2 = 2.209460984245205e+02, a3 = -2.759285104469687e+02;
      const a4 = 1.383577518672690e+02, a5 = -3.066479806614716e+01, a6 = 2.506628277459239e+00;
      const b1 = -5.447609879822406e+01, b2 = 1.615858368580409e+02, b3 = -1.556989798598866e+02;
      const b4 = 6.680131188771972e+01, b5 = -1.328068155288572e+01;
      const q = p - 0.5;
      if (Math.abs(q) <= 0.42) {
        const r2 = q * q;
        return q * (((((a1 * r2 + a2) * r2 + a3) * r2 + a4) * r2 + a5) * r2 + a6) /
               (((((b1 * r2 + b2) * r2 + b3) * r2 + b4) * r2 + b5) * r2 + 1);
      }
      const rVal = p < 0.5 ? p : 1 - p;
      const t = Math.sqrt(-2 * Math.log(rVal));
      const res = - (t - ((2.515517 + 0.802853 * t + 0.010328 * t * t) /
                 (1 + 1.432788 * t + 0.189269 * t * t + 0.001308 * t * t * t)));
      return p < 0.5 ? res : -res;
    };
    
    // Normal CDF approx
    const normalCdf = (x) => {
      const t = 1 / (1 + 0.2316419 * Math.abs(x));
      const d = 0.3989423 * Math.exp(-x * x / 2);
      let prob = d * t * (0.3193815 + t * (-0.3565638 + t * (1.781478 + t * (-1.821256 + t * 1.330274))));
      return x > 0 ? 1 - prob : prob;
    };

    const invPd = normalInv(pd);
    const inv999 = 3.0902; // Phi^-1(0.999)
    const kParam = (normalCdf((invPd + Math.sqrt(r) * inv999) / Math.sqrt(1 - r)) - pd) * lgd;
    const rwa = Math.round(Math.max(0, kParam * 12.5 * ead));

    // Decision & Risk Grade
    let grade = 'AAA';
    let decision = 'APPROUVÉ';
    let badgeClass = 'badge-available';
    let scoreColor = '#34d399';

    if (score >= 760) {
      grade = 'A1 (Prime)';
      decision = 'ACCORD AUTOMATIQUE ✅';
      badgeClass = 'badge-available';
      scoreColor = '#34d399';
    } else if (score >= 690) {
      grade = 'A2 / B1 (Standard)';
      decision = 'ACCORD RECOMMANDÉ ✅';
      badgeClass = 'badge-available';
      scoreColor = '#38bdf8';
    } else if (score >= 610) {
      grade = 'B2 / C1 (Surveillance)';
      decision = 'REVUE ANALYSTE MANUELLE ⚠️';
      badgeClass = 'badge-da';
      scoreColor = '#fbbf24';
    } else {
      grade = 'C2 / D (Risque Élevé)';
      decision = 'REFUS CONSEILLÉ ❌';
      badgeClass = 'badge-danger';
      scoreColor = '#f87171';
    }

    // Update DOM
    const scoreElem = document.getElementById('res-score');
    const decisionElem = document.getElementById('res-decision');
    const pdElem = document.getElementById('res-pd');
    const lgdElem = document.getElementById('res-lgd');
    const elElem = document.getElementById('res-el');
    const rwaElem = document.getElementById('res-rwa');
    const gradeElem = document.getElementById('res-grade');

    if (scoreElem) {
      scoreElem.textContent = score;
      scoreElem.style.color = scoreColor;
    }
    if (decisionElem) {
      decisionElem.textContent = decision;
      decisionElem.className = `sim-status-badge ${badgeClass}`;
    }
    if (pdElem) pdElem.textContent = `${pdPercent} %`;
    if (lgdElem) lgdElem.textContent = `${lgdPercent} %`;
    if (elElem) elElem.textContent = `${el.toLocaleString('fr-FR')} €`;
    if (rwaElem) rwaElem.textContent = `${rwa.toLocaleString('fr-FR')} €`;
    if (gradeElem) gradeElem.textContent = grade;
  },

  // ------------------------------------------------------------------------
  // 2. DATA ENGINEERING : Visualiseur de Pipeline & Streaming Live
  // ------------------------------------------------------------------------
  streamInterval: null,
  isStreamingRunning: true,

  initStreamingSimulator() {
    const terminal = document.getElementById('terminal-logs');
    const toggleBtn = document.getElementById('btn-toggle-stream');
    const triggerAirflowBtn = document.getElementById('btn-trigger-airflow');

    if (!terminal) return;

    const sampleTopics = ['market-ticks-eurusd', 'market-ticks-btcusdt', 'legal-decrees-feed', 'credit-scoring-inferences'];
    const sampleNodes = ['dag-node-1', 'dag-node-2', 'dag-node-3', 'dag-node-4'];

    const appendLog = (msg, type = 'info') => {
      const now = new Date();
      const timeStr = now.toTimeString().split(' ')[0] + '.' + String(now.getMilliseconds()).padStart(3, '0');
      const div = document.createElement('div');
      
      let badge = '<span class="log-time">[' + timeStr + ']</span> ';
      if (type === 'success') badge += '<span class="log-success">[SUCCESS]</span> ';
      else if (type === 'warn') badge += '<span class="log-warn">[WARN]</span> ';
      else if (type === 'topic') badge += '<span class="log-topic">[KAFKA]</span> ';
      else badge += '<span style="color:#38bdf8;">[SPARK]</span> ';

      div.innerHTML = badge + msg;
      terminal.appendChild(div);

      // Auto scroll
      terminal.scrollTop = terminal.scrollHeight;

      // Keep terminal under 60 lines
      if (terminal.childNodes.length > 60) {
        terminal.removeChild(terminal.firstChild);
      }
    };

    const pulseDagNode = (index) => {
      sampleNodes.forEach(id => {
        const el = document.getElementById(id);
        if (el) el.classList.remove('active');
      });
      const activeEl = document.getElementById(sampleNodes[index % sampleNodes.length]);
      if (activeEl) activeEl.classList.add('active');
    };

    let step = 0;
    this.streamInterval = setInterval(() => {
      if (!this.isStreamingRunning) return;
      step++;
      pulseDagNode(step);

      const symbol = ['BTC/USDT', 'ETH/USDT', 'EUR/USD', 'BNB/USDT'][Math.floor(Math.random() * 4)];
      const price = (Math.random() * 3000 + 100).toFixed(2);
      const latency = (Math.random() * 12 + 6).toFixed(1);

      if (step % 5 === 0) {
        appendLog(`PySpark Watermark sliding window evaluated. 14,820 ticks processed in 0.38s (Sink: Redis Cache).`, 'success');
      } else if (step % 8 === 0) {
        appendLog(`Airflow DAG 'legal_decrees_etl' task 'nlp_ner_chunking' complete. 48 articles indexed in GCP BigQuery.`, 'topic');
      } else {
        appendLog(`WebSocket tick received for <strong>${symbol}</strong>: $${price} | Latency: ${latency}ms`, 'info');
      }

      // Update Live throughput
      const throughputElem = document.getElementById('metric-throughput');
      if (throughputElem) {
        const rate = Math.round(12400 + Math.random() * 2100);
        throughputElem.textContent = `${rate.toLocaleString('fr-FR')} msg/s`;
      }
    }, 1200);

    if (toggleBtn) {
      toggleBtn.addEventListener('click', () => {
        this.isStreamingRunning = !this.isStreamingRunning;
        toggleBtn.textContent = this.isStreamingRunning ? '⏸ Pause Stream' : '▶ Reprendre Stream';
        toggleBtn.className = this.isStreamingRunning ? 'btn btn-secondary btn-sm' : 'btn btn-primary btn-sm';
        appendLog(this.isStreamingRunning ? 'Streaming Pipeline relancé.' : 'Streaming Pipeline mis en pause.', 'warn');
      });
    }

    if (triggerAirflowBtn) {
      triggerAirflowBtn.addEventListener('click', () => {
        appendLog(`⚡ Déclenchement manuel : DAG Airflow 'legal_decrees_etl' planifié avec backfill.`, 'warn');
        setTimeout(() => {
          appendLog(`GCS Ingestion réussie. Validation Great Expectations : 0 anomalie détectée.`, 'success');
        }, 1000);
      });
    }
  },

  // ------------------------------------------------------------------------
  // 3. DATA ANALYST : Dashboard & Stress Testing Macroéconomique
  // ------------------------------------------------------------------------
  initAnalystSimulator() {
    const shockBce = document.getElementById('shock-bce');
    const shockUnemp = document.getElementById('shock-unemp');
    const segmentButtons = document.querySelectorAll('.segment-btn');

    if (!shockBce) return;

    let currentSegment = 'global';

    const segmentProfiles = {
      global: { name: 'Portefeuille Global', baseVol: 14.8, baseNPL: 2.15, baseECL: 310, sensitivity: 1.0 },
      immo: { name: 'Prêts Immobiliers', baseVol: 9.4, baseNPL: 1.42, baseECL: 135, sensitivity: 0.75 },
      conso: { name: 'Crédit Consommation', baseVol: 3.2, baseNPL: 4.80, baseECL: 155, sensitivity: 1.45 },
      pro: { name: 'Prêts Entreprises (PME)', baseVol: 2.2, baseNPL: 2.95, baseECL: 20, sensitivity: 1.20 }
    };

    const updateAnalystKPIs = () => {
      const bceVal = parseFloat(shockBce.value);
      const unempVal = parseFloat(shockUnemp.value);

      document.getElementById('val-shock-bce').textContent = `+${bceVal.toFixed(1)} %`;
      document.getElementById('val-shock-unemp').textContent = `+${unempVal.toFixed(1)} %`;

      const prof = segmentProfiles[currentSegment];
      const elasticity = prof.sensitivity;

      // NPL ratio shifts with interest rates & unemployment shock
      const stressedNPL = (prof.baseNPL + (bceVal * 0.42 + unempVal * 0.55) * elasticity).toFixed(2);
      
      // Expected Credit Loss provision increase (in k€)
      const stressedECL = Math.round(prof.baseECL * (1 + (bceVal * 0.22 + unempVal * 0.28) * elasticity));
      
      // Cost of Risk (bps)
      const costOfRisk = Math.round(38 + (bceVal * 12 + unempVal * 16) * elasticity);

      document.getElementById('da-kpi-npl').textContent = `${stressedNPL} %`;
      document.getElementById('da-kpi-ecl').textContent = `${stressedECL.toLocaleString('fr-FR')} k€`;
      document.getElementById('da-kpi-cor').textContent = `${costOfRisk} bps`;
      document.getElementById('da-segment-label').textContent = prof.name;
    };

    [shockBce, shockUnemp].forEach(elem => elem.addEventListener('input', updateAnalystKPIs));

    segmentButtons.forEach(btn => {
      btn.addEventListener('click', () => {
        segmentButtons.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        currentSegment = btn.getAttribute('data-segment');
        updateAnalystKPIs();
      });
    });

    updateAnalystKPIs();
  }
};

window.Simulators = Simulators;
