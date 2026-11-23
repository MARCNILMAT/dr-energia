/**
 * Dr. Energia - Lógica Principal da Aplicação
 */

// Estado Global
const state = {
  tarifaBase: 0.85,
  bandeiraId: "verde",
  filtroCategoria: "Todos",
  buscaTermo: "",
  equipamentoAtual: null,
  tempoMinutos: 30,
  unidadeTempo: "min", // 'min' ou 'horas'
  modoCalculoRapido: "sessao", // 'sessao' (uso avulso), 'diario', 'mensal'
  repeticoesSemana: 7, // quantas vezes na semana é usado no modo avulso
  listaResidencia: [],
  modoTabela: "mensal" // 'mensal' ou 'diaria'
};

// Mapeamento de ícones amigáveis para SVG inline
const ICON_SVGS = {
  shower: `<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M4 4h7a4 4 0 0 1 4 4v12"/><path d="M14 9h7a1 1 0 0 1 1 1v2a1 1 0 0 1-1 1h-7"/><path d="M4 14l3-3 3 3"/><path d="M7 11v9"/></svg>`,
  microwave: `<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="2" y="4" width="20" height="15" rx="2"/><path d="M16 8h2"/><path d="M16 12h2"/><path d="M6 8a4 4 0 0 1 4 4 4 4 0 0 1-4 4"/></svg>`,
  flame: `<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M8.5 14.5A2.5 2.5 0 0 0 11 12c0-1.38-.5-2-1-3-1.072-2.143-.224-4.054 2-6 .5 2.5 2 4.9 4 6.5 2 1.6 3 3.5 3 5.5a7 7 0 1 1-14 0c0-1.153.433-2.294 1-3a2.5 2.5 0 0 0 2.5 2.5z"/></svg>`,
  oven: `<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="2" y="4" width="20" height="16" rx="2"/><circle cx="6" cy="8" r="1"/><circle cx="10" cy="8" r="1"/><circle cx="14" cy="8" r="1"/><rect x="5" y="12" width="14" height="6" rx="1"/></svg>`,
  refrigerator: `<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M5 2h14a2 2 0 0 1 2 2v16a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2z"/><line x1="3" y1="10" x2="21" y2="10"/><line x1="7" y1="6" x2="7" y2="8"/><line x1="7" y1="14" x2="7" y2="17"/></svg>`,
  snowflake: `<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="2" y1="12" x2="22" y2="12"/><line x1="12" y1="2" x2="12" y2="22"/><path d="m20 16-4-4 4-4"/><path d="m4 8 4 4-4 4"/><path d="m16 4-4 4-4-4"/><path d="m8 20 4-4 4 4"/></svg>`,
  fan: `<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M10.827 16.379a6.082 6.082 0 0 1-8.618-7.002l5.412 1.45a6.082 6.082 0 0 1 7.002-8.618l-1.45 5.412a6.082 6.082 0 0 1 8.618 7.002l-5.412-1.45a6.082 6.082 0 0 1-7.002 8.618l1.45-5.412Z"/><circle cx="12" cy="12" r="2"/></svg>`,
  shirt: `<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M20.38 3.46 16 2a4 4 0 0 1-8 0L3.62 3.46a2 2 0 0 0-1.34 2.23l.58 3.47a1 1 0 0 0 .99.84H6v10a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2V10h2.15a1 1 0 0 0 .99-.84l.58-3.47a2 2 0 0 0-1.34-2.23z"/></svg>`,
  tv: `<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect width="20" height="15" x="2" y="7" rx="2" ry="2"/><polyline points="17 2 12 7 7 2"/></svg>`,
  gamepad: `<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="6" y1="12" x2="10" y2="12"/><line x1="8" y1="10" x2="8" y2="14"/><line x1="15" y1="13" x2="15.01" y2="13"/><line x1="18" y1="11" x2="18.01" y2="11"/><rect x="2" y="6" width="20" height="12" rx="6"/></svg>`,
  monitor: `<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect width="20" height="14" x="2" y="3" rx="2"/><line x1="8" y1="21" x2="16" y2="21"/><line x1="12" y1="17" x2="12" y2="21"/></svg>`,
  laptop: `<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect width="18" height="12" x="3" y="4" rx="2"/><line x1="2" y1="20" x2="22" y2="20"/></svg>`,
  lightbulb: `<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M15 14c.2-1 .7-1.7 1.5-2.5 1-1 1.5-2.2 1.5-3.5A6 6 0 0 0 6 8c0 1 .2 2.2 1.5 3.5.7.7 1.3 1.5 1.5 2.5"/><path d="M9 18h6"/><path d="M10 22h4"/></svg>`,
  zap: `<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/></svg>`,
  wind: `<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M17.7 7.7a2.5 2.5 0 1 1 1.8 4.3H2"/><path d="M9.6 4.6A2 2 0 1 1 11 8H2"/><path d="M12.6 19.4A2 2 0 1 0 14 16H2"/></svg>`,
  utensils: `<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M18 2v6a3 3 0 0 1-3 3 3 3 0 0 1-3-3V2"/><path d="M15 11v11"/><path d="M5 2v20"/><path d="M2 2h6a3 3 0 0 1 0 6H2"/></svg>`,
  coffee: `<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M17 8h1a4 4 0 1 1 0 8h-1"/><path d="M3 8h14v9a4 4 0 0 1-4 4H7a4 4 0 0 1-4-4Z"/><line x1="6" y1="2" x2="6" y2="4"/><line x1="10" y1="2" x2="10" y2="4"/><line x1="14" y1="2" x2="14" y2="4"/></svg>`,
  sandwich: `<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m3 11 18-5v12L3 14v-3z"/><path d="M11.5 6.5 13 14"/></svg>`,
  iron: `<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 18h18l-3-10H6L3 18Z"/><path d="M6 8V5a2 2 0 0 1 2-2h8"/></svg>`,
  sun: `<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="4"/><path d="M12 2v2"/><path d="M12 20v2"/><path d="m4.93 4.93 1.41 1.41"/><path d="m17.66 17.66 1.41 1.41"/><path d="M2 12h2"/><path d="M20 12h2"/><path d="m6.34 17.66-1.41 1.41"/><path d="m19.07 4.93-1.41 1.41"/></svg>`
};

function getIconSvg(iconKey) {
  return ICON_SVGS[iconKey] || ICON_SVGS.zap;
}

// Inicialização
document.addEventListener("DOMContentLoaded", () => {
  carregarEstadoSalvo();
  inicializarTarifas();
  inicializarCategorias();
  renderizarGradeEquipamentos();
  selecionarEquipamento(EQUIPAMENTOS_PADRAO[0]); // Chuveiro por padrão
  configurarEventosGerais();
  renderizarTabelaResidencia();
  atualizarGraficoPizza();
});

// Carrega dados do LocalStorage se existirem
function carregarEstadoSalvo() {
  try {
    const savedTarifa = localStorage.getItem("dr_energia_tarifa");
    if (savedTarifa) state.tarifaBase = parseFloat(savedTarifa) || 0.85;

    const savedBandeira = localStorage.getItem("dr_energia_bandeira");
    if (savedBandeira) state.bandeiraId = savedBandeira;

    const savedLista = localStorage.getItem("dr_energia_lista");
    if (savedLista) {
      state.listaResidencia = JSON.parse(savedLista);
    } else {
      // Carregar exemplo padrão inicial enriquecedor
      carregarCasaPadrao(false);
    }
  } catch (e) {
    console.error("Erro ao carregar dados salvos:", e);
  }
}

function salvarListaNoStorage() {
  localStorage.setItem("dr_energia_lista", JSON.stringify(state.listaResidencia));
}

// Tarifa Total com Bandeira
function getTarifaEfetiva() {
  const bandeira = BANDEIRAS_TARIFARIAS.find(b => b.id === state.bandeiraId) || BANDEIRAS_TARIFARIAS[0];
  return state.tarifaBase + bandeira.adicional;
}

// Inicializa Seletor de Tarifas e Regiões
function inicializarTarifas() {
  const selectRegiao = document.getElementById("select-regiao");
  const inputTarifa = document.getElementById("input-tarifa-base");
  const selectBandeira = document.getElementById("select-bandeira");

  // Preencher regiões
  selectRegiao.innerHTML = TARIFAS_REFERENCIA_REGIAO.map(r => 
    `<option value="${r.tarifa}">${r.regiao} (~R$ ${r.tarifa.toFixed(2)}/kWh)</option>`
  ).join("");

  // Preencher bandeiras
  selectBandeira.innerHTML = BANDEIRAS_TARIFARIAS.map(b => 
    `<option value="${b.id}" ${b.id === state.bandeiraId ? 'selected' : ''}>${b.nome} ${b.adicional > 0 ? '(+' + b.adicional.toFixed(3) + ')' : '(Sem taxa)'}</option>`
  ).join("");

  inputTarifa.value = state.tarifaBase.toFixed(2);

  selectRegiao.addEventListener("change", (e) => {
    state.tarifaBase = parseFloat(e.target.value);
    inputTarifa.value = state.tarifaBase.toFixed(2);
    atualizarTarifaExibida();
  });

  inputTarifa.addEventListener("input", (e) => {
    state.tarifaBase = parseFloat(e.target.value) || 0;
    atualizarTarifaExibida();
  });

  selectBandeira.addEventListener("change", (e) => {
    state.bandeiraId = e.target.value;
    localStorage.setItem("dr_energia_bandeira", state.bandeiraId);
    atualizarTarifaExibida();
  });

  atualizarTarifaExibida();
}

function atualizarTarifaExibida() {
  localStorage.setItem("dr_energia_tarifa", state.tarifaBase);
  const total = getTarifaEfetiva();
  document.getElementById("tarifa-efetiva-val").textContent = `R$ ${total.toFixed(3)} / kWh`;
  
  // Recalcular telas
  calcularConsumoRapido();
  renderizarTabelaResidencia();
}

// Inicializa Filtro de Categorias
function inicializarCategorias() {
  const categorias = ["Todos", "Banheiro", "Cozinha", "Climatização", "Lavanderia", "Entretenimento", "Escritório", "Iluminação"];
  const container = document.getElementById("filter-pills-container");

  container.innerHTML = categorias.map(cat => 
    `<button class="filter-pill ${cat === state.filtroCategoria ? 'active' : ''}" data-cat="${cat}">${cat}</button>`
  ).join("");

  container.querySelectorAll(".filter-pill").forEach(btn => {
    btn.addEventListener("click", () => {
      container.querySelectorAll(".filter-pill").forEach(b => b.classList.remove("active"));
      btn.classList.add("active");
      state.filtroCategoria = btn.dataset.cat;
      renderizarGradeEquipamentos();
    });
  });

  const searchInput = document.getElementById("search-equip-input");
  searchInput.addEventListener("input", (e) => {
    state.buscaTermo = e.target.value.toLowerCase().trim();
    renderizarGradeEquipamentos();
  });
}

// Renderiza Lista de Seleção de Equipamentos
function renderizarGradeEquipamentos() {
  const grid = document.getElementById("equipments-list");
  
  const filtrados = EQUIPAMENTOS_PADRAO.filter(eq => {
    const matchCat = state.filtroCategoria === "Todos" || eq.categoria === state.filtroCategoria;
    const matchTermo = state.buscaTermo === "" || eq.nome.toLowerCase().includes(state.buscaTermo) || eq.categoria.toLowerCase().includes(state.buscaTermo);
    return matchCat && matchTermo;
  });

  if (filtrados.length === 0) {
    grid.innerHTML = `<div class="empty-state" style="padding: 1.5rem;"><p>Nenhum equipamento encontrado com essa busca.</p></div>`;
    return;
  }

  grid.innerHTML = filtrados.map(eq => {
    const isSelected = state.equipamentoAtual && state.equipamentoAtual.id === eq.id;
    return `
      <div class="equip-item-card ${isSelected ? 'selected' : ''}" data-id="${eq.id}">
        <div class="equip-icon">${getIconSvg(eq.icone)}</div>
        <div class="equip-info">
          <h4>${eq.nome}</h4>
          <p>${eq.categoria} • Potência Típica: <strong>${eq.potenciaPadrao}W</strong></p>
        </div>
        <span class="equip-power-badge">${eq.potenciaPadrao} W</span>
      </div>
    `;
  }).join("");

  grid.querySelectorAll(".equip-item-card").forEach(card => {
    card.addEventListener("click", () => {
      const equip = EQUIPAMENTOS_PADRAO.find(e => e.id === card.dataset.id);
      if (equip) {
        selecionarEquipamento(equip);
        grid.querySelectorAll(".equip-item-card").forEach(c => c.classList.remove("selected"));
        card.classList.add("selected");
      }
    });
  });
}

// Ao selecionar um equipamento no cálculo rápido
function selecionarEquipamento(equip) {
  state.equipamentoAtual = { ...equip };
  
  // Atualizar cabeçalho da área de cálculo
  document.getElementById("selected-equip-title").textContent = equip.nome;
  document.getElementById("selected-equip-category").textContent = `${equip.categoria} • ${equip.descricao || ''}`;
  document.getElementById("selected-equip-icon").innerHTML = getIconSvg(equip.icone);

  // Potência
  const inputPotencia = document.getElementById("input-quick-power");
  inputPotencia.value = equip.potenciaPadrao;

  // Presets rápidos (ex: Banho de 10 min, 15 min, 30 min, pipoca de 3 min, etc.)
  renderizarPresets(equip);

  // Se houver preset, seleciona o padrão mais comum (ex: 2º ou 1º preset)
  if (equip.presets && equip.presets.length > 0) {
    const presetPadrao = equip.presets[Math.min(1, equip.presets.length - 1)];
    aplicarTempo(presetPadrao.minutos);
  } else {
    aplicarTempo(30);
  }

  calcularConsumoRapido();
}

function renderizarPresets(equip) {
  const container = document.getElementById("presets-container");
  if (!equip.presets || equip.presets.length === 0) {
    container.innerHTML = `<span style="font-size: 0.8rem; color: #94a3b8;">Nenhum atalho predefinido. Use os controles abaixo.</span>`;
    return;
  }

  container.innerHTML = equip.presets.map((preset, index) => {
    return `<button type="button" class="preset-chip ${state.tempoMinutos === preset.minutos ? 'active' : ''}" data-min="${preset.minutos}">
      ⚡ ${preset.rotulo}
    </button>`;
  }).join("");

  container.querySelectorAll(".preset-chip").forEach(btn => {
    btn.addEventListener("click", () => {
      container.querySelectorAll(".preset-chip").forEach(b => b.classList.remove("active"));
      btn.classList.add("active");
      const min = parseInt(btn.dataset.min);
      aplicarTempo(min);
    });
  });
}

function aplicarTempo(minutos) {
  state.tempoMinutos = minutos;
  const slider = document.getElementById("range-quick-time");
  const inputNum = document.getElementById("input-quick-time");
  
  slider.value = minutos;
  inputNum.value = minutos;
  
  atualizarSubtituloTempo(minutos);
  calcularConsumoRapido();
}

function atualizarSubtituloTempo(minutos) {
  const badge = document.getElementById("quick-time-display-badge");
  if (minutos < 60) {
    badge.textContent = `${minutos} minutos`;
  } else {
    const horas = Math.floor(minutos / 60);
    const restoMin = minutos % 60;
    badge.textContent = restoMin > 0 ? `${horas}h ${restoMin}min` : `${horas} hora(s)`;
  }
}

// Configura eventos gerais da UI
function configurarEventosGerais() {
  // Tabs
  const tabBtns = document.querySelectorAll(".tab-btn");
  tabBtns.forEach(btn => {
    btn.addEventListener("click", () => {
      tabBtns.forEach(b => b.classList.remove("active"));
      document.querySelectorAll(".tab-pane").forEach(p => p.classList.remove("active"));
      btn.classList.add("active");
      const targetPane = document.getElementById(btn.dataset.tab);
      if (targetPane) targetPane.classList.add("active");

      if (btn.dataset.tab === "tab-residencia") {
        renderizarTabelaResidencia();
        atualizarGraficoPizza();
      }
    });
  });

  // Slider de Tempo
  const sliderTime = document.getElementById("range-quick-time");
  const inputTime = document.getElementById("input-quick-time");
  
  sliderTime.addEventListener("input", (e) => {
    const val = parseInt(e.target.value);
    inputTime.value = val;
    state.tempoMinutos = val;
    atualizarSubtituloTempo(val);
    marcarPresetAtivo(val);
    calcularConsumoRapido();
  });

  inputTime.addEventListener("input", (e) => {
    let val = parseInt(e.target.value) || 1;
    if (val < 1) val = 1;
    if (val > 720) val = 720;
    sliderTime.value = val;
    state.tempoMinutos = val;
    atualizarSubtituloTempo(val);
    marcarPresetAtivo(val);
    calcularConsumoRapido();
  });

  // Slider / Input de Potência
  const inputPotencia = document.getElementById("input-quick-power");
  inputPotencia.addEventListener("input", (e) => {
    const potencia = parseFloat(e.target.value) || 0;
    if (state.equipamentoAtual) {
      state.equipamentoAtual.potenciaPadrao = potencia;
    }
    calcularConsumoRapido();
  });

  // Seletor de Modo de Período (Deste Uso Único / Diário / Mensal)
  document.querySelectorAll(".period-card-btn").forEach(btn => {
    btn.addEventListener("click", () => {
      document.querySelectorAll(".period-card-btn").forEach(b => b.classList.remove("active"));
      btn.classList.add("active");
      state.modoCalculoRapido = btn.dataset.period;

      // Mostrar seletor de frequência se for uso avulso/sessão
      const freqBox = document.getElementById("freq-selector-box");
      if (state.modoCalculoRapido === "sessao") {
        freqBox.style.display = "block";
      } else {
        freqBox.style.display = "none";
      }

      calcularConsumoRapido();
    });
  });

  // Frequência semanal para modo sessão
  const selectFreq = document.getElementById("select-freq-semana");
  selectFreq.addEventListener("change", (e) => {
    state.repeticoesSemana = parseInt(e.target.value);
    calcularConsumoRapido();
  });

  // Botão Adicionar à Residência a partir do Modo Rápido
  document.getElementById("btn-add-quick-to-house").addEventListener("click", () => {
    if (!state.equipamentoAtual) return;
    
    // Adiciona o item configurado à lista
    const novoItem = {
      id: "item-" + Date.now(),
      nome: state.equipamentoAtual.nome,
      categoria: state.equipamentoAtual.categoria,
      icone: state.equipamentoAtual.icone,
      potenciaW: state.equipamentoAtual.potenciaPadrao,
      minutosPorUso: state.tempoMinutos,
      vezesAoDia: state.modoCalculoRapido === "sessao" ? (state.repeticoesSemana / 7) : (state.modoCalculoRapido === "mensal" ? (1/30) : 1),
      diasNoMes: state.modoCalculoRapido === "sessao" ? Math.round((state.repeticoesSemana / 7) * 30) : 30,
      quantidade: 1
    };

    state.listaResidencia.push(novoItem);
    salvarListaNoStorage();
    mostrarToast(`"${novoItem.nome}" adicionado à sua residência!`);
    
    // Atualizar badge da aba
    atualizarBadgeAbaResidencia();
  });

  // Alternância de visão da tabela da Residência (Mensal vs Diária)
  document.querySelectorAll(".view-toggle-btn").forEach(btn => {
    btn.addEventListener("click", () => {
      document.querySelectorAll(".view-toggle-btn").forEach(b => b.classList.remove("active"));
      btn.classList.add("active");
      state.modoTabela = btn.dataset.view;
      renderizarTabelaResidencia();
    });
  });

  // Botão Carregar Casa Padrão
  document.getElementById("btn-carregar-padrao").addEventListener("click", () => {
    if (confirm("Deseja carregar a lista de equipamentos típica de uma residência média brasileira?")) {
      carregarCasaPadrao(true);
    }
  });

  // Botão Limpar Tudo
  document.getElementById("btn-limpar-residencia").addEventListener("click", () => {
    if (confirm("Tem certeza que deseja limpar todos os equipamentos da residência?")) {
      state.listaResidencia = [];
      salvarListaNoStorage();
      renderizarTabelaResidencia();
      atualizarGraficoPizza();
      mostrarToast("Lista de equipamentos zerada.");
    }
  });

  // Modal Novo Equipamento Personalizado
  const modal = document.getElementById("modal-novo-equip");
  document.getElementById("btn-abrir-modal-novo").addEventListener("click", () => {
    modal.classList.add("active");
  });
  document.getElementById("btn-fechar-modal").addEventListener("click", () => {
    modal.classList.remove("active");
  });
  modal.addEventListener("click", (e) => {
    if (e.target === modal) modal.classList.remove("active");
  });

  // Formulário de adicionar equipamento personalizado
  document.getElementById("form-novo-equip").addEventListener("submit", (e) => {
    e.preventDefault();
    const nome = document.getElementById("novo-nome").value.trim();
    const categoria = document.getElementById("novo-categoria").value;
    const potencia = parseFloat(document.getElementById("novo-potencia").value) || 100;
    const minutos = parseFloat(document.getElementById("novo-minutos").value) || 30;
    const qtd = parseInt(document.getElementById("novo-qtd").value) || 1;
    const diasMes = parseInt(document.getElementById("novo-dias-mes").value) || 30;

    const novoItem = {
      id: "item-" + Date.now(),
      nome: nome || "Aparelho Personalizado",
      categoria: categoria,
      icone: "zap",
      potenciaW: potencia,
      minutosPorUso: minutos,
      vezesAoDia: 1,
      diasNoMes: diasMes,
      quantidade: qtd
    };

    state.listaResidencia.push(novoItem);
    salvarListaNoStorage();
    renderizarTabelaResidencia();
    atualizarGraficoPizza();
    modal.classList.remove("active");
    e.target.reset();
    mostrarToast(`"${novoItem.nome}" adicionado com sucesso!`);
  });
}

function marcarPresetAtivo(minutos) {
  document.querySelectorAll(".preset-chip").forEach(chip => {
    if (parseInt(chip.dataset.min) === minutos) {
      chip.classList.add("active");
    } else {
      chip.classList.remove("active");
    }
  });
}

// CÁLCULO RÁPIDO DO EQUIPAMENTO
function calcularConsumoRapido() {
  if (!state.equipamentoAtual) return;

  const potenciaW = parseFloat(document.getElementById("input-quick-power").value) || state.equipamentoAtual.potenciaPadrao;
  const minutos = state.tempoMinutos;
  const tarifa = getTarifaEfetiva();

  // Consumo em kWh por 1 uso específico
  const horasUso = minutos / 60;
  const kWhPorUso = (potenciaW / 1000) * horasUso;
  const custoPorUso = kWhPorUso * tarifa;

  // Projeção Mensal baseada no modo selecionado
  let kWhExibido = 0;
  let custoExibido = 0;
  let labelPeriodo = "";
  let infoComparativa = "";

  if (state.modoCalculoRapido === "sessao") {
    kWhExibido = kWhPorUso;
    custoExibido = custoPorUso;
    labelPeriodo = `Custo deste uso (${minutos < 60 ? minutos + ' min' : (minutos/60).toFixed(1) + 'h'})`;
    
    // Projeções secundárias
    const custoMesSeTodoDia = custoPorUso * 30;
    const diasPorSemana = state.repeticoesSemana;
    const usosNoMes = Math.round((diasPorSemana / 7) * 30);
    const custoMesComFrequencia = custoPorUso * usosNoMes;

    document.getElementById("metric-kwh-val").textContent = `${kWhPorUso.toFixed(3)} kWh`;
    document.getElementById("metric-mes-val").textContent = `R$ ${custoMesComFrequencia.toFixed(2)}`;
    document.getElementById("metric-ano-val").textContent = `R$ ${(custoMesComFrequencia * 12).toFixed(2)}`;
    document.getElementById("metric-mes-label").textContent = `Projeção Mensal (${usosNoMes}x no mês)`;

    // Geração de Dica Econômica Inteligente
    if (state.equipamentoAtual.id.includes("chuveiro") && minutos > 10) {
      const economiaReducao = ((potenciaW / 1000) * (10 / 60) * tarifa) * 30;
      infoComparativa = `💡 <strong>Dica de Economia do Dr. Energia:</strong> Reduzir este banho em apenas 10 minutos economiza cerca de <strong>R$ ${economiaReducao.toFixed(2)} por mês</strong> por pessoa na sua conta!`;
    } else if (state.equipamentoAtual.id.includes("ar-") && horasUso > 4) {
      const economiaAjuste = (custoMesComFrequencia * 0.2);
      infoComparativa = `💡 <strong>Dica do Dr. Energia:</strong> Ajustar o termostato para 23°C ou 24°C em vez de 18°C reduz o consumo do compressor em até 20% (economia de ~<strong>R$ ${economiaAjuste.toFixed(2)}/mês</strong>).`;
    } else {
      const equivLampadaLED = Math.round(kWhPorUso / 0.010); // lâmpada de 10W
      infoComparativa = `💡 A energia deste uso equivale a manter uma <strong>lâmpada LED acesa por ${equivLampadaLED} horas</strong> seguidas.`;
    }

  } else if (state.modoCalculoRapido === "diario") {
    kWhExibido = kWhPorUso;
    custoExibido = custoPorUso;
    labelPeriodo = `Custo Diário (${minutos < 60 ? minutos + ' min/dia' : (minutos/60).toFixed(1) + 'h/dia'})`;
    
    const custoMes = custoPorUso * 30;
    document.getElementById("metric-kwh-val").textContent = `${(kWhPorUso * 30).toFixed(1)} kWh/mês`;
    document.getElementById("metric-mes-val").textContent = `R$ ${custoMes.toFixed(2)}/mês`;
    document.getElementById("metric-ano-val").textContent = `R$ ${(custoMes * 12).toFixed(2)}/ano`;
    document.getElementById("metric-mes-label").textContent = "Estimativa Mensal (30 dias)";

    infoComparativa = `💡 Mantendo este uso diário, o impacto anual no seu orçamento será de <strong>R$ ${(custoMes * 12).toFixed(2)}</strong>.`;

  } else if (state.modoCalculoRapido === "mensal") {
    const kWhMes = kWhPorUso * 30;
    const custoMes = custoPorUso * 30;
    kWhExibido = kWhMes;
    custoExibido = custoMes;
    labelPeriodo = `Gasto Mensal Estimado`;

    document.getElementById("metric-kwh-val").textContent = `${kWhMes.toFixed(1)} kWh`;
    document.getElementById("metric-mes-val").textContent = `R$ ${(custoMes / 30).toFixed(2)}/dia`;
    document.getElementById("metric-ano-val").textContent = `R$ ${(custoMes * 12).toFixed(2)}/ano`;
    document.getElementById("metric-mes-label").textContent = "Média Diária";

    infoComparativa = `💡 Representa um custo médio diário de <strong>R$ ${(custoMes / 30).toFixed(2)}</strong>.`;
  }

  // Atualizar painel de resultado principal
  document.getElementById("result-spotlight-label").textContent = labelPeriodo;
  document.getElementById("result-main-price").textContent = `R$ ${custoExibido.toFixed(2)}`;
  document.getElementById("eco-insight-content").innerHTML = infoComparativa;
}

// SIMULADOR RESIDENCIAL COMPLETO
function renderizarTabelaResidencia() {
  const tbody = document.getElementById("house-table-body");
  const emptyState = document.getElementById("house-empty-state");
  const tarifa = getTarifaEfetiva();

  atualizarBadgeAbaResidencia();

  if (state.listaResidencia.length === 0) {
    tbody.innerHTML = "";
    emptyState.style.display = "block";
    document.getElementById("house-kwh-total").textContent = "0 kWh";
    document.getElementById("house-cost-monthly").textContent = "R$ 0,00";
    document.getElementById("house-cost-daily").textContent = "R$ 0,00 / dia";
    document.getElementById("house-cost-yearly").textContent = "R$ 0,00";
    document.getElementById("ranking-viloes-container").innerHTML = `<p style="color: #94a3b8; font-size: 0.88rem;">Adicione equipamentos para ver os vilões do consumo.</p>`;
    return;
  }

  emptyState.style.display = "none";

  // Calcular totais
  let totalKwhMes = 0;
  let totalKwhDia = 0;

  const itensCalculados = state.listaResidencia.map(item => {
    const horasDia = (item.minutosPorUso / 60) * (item.vezesAoDia || 1);
    const kwhDiaItem = (item.potenciaW / 1000) * horasDia * item.quantidade;
    const diasMes = item.diasNoMes || 30;
    const kwhMesItem = kwhDiaItem * (diasMes / 30) * 30;
    const custoMesItem = kwhMesItem * tarifa;
    const custoDiaItem = kwhDiaItem * tarifa;

    totalKwhMes += kwhMesItem;
    totalKwhDia += kwhDiaItem;

    return {
      ...item,
      kwhDiaItem,
      kwhMesItem,
      custoMesItem,
      custoDiaItem
    };
  });

  const totalCustoMes = totalKwhMes * tarifa;
  const totalCustoDia = totalKwhDia * tarifa;

  // Atualizar cartões de totais
  document.getElementById("house-kwh-total").textContent = `${totalKwhMes.toFixed(1)} kWh`;
  document.getElementById("house-cost-monthly").textContent = `R$ ${totalCustoMes.toFixed(2)}`;
  document.getElementById("house-cost-daily").textContent = `R$ ${totalCustoDia.toFixed(2)} / dia`;
  document.getElementById("house-cost-yearly").textContent = `R$ ${(totalCustoMes * 12).toFixed(2)}`;

  // Preencher linhas da tabela
  tbody.innerHTML = itensCalculados.map(item => {
    const pct = totalKwhMes > 0 ? ((item.kwhMesItem / totalKwhMes) * 100).toFixed(1) : 0;
    const isMensal = state.modoTabela === "mensal";
    const kwhExibido = isMensal ? item.kwhMesItem.toFixed(1) : item.kwhDiaItem.toFixed(2);
    const custoExibido = isMensal ? item.custoMesItem.toFixed(2) : item.custoDiaItem.toFixed(2);
    const periodoLabel = isMensal ? "/mês" : "/dia";

    return `
      <tr>
        <td>
          <div class="table-equip-cell">
            <div class="table-icon">${getIconSvg(item.icone)}</div>
            <div>
              <strong>${item.nome}</strong>
              <div style="font-size: 0.76rem; color: #64748b;">${item.categoria}</div>
            </div>
          </div>
        </td>
        <td><strong>${item.potenciaW} W</strong></td>
        <td>
          <span style="font-weight: 600;">${item.quantidade}x</span>
        </td>
        <td>
          ${item.minutosPorUso < 60 ? item.minutosPorUso + ' min' : (item.minutosPorUso/60).toFixed(1) + 'h'}
          <span style="font-size: 0.75rem; color: #64748b; display: block;">${item.diasNoMes || 30} dias/mês</span>
        </td>
        <td><strong>${kwhExibido} kWh</strong>${periodoLabel}</td>
        <td>
          <span class="table-cost-pill">R$ ${custoExibido}${periodoLabel}</span>
        </td>
        <td>
          <div class="percent-bar-container">
            <div class="percent-bar">
              <div class="percent-fill" style="width: ${pct}%"></div>
            </div>
            <span style="font-size: 0.78rem; font-weight: 700; color: #475569;">${pct}%</span>
          </div>
        </td>
        <td>
          <button class="action-icon-btn btn-remover-item" data-id="${item.id}" title="Remover este equipamento">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 6h18"/><path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6"/><path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2"/></svg>
          </button>
        </td>
      </tr>
    `;
  }).join("");

  // Evento remover item
  tbody.querySelectorAll(".btn-remover-item").forEach(btn => {
    btn.addEventListener("click", () => {
      const id = btn.dataset.id;
      state.listaResidencia = state.listaResidencia.filter(i => i.id !== id);
      salvarListaNoStorage();
      renderizarTabelaResidencia();
      atualizarGraficoPizza();
      mostrarToast("Equipamento removido da lista.");
    });
  });

  // Atualizar Ranking dos Vilões
  renderizarRankingViloes(itensCalculados, totalKwhMes);
}

function renderizarRankingViloes(itens, totalKwh) {
  const container = document.getElementById("ranking-viloes-container");
  if (!itens || itens.length === 0 || totalKwh === 0) {
    container.innerHTML = `<p style="color: #94a3b8; font-size: 0.88rem;">Adicione equipamentos para ver os vilões do consumo.</p>`;
    return;
  }

  // Ordenar decrescente pelo consumo em kWh mensal
  const ordenados = [...itens].sort((a, b) => b.kwhMesItem - a.kwhMesItem).slice(0, 5);

  container.innerHTML = ordenados.map((item, index) => {
    const pct = ((item.kwhMesItem / totalKwh) * 100).toFixed(1);
    return `
      <div class="rank-item">
        <div style="display: flex; align-items: center; gap: 0.6rem;">
          <span class="rank-badge">${index + 1}</span>
          <div>
            <strong>${item.nome}</strong>
            <span style="font-size: 0.75rem; color: #64748b; display: block;">${item.kwhMesItem.toFixed(1)} kWh/mês (${pct}%)</span>
          </div>
        </div>
        <span style="font-weight: 700; color: #dc2626;">R$ ${item.custoMesItem.toFixed(2)}/mês</span>
      </div>
    `;
  }).join("");
}

// Gráfico de Pizza Nativo em HTML5 Canvas (leve, sem dependências)
function atualizarGraficoPizza() {
  const canvas = document.getElementById("chart-canvas");
  if (!canvas) return;
  const ctx = canvas.getContext("2d");
  const width = canvas.width;
  const height = canvas.height;
  ctx.clearRect(0, 0, width, height);

  const tarifa = getTarifaEfetiva();
  if (state.listaResidencia.length === 0) {
    ctx.fillStyle = "#94a3b8";
    ctx.font = "14px Inter, sans-serif";
    ctx.textAlign = "center";
    ctx.fillText("Sem dados para exibir o gráfico", width / 2, height / 2);
    return;
  }

  // Agrupar consumo por categoria
  const categoriasMap = {};
  let totalGeral = 0;

  state.listaResidencia.forEach(item => {
    const horasDia = (item.minutosPorUso / 60) * (item.vezesAoDia || 1);
    const kwhMes = (item.potenciaW / 1000) * horasDia * item.quantidade * (item.diasNoMes || 30);
    const cat = item.categoria || "Outros";
    categoriasMap[cat] = (categoriasMap[cat] || 0) + kwhMes;
    totalGeral += kwhMes;
  });

  if (totalGeral === 0) return;

  const cores = ["#2563eb", "#f59e0b", "#10b981", "#ef4444", "#8b5cf6", "#06b6d4", "#ec4899", "#64748b"];
  let startAngle = -0.5 * Math.PI;
  const centerX = width / 2;
  const centerY = height / 2;
  const radius = Math.min(centerX, centerY) - 20;
  const innerRadius = radius * 0.55; // formato Donut elegante

  let colorIdx = 0;
  const legendaItens = [];

  for (const cat in categoriasMap) {
    const val = categoriasMap[cat];
    const sliceAngle = (val / totalGeral) * 2 * Math.PI;
    const cor = cores[colorIdx % cores.length];

    ctx.beginPath();
    ctx.arc(centerX, centerY, radius, startAngle, startAngle + sliceAngle);
    ctx.arc(centerX, centerY, innerRadius, startAngle + sliceAngle, startAngle, true);
    ctx.closePath();
    ctx.fillStyle = cor;
    ctx.fill();

    const pct = ((val / totalGeral) * 100).toFixed(1);
    legendaItens.push({ cat, cor, pct, val, custo: val * tarifa });

    startAngle += sliceAngle;
    colorIdx++;
  }

  // Texto central do Donut
  ctx.fillStyle = "#0f172a";
  ctx.font = "bold 17px Inter, sans-serif";
  ctx.textAlign = "center";
  ctx.fillText(`${totalGeral.toFixed(0)} kWh`, centerX, centerY - 2);
  ctx.font = "11px Inter, sans-serif";
  ctx.fillStyle = "#64748b";
  ctx.fillText("Total Estimado", centerX, centerY + 16);

  // Renderizar legenda HTML abaixo do canvas
  const legContainer = document.getElementById("chart-legend");
  if (legContainer) {
    legContainer.innerHTML = legendaItens.map(l => `
      <div style="display: flex; align-items: center; justify-content: space-between; font-size: 0.8rem; margin-bottom: 0.35rem;">
        <div style="display: flex; align-items: center; gap: 0.4rem;">
          <span style="width: 10px; height: 10px; border-radius: 50%; background: ${l.cor}; display: inline-block;"></span>
          <span>${l.cat}</span>
        </div>
        <strong>${l.pct}% (R$ ${l.custo.toFixed(2)})</strong>
      </div>
    `).join("");
  }
}

// Carregar Casa Padrão Brasileira de Demonstração
function carregarCasaPadrao(feedback = true) {
  state.listaResidencia = [
    {
      id: "item-p-1",
      nome: "Chuveiro Elétrico (Potência Máx / Inverno)",
      categoria: "Banheiro",
      icone: "shower",
      potenciaW: 5500,
      minutosPorUso: 30, // 2 banhos de 15 min na casa
      vezesAoDia: 1,
      diasNoMes: 30,
      quantidade: 1
    },
    {
      id: "item-p-2",
      nome: "Geladeira Frost Free Duplex",
      categoria: "Cozinha",
      icone: "refrigerator",
      potenciaW: 200,
      minutosPorUso: 600, // ~10h de compressor ativo por dia
      vezesAoDia: 1,
      diasNoMes: 30,
      quantidade: 1
    },
    {
      id: "item-p-3",
      nome: "Ar Condicionado Inverter 9.000 BTUs",
      categoria: "Climatização",
      icone: "snowflake",
      potenciaW: 800,
      minutosPorUso: 480, // 8 horas por noite
      vezesAoDia: 1,
      diasNoMes: 20, // 20 dias no mês
      quantidade: 1
    },
    {
      id: "item-p-4",
      nome: "Fritadeira Elétrica (Airfryer)",
      categoria: "Cozinha",
      icone: "flame",
      potenciaW: 1500,
      minutosPorUso: 25,
      vezesAoDia: 1,
      diasNoMes: 20,
      quantidade: 1
    },
    {
      id: "item-p-5",
      nome: "Forno Micro-ondas",
      categoria: "Cozinha",
      icone: "microwave",
      potenciaW: 1200,
      minutosPorUso: 10,
      vezesAoDia: 1,
      diasNoMes: 30,
      quantidade: 1
    },
    {
      id: "item-p-6",
      nome: "Máquina de Lavar Roupas",
      categoria: "Lavanderia",
      icone: "shirt",
      potenciaW: 500,
      minutosPorUso: 60,
      vezesAoDia: 1,
      diasNoMes: 12, // 3x na semana
      quantidade: 1
    },
    {
      id: "item-p-7",
      nome: "Smart TV LED 50''",
      categoria: "Entretenimento",
      icone: "tv",
      potenciaW: 120,
      minutosPorUso: 240, // 4 horas por dia
      vezesAoDia: 1,
      diasNoMes: 30,
      quantidade: 1
    },
    {
      id: "item-p-8",
      nome: "Lâmpadas LED (Casa toda)",
      categoria: "Iluminação",
      icone: "lightbulb",
      potenciaW: 10,
      minutosPorUso: 300, // 5 horas por dia
      vezesAoDia: 1,
      diasNoMes: 30,
      quantidade: 8 // 8 lâmpadas
    }
  ];

  salvarListaNoStorage();
  renderizarTabelaResidencia();
  atualizarGraficoPizza();

  if (feedback) {
    mostrarToast("Exemplo de casa padrão carregado com sucesso!");
  }
}

function atualizarBadgeAbaResidencia() {
  const badge = document.getElementById("residencia-count-badge");
  if (badge) {
    badge.textContent = state.listaResidencia.length;
  }
}

// Toast Notificações Elegantes
function mostrarToast(mensagem, tipo = "success") {
  const container = document.getElementById("toast-container");
  if (!container) return;
  const toast = document.createElement("div");
  toast.className = `toast ${tipo}`;
  toast.innerHTML = `<span>⚡</span> <span>${mensagem}</span>`;
  container.appendChild(toast);

  setTimeout(() => {
    toast.style.opacity = "0";
    toast.style.transform = "translateX(100%)";
    toast.style.transition = "all 0.3s ease";
    setTimeout(() => toast.remove(), 300);
  }, 3200);
}
