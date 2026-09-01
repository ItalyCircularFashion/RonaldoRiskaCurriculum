/* data/index-data.js — Homepage Data Layer */
window.INDEX_DATA = {
  hero: {
    name: 'Ronaldo Riska',
    tagline: 'Textile Operations × Supply Chain × Digital Systems',
    sub: 'Trasformo conoscenza industriale tessile in workflow, strumenti digitali e sistemi data-driven.',
    location: 'Prato · Textile District · Italy',
    primaryCta: { label: 'Explore Digital Lab', href: '#digital-lab' },
    secondaryCta: { label: 'Download Executive CV', href: 'Ronaldo-Riska-CV-2026.pdf', download: true }
  },
  positioning: [
    { title: 'Textile', items: ['weaving','yarn','finishing','quality','production'], href: '#textile' },
    { title: 'Supply Chain', items: ['planning','procurement','MRP','logistics','KPI'], href: '#supply-chain' },
    { title: 'Digital', items: ['HTML/CSS/JS','dashboards','ERP','data workflow','automation'], href: '#digital' },
    { title: 'AI', items: ['computer vision','forecasting','process intelligence','AI workflows'], href: '#ai' }
  ],
  snapshot: [
    { label: 'Experience', value: '5+', sub: 'Filiera end-to-end' },
    { label: 'Projects', value: '4', sub: 'Digital tools' },
    { label: 'Industrial Areas', value: '6', sub: 'Full textile stack' },
    { label: 'Research Topics', value: '8', sub: 'AI & sustainability' }
  ],
  projects: [
    { name: 'ERP Textile', category: 'ERP', problem: 'Processi tessili frammentati tra reparti e Excel.', solution: 'Standardizza input/output e workflow AI.', technologies: ['JavaScript','Data Layer','AI workflow'], status: 'PROTOTYPE', industrialValue: '14 reparti, 28 workflow AI' },
    { name: 'ProjecTrak PM Suite', category: 'PM', problem: 'Pianificazione progetto dispersa tra strumenti separati.', solution: 'Unifica scheduling, costo, stato e milestone.', technologies: ['WBS','Gantt','CPM/PERT','JSON'], status: 'LIVE', industrialValue: 'Budget e float calcolati' },
    { name: 'Textile Intelligence Platform', category: 'BI', problem: 'Portfolio statico non dimostra competenza tecnica.', solution: 'Hub consultabile con BI, news, research.', technologies: ['Vanilla JS','SEO','Dashboard'], status: 'LIVE', industrialValue: 'PageSpeed 100/100' },
    { name: 'Kanban Industriale', category: 'Lean', problem: 'Flusso di produzione senza visibilità WIP.', solution: 'Rende visibili sovraccarichi, priorità e scorte.', technologies: ['HTML/JS','CSV export','WIP'], status: 'PROTOTYPE', industrialValue: 'Batch e safety stock' }
  ],
  filters: ['ALL','TEXTILE','SUPPLY CHAIN','ERP','AI','CAD','SUSTAINABILITY','DATA']
};
