'use strict';

const services = [
  {
    title: 'AI & Digital Transformation',
    body: 'Dalla conoscenza tacita aziendale a workflow intelligenti, agenti AI e automazioni che riducono passaggi manuali.',
    items: ['AI Agents', 'Automazioni', 'Workflow intelligenti', 'Reporting automatico', 'Knowledge base aziendali'],
    kpi: 'Output: meno attivita ripetitive, piu decisioni tracciabili'
  },
  {
    title: 'Process Improvement',
    body: 'Analisi sul campo, standardizzazione e dashboard per leggere tempi, metodi, WIP e colli di bottiglia.',
    items: ['Lean Manufacturing', 'Tempi e Metodi', 'KPI industriali', 'Dashboard OEE', 'Analisi bottleneck'],
    kpi: 'Output: lead time, scarti e fermi sotto controllo'
  },
  {
    title: 'Business Intelligence',
    body: 'Modelli dati e report per trasformare vendite, produzione, qualita e supply chain in metriche leggibili.',
    items: ['Power BI', 'Data analytics', 'Forecasting', 'Excel avanzato', 'Report direzionali'],
    kpi: 'Output: un solo linguaggio numerico tra reparti'
  },
  {
    title: 'Textile Engineering',
    body: 'Competenze tecniche su fibre, filati, tessuti, maglieria, nobilitazione, controllo qualita e sviluppo prodotto.',
    items: ['Filati', 'Tessuti', 'Maglieria', 'Controllo qualita', 'Sviluppo prodotto'],
    kpi: 'Output: dato digitale collegato al comportamento del materiale'
  }
];

const software = [
  {
    name: 'Tessile ERP',
    desc: 'Sistema gestionale industriale con 14 dipartimenti e workflow AI per direzione, produzione, qualita, acquisti, supply chain, manutenzione e data BI.',
    problem: 'I processi tessili sono spesso frammentati tra reparti, email, fogli Excel e conoscenza non documentata.',
    benefits: 'Standardizza input, output e ragionamento operativo; rende replicabili analisi strategiche, make-or-buy, downtime, forecasting e spedizioni.',
    tags: ['AI workflow', 'ERP', 'Process engineering', 'Textile ops'],
    link: 'showcase/tessile-erp.html',
    shotLabel: '14 reparti',
    shotSub: '28 workflow AI',
    kpis: [['14', 'dipartimenti'], ['28', 'workflow'], ['ERP', 'grade']]
  },
  {
    name: 'ProjecTrak PM Suite',
    desc: 'Suite project management con WBS, Gantt, CPM/PERT, registro attivita, budget, import/export JSON e dashboard avanzamento.',
    problem: 'La pianificazione progetto perde precisione quando tempi, costi, responsabilita e percorso critico vivono in strumenti separati.',
    benefits: 'Unifica scheduling, costo, stato, float e milestone in un ambiente operativo editabile.',
    tags: ['PMBOK', 'Gantt', 'CPM', 'PERT', 'Budget'],
    link: 'showcase/projectrak-pm-suite.html',
    shotLabel: 'CPM',
    shotSub: 'Gantt + PERT',
    kpis: [['WBS', 'strutturata'], ['Float', 'calcolato'], ['JSON', 'import/export']]
  },
  {
    name: 'Textile Intelligence Platform',
    desc: 'Piattaforma editoriale e analitica che integra CV executive, dashboard mercato, research lab, newsroom e knowledge base tecnica.',
    problem: 'Un portfolio professionale statico non basta a dimostrare competenza tecnica, dati e visione di settore.',
    benefits: 'Trasforma il CV in hub consultabile: business intelligence tessile, articoli tecnici, fonti e proof of performance.',
    tags: ['Portfolio', 'BI', 'Magazine', 'SEO'],
    link: '#home',
    shot: 'pagespeed-mobile.png',
    shotLabel: 'PageSpeed',
    shotSub: '98 mobile / 100 desktop',
    kpis: [['12', 'articoli'], ['8', 'research'], ['100', 'SEO']]
  },
  {
    name: 'Kanban industriale',
    desc: 'Doppio dimostratore: KanbanFlow per task e WIP, piu calcolo cartellini Kanban industriali con export CSV.',
    problem: 'Il flusso di produzione e la gestione scorte intermedie richiedono regole visive semplici e limiti WIP misurabili.',
    benefits: 'Rende visibili sovraccarichi, priorita, batch, scorta di sicurezza e cartellini necessari.',
    tags: ['Lean', 'Kanban', 'WIP', 'CSV'],
    link: 'showcase/kanban-industriale.html',
    altLink: 'showcase/kanbanflow.html',
    shotLabel: 'Lean flow',
    shotSub: 'WIP + cartellini',
    kpis: [['WIP', 'limit'], ['CSV', 'export'], ['Batch', 'safety stock']]
  }
];

const articles = [
  ['01', 'Distretto', 'La Tessitura a Prato: tradizione industriale e futuro digitale', 'Prato come ecosistema di filiera corta, riciclo lana, specializzazione produttiva e transizione digitale.'],
  ['02', 'Tecnica', 'Armature tessili: taffetta, saia, raso e jacquard', 'La grammatica dell intreccio tra trama e ordito e il suo impatto su estetica, drappeggio e stabilita.'],
  ['03', 'Laniero', 'Cardatura e ciclo cardato', 'Apertura, pulizia e parallelizzazione delle fibre corte per filati voluminosi, caldi e tipici del distretto pratese.'],
  ['04', 'Laniero', 'Ciclo pettinato e filati fini', 'Selezione di fibre lunghe, pettinatura, stirature progressive, titolo Nm e filati di qualita superiore.'],
  ['05', 'Produzione', 'Orditura: dal filo al subbio', 'Tensione, cantra, subbio e imbozzimatura come passaggi critici per evitare difetti in tessitura.'],
  ['06', 'Tintoria', 'Tintura in fibra, filo e pezza', 'Tre momenti diversi per colorare il tessile, con compromessi tra costo, flessibilita, solidita e complessita.'],
  ['07', 'Finissaggio', 'Rifinizione e nobilitazione', 'Trattamenti chimici, fisici e meccanici che trasformano il grezzo in prodotto finito vendibile.'],
  ['08', 'Finissaggio', 'Follatura, rattissatura, vaporizzazione', 'I trattamenti meccanici che costruiscono mano, stabilita dimensionale e aspetto della lana.'],
  ['09', 'Qualita', 'Controllo qualita tessile', 'Difetti, standard 4 Point, controlli in ingresso/processo/uscita e frontiera computer vision.'],
  ['10', 'Fibre', 'Fibre naturali, sintetiche e man-made', 'Mappa comparativa tra lana, cotone, poliestere, nylon, viscosa, lyocell e fibre riciclate.'],
  ['11', 'Tracciabilita', 'Dal fornitore al Digital Product Passport', 'QR, RFID, lotto, processo, certificazione e DPP come infrastruttura di fiducia della filiera.'],
  ['12', 'AI tessile', 'Computer vision, forecasting e color AI', 'Le applicazioni AI piu mature: difetti, domanda stagionale, color matching e digital twin.']
];

const news = [
  {
    title: 'AI sorting per il riciclo tessile: nuovo pilota SINTEF/NTG',
    date: '4 giugno 2026',
    body: 'La ricerca su sorting ottico e AI punta a riconoscere composizione e stato dei capi, con potenziale scalabilita industriale per il riciclo fibra-fibra.',
    source: 'TechXplore / SINTEF',
    url: 'https://techxplore.com/news/2026-06-ai-discarded-fabrics-efficiently.html'
  },
  {
    title: 'EURATEX sostiene il Digital Product Passport se progettato in modo proporzionato',
    date: '20 marzo 2026',
    body: 'Il DPP sotto ESPR viene letto come leva di trasparenza, circolarita e competitivita per la catena europea tessile e abbigliamento.',
    source: 'EU Textiles Ecosystem Platform',
    url: 'https://transition-pathways.europa.eu/textiles/news/euratex-supports-digital-product-passport-when-well-designed-dpp-can-drive'
  },
  {
    title: 'Textile Exchange avvia la transizione verso Materials Matter Standard',
    date: '2026-2027',
    body: 'GRS, RCS e parte degli standard animal fiber convergono in un quadro unico: efficace dal 31 dicembre 2026 e obbligatorio dal 31 dicembre 2027 per gli ambiti eleggibili.',
    source: 'Textile Exchange',
    url: 'https://textileexchange.org/standards/'
  },
  {
    title: 'Macchine AI per selezionare abiti usati accelerano la circolarita',
    date: '2 aprile 2026',
    body: 'Il caso Fastsort-Textile mostra come visione artificiale e automazione possano migliorare sorting, riuso e riciclo dei flussi post-consumo.',
    source: 'AP News',
    url: 'https://apnews.com/article/863551cc54e88da6a7916894cb8980c4'
  }
];

const certs = [
  ['GRS', 'Global Recycled Standard', 'Verifica contenuto riciclato, chain of custody e requisiti ambientali/sociali.', 'Prodotti con claim recycled strutturato.', 'Convergenza verso Materials Matter Standard.'],
  ['RCS', 'Recycled Claim Standard', 'Claim di contenuto riciclato e tracciabilita con minore complessita rispetto a GRS.', 'Filati, tessuti e accessori con materiale riciclato.', 'Crescita trainata da DPP e reporting ESG.'],
  ['OCS', 'Organic Content Standard', 'Verifica presenza e chain of custody di materiale organico certificato.', 'Cotone organico e miste organiche.', 'Utente finale richiede claim organici piu verificabili.'],
  ['GOTS', 'Global Organic Textile Standard', 'Standard leader per fibre organiche, criteri ambientali, sociali e audit su tutta la supply chain.', 'Prodotti organici ad alto valore e export.', 'GOTS 7.0 rafforza due diligence e compliance.'],
  ['RWS', 'Responsible Wool Standard', 'Benessere animale, gestione del pascolo e tracciabilita lana.', 'Lana merino, filati premium, brand luxury.', 'La lana responsabile diventa requisito buyer.'],
  ['RMS', 'Responsible Mohair Standard', 'Responsabilita animale e ambientale per mohair.', 'Maglieria e miste pregiate.', 'Rientra nella semplificazione Materials Matter.'],
  ['RAF', 'Responsible Animal Fiber', 'Framework Textile Exchange per standard animal fiber come RWS, RMS e RAS.', 'Governance e chain of custody per fibre animali.', 'Transizione verso framework unificato.'],
  ['FSC', 'Forest Stewardship Council', 'Chain of custody per materiali forest-based, inclusi viscosa, lyocell, modal e packaging.', 'Cellulosiche man-made e packaging sostenibile.', 'DPP aumenta importanza della fonte forestale.'],
  ['PEFC', 'Programme for the Endorsement of Forest Certification', 'Traccia prodotti forest-based da fonti sostenibili al mercato.', 'Cellulosiche, carta, packaging e forniture.', 'Buyer chiedono prove documentali di origine.'],
  ['ISO 9001', 'Quality Management System', 'Struttura internazionale per processi stabili, riduzione errori e miglioramento continuo.', 'Fornitori, manifattura, qualita e audit clienti.', 'Base per performance management integrato.'],
  ['ISO 14001', 'Environmental Management System', 'Framework per impatti ambientali, compliance, obiettivi e indicatori.', 'Tintorie, nobilitazione, energia, acqua e rifiuti.', 'ISO 14001:2026 spinge integrazione ambientale strategica.']
];

const materials = [
  ['Cotone', '78.08 USd/lb', '-7.10% mese', 'down', 'Trading Economics, 5 giugno 2026', 'https://tradingeconomics.com/commodity/cotton'],
  ['Lana', '10.66 EUR/kg', '+3.04% sett.', 'up', 'AWI EMI, 5 marzo 2026', 'https://www.woolmark.com/globalassets/_06-new-woolmark/_industry/support/resources/market-intelligence/weekly-market-reports/pdfs/202526/awi_weeklypricereport_2026_wk_36.pdf'],
  ['Cashmere', '88-122 USD/kg', 'volatile', 'mixed', 'WTiN / SEAL range dehaired, ultimo range pubblico', 'https://www.wtin.com/media/mags/EMR/2024/December/EMR16DEC2024.pdf'],
  ['Poliestere DTY', '1.56 USD/kg', '+16.4%', 'up', 'IMARC, Nord-Est Asia, maggio 2026', 'https://www.imarcgroup.com/polyester-pricing-report'],
  ['Nylon', '2.62 USD/kg', '+4.7% vs mar.', 'up', 'Procurement Resource, Cina FOB aprile 2026', 'https://www.procurementresource.com/resource-center/nylon-price-trends'],
  ['Viscosa', '1.95 USD/kg', '+3.3% vs mar.', 'up', 'Procurement Resource, Cina FOB aprile 2026', 'https://www.procurementresource.com/resource-center/viscose-staple-fibre-price-trends'],
  ['Lino yarn', '12.83 USD/kg', '+6.76% mese', 'mixed', 'Fibre2Fashion TexPro sample 2025', 'https://www.fibre2fashion.com/market-intelligence/texpro-textile-and-apparel/raw-material-prices/flax/linen-yarns']
];

const kpis = [
  ['Sustainability KPI', [['CO2e per kg tessuto', '-12% target'], ['Acqua per processo', '-18% target'], ['Fornitori certificati', '80%'], ['Chemicals compliant', 'ZDHC']]],
  ['Circularity KPI', [['Contenuto riciclato', '35%'], ['Tracciabilita lotto', '95%'], ['Waste-to-value', '60%'], ['DPP readiness', 'Q3 2026']]],
  ['Cost KPI', [['Varianza materia prima', '+/- 4%'], ['Rotazione stock', '4.2x'], ['Costo non qualita', '-15%'], ['Make-or-buy saving', '8-12%']]],
  ['Quality KPI', [['First pass yield', '97%'], ['Difetti 4 Point', '< 25'], ['NCR closure', '7 giorni'], ['AI defect detection', '> 95%']]],
  ['Productivity KPI', [['OEE', '75%+'], ['Lead time sviluppo', '-30%'], ['OTIF clienti', '90%+'], ['WIP medio', '-20%']]]
];

function el(id) {
  return document.getElementById(id);
}

function renderServices() {
  el('services-grid').innerHTML = services.map(s => `
    <article class="service-card">
      <h3>${s.title}</h3>
      <p>${s.body}</p>
      <ul>${s.items.map(item => `<li>${item}</li>`).join('')}</ul>
      <div class="service-kpi">${s.kpi}</div>
    </article>
  `).join('');
}

function renderSoftware() {
  el('software-grid').innerHTML = software.map(s => `
    <article class="software-card">
      <div>
        <h3>${s.name}</h3>
        <p>${s.desc}</p>
        <p><strong>Problema risolto:</strong> ${s.problem}</p>
        <p><strong>Benefici:</strong> ${s.benefits}</p>
        <div class="software-meta">${s.tags.map(tag => `<span class="chip">${tag}</span>`).join('')}</div>
        <a href="${s.link}" target="${s.link.startsWith('#') ? '_self' : '_blank'}" rel="noopener">Apri ${s.name}</a>
        ${s.altLink ? ` · <a href="${s.altLink}" target="_blank" rel="noopener">KanbanFlow</a>` : ''}
      </div>
      <div class="software-shot">
        ${s.shot ? `<img src="${s.shot}" alt="Screenshot ${s.name}">` : ''}
        <strong>${s.shotLabel}</strong>
        <span>${s.shotSub}</span>
        <div class="software-kpis">
          ${s.kpis.map(k => `<div><b>${k[0]}</b><span>${k[1]}</span></div>`).join('')}
        </div>
      </div>
    </article>
  `).join('');
}

function renderArticles() {
  el('article-grid').innerHTML = articles.map(a => `
    <article class="article-card">
      <div class="article-number">${a[0]} / ${a[1]}</div>
      <h3>${a[2]}</h3>
      <p>${a[3]}</p>
      <details>
        <summary>Valore professionale</summary>
        <p>Contenuto consolidato come prova di competenza tecnica e base per consulenza, formazione e knowledge base aziendale.</p>
      </details>
    </article>
  `).join('');
}

function renderNews() {
  el('news-grid').innerHTML = news.map(n => `
    <article class="news-card">
      <div class="news-date">${n.date} · ${n.source}</div>
      <h3>${n.title}</h3>
      <p>${n.body}</p>
      <a href="${n.url}" target="_blank" rel="noopener">Fonte</a>
    </article>
  `).join('');
}

function renderCerts() {
  el('cert-grid').innerHTML = certs.map(c => `
    <article class="cert-card">
      <h3>${c[0]}</h3>
      <p>${c[1]}</p>
      <dl>
        <div><dt>Descrizione</dt><dd>${c[2]}</dd></div>
        <div><dt>Utilizzo</dt><dd>${c[3]}</dd></div>
        <div><dt>Trend</dt><dd>${c[4]}</dd></div>
      </dl>
    </article>
  `).join('');
}

function renderMarket() {
  el('market-grid').innerHTML = materials.map(m => `
    <article class="material-card" data-trend="${m[3]}">
      <h3>${m[0]}</h3>
      <div class="material-price">${m[1]}</div>
      <div class="material-var">${m[2]}</div>
      <p class="material-source">${m[4]}</p>
      <a href="${m[5]}" target="_blank" rel="noopener">Fonte</a>
    </article>
  `).join('');
}

function renderKpis() {
  el('kpi-dashboard').innerHTML = kpis.map(group => `
    <article class="kpi-group">
      <h3>${group[0]}</h3>
      ${group[1].map(item => `
        <div class="kpi-item">
          <span>${item[0]}</span>
          <b>${item[1]}</b>
        </div>
      `).join('')}
    </article>
  `).join('');
}

function initNav() {
  const button = document.querySelector('.nav-toggle');
  const nav = document.querySelector('.site-nav');
  button.addEventListener('click', () => {
    const open = nav.classList.toggle('open');
    button.setAttribute('aria-expanded', String(open));
  });
  nav.addEventListener('click', event => {
    if (event.target.matches('a')) {
      nav.classList.remove('open');
      button.setAttribute('aria-expanded', 'false');
    }
  });
}

renderServices();
renderSoftware();
renderArticles();
renderNews();
renderCerts();
renderMarket();
renderKpis();
initNav();
