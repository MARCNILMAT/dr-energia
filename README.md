# ⚡ Dr. Energia - Calculadora de Consumo e Custo Elétrico Residencial

O **Dr. Energia** é um aplicativo interativo e moderno para cálculo e simulação de consumo e gastos de equipamentos elétricos residenciais em reais (R$) e quilowatt-hora (kWh).

---

## 🚀 Como Executar

Basta dar um duplo clique no arquivo **`iniciar.bat`** ou abrir o arquivo **`index.html`** diretamente em qualquer navegador (Google Chrome, Microsoft Edge, Firefox, etc.).

Não é necessária nenhuma instalação ou conexão à internet (funciona 100% offline).

---

## ✨ Principais Funcionalidades

### 1. 🎯 Cálculo Rápido por Uso Específico (Sessão Avulsa)
- Responde diretamente a perguntas práticas do dia a dia:
  - *Exemplo:* **"Quanto custa um banho de 30 minutos no chuveiro elétrico?"**
  - *Exemplo:* **"Quanto custa fazer batata frita de 20 minutos na Airfryer?"**
  - *Exemplo:* **"Quanto custa fazer uma pipoca de 3 minutos no micro-ondas?"**
  - *Exemplo:* **"Quanto custa assar um bolo de 45 minutos no forno elétrico?"**
- **Atalhos Rápidos (1 clique):** botões pré-configurados com os tempos e potências mais comuns de cada eletrodoméstico.
- **Slider e Controle Numérico:** ajuste fino de 1 minuto até várias horas.
- **Modos de Período:**
  - **Deste Uso Único:** calcula o custo exato daquela sessão e sua projeção mensal caso se repita (ex: 1x ao dia, 3x na semana).
  - **Diário:** custo por dia de funcionamento.
  - **Mensal:** projeção para o mês inteiro (30 dias).
- **Dicas do Dr. Energia:** insights comparativos e sugestões práticas de economia (ex: impacto de reduzir 10 minutos de banho ou subir 2°C no ar-condicionado).
- **Botão "Adicionar à Minha Residência":** transfere o aparelho configurado diretamente para a conta da casa.

### 2. 🏠 Simulador Residencial Completo
- Gerencie todos os aparelhos da sua residência em um só lugar.
- **Totais Consolidados:**
  - Total em R$ por mês e por dia.
  - Total de energia consumida em kWh.
  - Estimativa de custo anual (12 meses).
- **Alternador de Visão:** alterne entre **Visão Mensal** e **Visão Diária** na tabela com 1 clique.
- **Gráfico Donut Dinâmico:** distribuição percentual do consumo por categoria (Cozinha, Banheiro, Climatização, Lavanderia, etc.).
- **Ranking dos Vilões:** lista os maiores responsáveis pelo peso da sua conta de energia.
- **Botão "Carregar Casa Típica":** carrega um perfil pronto de residência brasileira para demonstração.
- **Adicionar Aparelho Personalizado:** cadastre qualquer equipamento que não esteja na lista padrão (ex: bomba de piscina, adega, etc.).
- **Imprimir / Exportar PDF:** layout otimizado para impressão ou salvar em PDF.

### 3. 💵 Configuração Realista de Tarifas
- Seleção de tarifas aproximadas por estado/concessionária (Enel SP, Light RJ, Cemig MG, Copel PR, etc.).
- Edição livre do valor em **R$/kWh** de acordo com a sua conta de luz.
- Suporte a **Bandeiras Tarifárias ANEEL** (Verde, Amarela, Vermelha 1 e Vermelha 2).
- Persistência automática no navegador (`localStorage`), sem perder seus dados ao fechar a página.

---

## 📐 Fórmulas Utilizadas

$$\text{Consumo (kWh)} = \frac{\text{Potência (Watts)}}{1000} \times \text{Tempo de Uso (Horas)}$$

$$\text{Tarifa Efetiva (R\$/kWh)} = \text{Tarifa Base} + \text{Adicional da Bandeira Tarifária}$$

$$\text{Custo Estimado (R\$)} = \text{Consumo (kWh)} \times \text{Tarifa Efetiva (R\$/kWh)}$$
