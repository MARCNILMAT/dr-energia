/**
 * Dr. Energia - Base de dados de equipamentos elétricos residenciais típicos
 * Contém potência média em Watts, categoria, ícones e presets de uso comum.
 */

const EQUIPAMENTOS_PADRAO = [
  // --- BANHEIRO ---
  {
    id: "chuveiro-inverno",
    nome: "Chuveiro Elétrico (Potência Máx / Inverno)",
    categoria: "Banheiro",
    icone: "shower",
    potenciaPadrao: 5500,
    potenciaMin: 4500,
    potenciaMax: 7800,
    descricao: "Um dos maiores vilões da conta de luz em potência máxima.",
    presets: [
      { rotulo: "Banho Rápido (10 min)", minutos: 10 },
      { rotulo: "Banho Normal (15 min)", minutos: 15 },
      { rotulo: "Banho Demorado (30 min)", minutos: 30 },
      { rotulo: "Banho 45 min", minutos: 45 }
    ]
  },
  {
    id: "chuveiro-verao",
    nome: "Chuveiro Elétrico (Modo Verão / Médio)",
    categoria: "Banheiro",
    icone: "shower",
    potenciaPadrao: 3500,
    potenciaMin: 2500,
    potenciaMax: 4500,
    descricao: "Modo econômico ou morno, gasta cerca de 30% a 40% menos.",
    presets: [
      { rotulo: "Banho Rápido (10 min)", minutos: 10 },
      { rotulo: "Banho Normal (15 min)", minutos: 15 },
      { rotulo: "Banho Demorado (30 min)", minutos: 30 }
    ]
  },
  {
    id: "secador-cabelo",
    nome: "Secador de Cabelo",
    categoria: "Banheiro",
    icone: "wind",
    potenciaPadrao: 2000,
    potenciaMin: 1200,
    potenciaMax: 2600,
    descricao: "Uso pontual mas com alta potência de aquecimento.",
    presets: [
      { rotulo: "Secagem Rápida (5 min)", minutos: 5 },
      { rotulo: "Secagem Normal (15 min)", minutos: 15 },
      { rotulo: "Escova / Penteado (30 min)", minutos: 30 }
    ]
  },
  {
    id: "prancha-cabelo",
    nome: "Chapinha / Prancha de Cabelo",
    categoria: "Banheiro",
    icone: "zap",
    potenciaPadrao: 60,
    potenciaMin: 40,
    potenciaMax: 100,
    descricao: "Potência moderada.",
    presets: [
      { rotulo: "Retoque (10 min)", minutos: 10 },
      { rotulo: "Pranchado Completo (30 min)", minutos: 30 },
      { rotulo: "Sessão Completa (45 min)", minutos: 45 }
    ]
  },

  // --- COZINHA ---
  {
    id: "airfryer",
    nome: "Fritadeira Elétrica (Airfryer)",
    categoria: "Cozinha",
    icone: "flame",
    potenciaPadrao: 1500,
    potenciaMin: 1200,
    potenciaMax: 2000,
    descricao: "Muito prática, com potência concentrada.",
    presets: [
      { rotulo: "Aquecer lanche / pão (8 min)", minutos: 8 },
      { rotulo: "Batata frita congelada (20 min)", minutos: 20 },
      { rotulo: "Pão de queijo (15 min)", minutos: 15 },
      { rotulo: "Frango assado / carne (35 min)", minutos: 35 },
      { rotulo: "Receita completa (45 min)", minutos: 45 }
    ]
  },
  {
    id: "micro-ondas",
    nome: "Forno Micro-ondas",
    categoria: "Cozinha",
    icone: "microwave",
    potenciaPadrao: 1200,
    potenciaMin: 800,
    potenciaMax: 1600,
    descricao: "Uso em tiros curtos de alta potência.",
    presets: [
      { rotulo: "Aquecer prato (2 min)", minutos: 2 },
      { rotulo: "Fazer Pipoca (3 min)", minutos: 3 },
      { rotulo: "Aquecer leite / café (1 min)", minutos: 1 },
      { rotulo: "Descongelar carne (10 min)", minutos: 10 },
      { rotulo: "Cozimento completo (20 min)", minutos: 20 }
    ]
  },
  {
    id: "forno-eletrico",
    nome: "Forno Elétrico de Bancada ou Embutir",
    categoria: "Cozinha",
    icone: "oven",
    potenciaPadrao: 1800,
    potenciaMin: 1400,
    potenciaMax: 3000,
    descricao: "Excelente para assados, requer pré-aquecimento.",
    presets: [
      { rotulo: "Pizza pré-pronta (20 min)", minutos: 20 },
      { rotulo: "Torta ou Lasanha (35 min)", minutos: 35 },
      { rotulo: "Assar Bolo (45 min)", minutos: 45 },
      { rotulo: "Assado Longo / Carne (1h 30 min)", minutos: 90 },
      { rotulo: "Assado Especial (2 horas)", minutos: 120 }
    ]
  },
  {
    id: "geladeira-duplex",
    nome: "Geladeira Frost Free Duplex (Ligada 24h)",
    categoria: "Cozinha",
    icone: "refrigerator",
    potenciaPadrao: 200,
    potenciaMin: 120,
    potenciaMax: 350,
    descricao: "O compressor liga cerca de 10 a 12 horas por dia no total.",
    presets: [
      { rotulo: "Média diária efetiva (10 horas)", minutos: 600 },
      { rotulo: "Média diária efetiva (12 horas)", minutos: 720 },
      { rotulo: "Verão / Uso intenso (14 horas)", minutos: 840 }
    ]
  },
  {
    id: "cooktop-inducao",
    nome: "Cooktop por Indução (2 bocas ativas)",
    categoria: "Cozinha",
    icone: "utensils",
    potenciaPadrao: 3000,
    potenciaMin: 1500,
    potenciaMax: 7000,
    descricao: "Alta eficiência, porém potência elétrica elevada.",
    presets: [
      { rotulo: "Ferver água / café (5 min)", minutos: 5 },
      { rotulo: "Refeição rápida (20 min)", minutos: 20 },
      { rotulo: "Almoço completo (45 min)", minutos: 45 },
      { rotulo: "Preparo demorado (1h 15 min)", minutos: 75 }
    ]
  },
  {
    id: "lava-loucas",
    nome: "Lava-Louças",
    categoria: "Cozinha",
    icone: "utensils",
    potenciaPadrao: 1500,
    potenciaMin: 1200,
    potenciaMax: 2200,
    descricao: "Aquece a água internamente, ciclo dura 1h a 2h30.",
    presets: [
      { rotulo: "Ciclo Rápido / Eco (40 min)", minutos: 40 },
      { rotulo: "Ciclo Normal (1h 30 min)", minutos: 90 },
      { rotulo: "Ciclo Pesado (2h 15 min)", minutos: 135 }
    ]
  },
  {
    id: "cafeteira-eletrica",
    nome: "Cafeteira Elétrica / Expresso",
    categoria: "Cozinha",
    icone: "coffee",
    potenciaPadrao: 1000,
    potenciaMin: 600,
    potenciaMax: 1500,
    descricao: "Aquecimento rápido de água.",
    presets: [
      { rotulo: "Passar 1 café expresso (2 min)", minutos: 2 },
      { rotulo: "Passar jarra de café (10 min)", minutos: 10 },
      { rotulo: "Jarra mantida aquecida (40 min)", minutos: 40 }
    ]
  },
  {
    id: "sanduicheira",
    nome: "Sanduicheira / Grill Elétrico",
    categoria: "Cozinha",
    icone: "sandwich",
    potenciaPadrao: 800,
    potenciaMin: 650,
    potenciaMax: 1400,
    descricao: "Prepara lanches em minutos.",
    presets: [
      { rotulo: "Tostar 1 misto quente (5 min)", minutos: 5 },
      { rotulo: "Dois lanches seguidos (10 min)", minutos: 10 },
      { rotulo: "Grelhar hambúrguer / frango (18 min)", minutos: 18 }
    ]
  },

  // --- CLIMATIZAÇÃO & CONFORTO ---
  {
    id: "ar-inverter-9000",
    nome: "Ar Condicionado Inverter 9.000 BTUs",
    categoria: "Climatização",
    icone: "snowflake",
    potenciaPadrao: 800,
    potenciaMin: 500,
    potenciaMax: 1100,
    descricao: "Consumo moderado pelo motor inverter que ajusta a rotação.",
    presets: [
      { rotulo: "Refrescar a tarde (4 horas)", minutos: 240 },
      { rotulo: "Noite inteira de sono (8 horas)", minutos: 480 },
      { rotulo: "Home office o dia todo (10 horas)", minutos: 600 }
    ]
  },
  {
    id: "ar-inverter-12000",
    nome: "Ar Condicionado Inverter 12.000 BTUs",
    categoria: "Climatização",
    icone: "snowflake",
    potenciaPadrao: 1100,
    potenciaMin: 700,
    potenciaMax: 1400,
    descricao: "Comum em quartos médios ou salas pequenas.",
    presets: [
      { rotulo: "Tarde de verão (4 horas)", minutos: 240 },
      { rotulo: "Noite inteira de sono (8 horas)", minutos: 480 },
      { rotulo: "Uso contínuo (12 horas)", minutos: 720 }
    ]
  },
  {
    id: "ar-convencional-12000",
    nome: "Ar Condicionado Convencional (Liga/Desliga) 12.000 BTUs",
    categoria: "Climatização",
    icone: "snowflake",
    potenciaPadrao: 1400,
    potenciaMin: 1200,
    potenciaMax: 1800,
    descricao: "Gasta de 30% a 50% a mais do que o modelo Inverter.",
    presets: [
      { rotulo: "Tarde de verão (4 horas)", minutos: 240 },
      { rotulo: "Noite inteira de sono (8 horas)", minutos: 480 },
      { rotulo: "Dia todo (10 horas)", minutos: 600 }
    ]
  },
  {
    id: "ventilador",
    nome: "Ventilador de Mesa ou Teto",
    categoria: "Climatização",
    icone: "fan",
    potenciaPadrao: 80,
    potenciaMin: 50,
    potenciaMax: 140,
    descricao: "Consumo muito menor que ar-condicionado.",
    presets: [
      { rotulo: "Descanso da tarde (3 horas)", minutos: 180 },
      { rotulo: "Dormir a noite toda (8 horas)", minutos: 480 },
      { rotulo: "Ligado quase o dia todo (14 horas)", minutos: 840 }
    ]
  },
  {
    id: "aquecedor-ambiente",
    nome: "Aquecedor de Ar Elétrico / Termoventilador",
    categoria: "Climatização",
    icone: "sun",
    potenciaPadrao: 1500,
    potenciaMin: 1000,
    potenciaMax: 2000,
    descricao: "Muito exigente em dias frios.",
    presets: [
      { rotulo: "Aquecer quarto antes de dormir (1 hora)", minutos: 60 },
      { rotulo: "Noite fria (4 horas)", minutos: 240 },
      { rotulo: "Uso prolongado (8 horas)", minutos: 480 }
    ]
  },

  // --- ÁREA DE SERVIÇO & LAVANDERIA ---
  {
    id: "maquina-lavar",
    nome: "Máquina de Lavar Roupas (Água Fria)",
    categoria: "Lavanderia",
    icone: "shirt",
    potenciaPadrao: 500,
    potenciaMin: 350,
    potenciaMax: 800,
    descricao: "Motor e centrifugação sem aquecimento de água.",
    presets: [
      { rotulo: "Lavagem Rápida (30 min)", minutos: 30 },
      { rotulo: "Lavagem Normal / Dia a dia (1 hora)", minutos: 60 },
      { rotulo: "Lavagem Pesada / Edredom (1h 45 min)", minutos: 105 }
    ]
  },
  {
    id: "maquina-lava-seca",
    nome: "Lava e Seca (Ciclo Completo com Secagem)",
    categoria: "Lavanderia",
    icone: "shirt",
    potenciaPadrao: 2000,
    potenciaMin: 1500,
    potenciaMax: 2500,
    descricao: "A resistência de ar quente para secar gasta bastante energia.",
    presets: [
      { rotulo: "Apenas secar carga pequena (1 hora)", minutos: 60 },
      { rotulo: "Ciclo Lavar + Secar Completo (3 horas)", minutos: 180 },
      { rotulo: "Carga pesada lavar + secar (4 horas)", minutos: 240 }
    ]
  },
  {
    id: "ferro-passar",
    nome: "Ferro de Passar Roupas (Vapor/Seco)",
    categoria: "Lavanderia",
    icone: "iron",
    potenciaPadrao: 1200,
    potenciaMin: 1000,
    potenciaMax: 2000,
    descricao: "Resistência de alta potência para gerar vapor.",
    presets: [
      { rotulo: "Passar uma camisa / pressa (10 min)", minutos: 10 },
      { rotulo: "Pouca roupa (30 min)", minutos: 30 },
      { rotulo: "Lote de roupas da semana (1 hora)", minutos: 60 },
      { rotulo: "Sessão grande de passar (1h 30 min)", minutos: 90 }
    ]
  },

  // --- ENTRETENIMENTO & ESCRITÓRIO ---
  {
    id: "tv-led-50",
    nome: "Smart TV LED 50'' a 55''",
    categoria: "Entretenimento",
    icone: "tv",
    potenciaPadrao: 120,
    potenciaMin: 80,
    potenciaMax: 180,
    descricao: "Consumo depende do brilho e tecnologia do painel.",
    presets: [
      { rotulo: "Assistir Jornal / Episódio (1 hora)", minutos: 60 },
      { rotulo: "Assistir a um Filme (2 horas)", minutos: 120 },
      { rotulo: "Tarde de Maratonar Séries (5 horas)", minutos: 300 },
      { rotulo: "Ligada o dia todo (8 horas)", minutos: 480 }
    ]
  },
  {
    id: "videogame",
    nome: "Console de Videogame (PS5, Xbox Series, PC Gamer)",
    categoria: "Entretenimento",
    icone: "gamepad",
    potenciaPadrao: 200,
    potenciaMin: 140,
    potenciaMax: 350,
    descricao: "Consumo varia de acordo com o peso gráfico do jogo.",
    presets: [
      { rotulo: "Partida rápida (1 hora)", minutos: 60 },
      { rotulo: "Sessão de jogos (3 horas)", minutos: 180 },
      { rotulo: "Maratona gamer fim de semana (6 horas)", minutos: 360 }
    ]
  },
  {
    id: "computador-pc",
    nome: "Computador Desktop / PC Gamer",
    categoria: "Escritório",
    icone: "monitor",
    potenciaPadrao: 300,
    potenciaMin: 150,
    potenciaMax: 650,
    descricao: "Gabinete + monitor.",
    presets: [
      { rotulo: "Estudo ou navegação (2 horas)", minutos: 120 },
      { rotulo: "Expediente de trabalho (8 horas)", minutos: 480 },
      { rotulo: "Trabalho + Jogos (10 horas)", minutos: 600 }
    ]
  },
  {
    id: "notebook",
    nome: "Notebook / Laptop",
    categoria: "Escritório",
    icone: "laptop",
    potenciaPadrao: 65,
    potenciaMin: 45,
    potenciaMax: 120,
    descricao: "Extremamente econômico comparado ao desktop.",
    presets: [
      { rotulo: "Uso breve (2 horas)", minutos: 120 },
      { rotulo: "Jornada de trabalho (8 horas)", minutos: 480 },
      { rotulo: "Uso estendido (12 horas)", minutos: 720 }
    ]
  },

  // --- ILUMINAÇÃO & DIVERSOS ---
  {
    id: "lampada-led",
    nome: "Lâmpada LED (9W a 12W)",
    categoria: "Iluminação",
    icone: "lightbulb",
    potenciaPadrao: 10,
    potenciaMin: 6,
    potenciaMax: 20,
    descricao: "Alta eficiência luminosa com baixíssimo consumo.",
    presets: [
      { rotulo: "Uso noturno em 1 cômodo (4 horas)", minutos: 240 },
      { rotulo: "Acensa a noite toda (8 horas)", minutos: 480 }
    ]
  },
  {
    id: "aspirador-po",
    nome: "Aspirador de Pó",
    categoria: "Diversos",
    icone: "zap",
    potenciaPadrao: 1400,
    potenciaMin: 1000,
    potenciaMax: 1800,
    descricao: "Motor de alta sucção, uso esporádico.",
    presets: [
      { rotulo: "Limpeza rápida de 1 cômodo (10 min)", minutos: 10 },
      { rotulo: "Faxina padrão (25 min)", minutos: 25 },
      { rotulo: "Faxina pesada completa (45 min)", minutos: 45 }
    ]
  }
];

// Bandeiras Tarifárias ANEEL vigentes de referência
const BANDEIRAS_TARIFARIAS = [
  { id: "verde", nome: "Bandeira Verde", adicional: 0.000, cor: "#10b981", descricao: "Condições favoráveis de geração. Sem acréscimo." },
  { id: "amarela", nome: "Bandeira Amarela", adicional: 0.01885, cor: "#f59e0b", descricao: "Condições de geração menos favoráveis (+R$ 0,0188/kWh)." },
  { id: "vermelha1", nome: "Bandeira Vermelha Patamar 1", adicional: 0.04463, cor: "#ef4444", descricao: "Condições mais custosas de geração (+R$ 0,0446/kWh)." },
  { id: "vermelha2", nome: "Bandeira Vermelha Patamar 2", adicional: 0.07877, cor: "#dc2626", descricao: "Geração térmica elevada (+R$ 0,0787/kWh)." }
];

// Tarifas médias de referência por Estado/Distribuidora (base de consulta aproximada)
const TARIFAS_REFERENCIA_REGIAO = [
  { regiao: "Média Brasil (Geral)", tarifa: 0.85 },
  { regiao: "São Paulo (Enel / CPFL)", tarifa: 0.82 },
  { regiao: "Rio de Janeiro (Light / Enel)", tarifa: 0.98 },
  { regiao: "Minas Gerais (Cemig)", tarifa: 0.89 },
  { regiao: "Paraná (Copel)", tarifa: 0.77 },
  { regiao: "Rio Grande do Sul (CPFL / CEEE)", tarifa: 0.88 },
  { regiao: "Bahia (Coelba)", tarifa: 0.94 },
  { regiao: "Pernambuco (Neoenergia)", tarifa: 0.92 },
  { regiao: "Ceará (Enel CE)", tarifa: 0.91 },
  { regiao: "Distrito Federal (Neoenergia Brasília)", tarifa: 0.83 }
];
