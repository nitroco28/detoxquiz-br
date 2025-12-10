# 🧮 Como é Calculado o Grau de Inflamação

## 📊 Sistema de Pontuação

O grau de inflamação do usuário é calculado através de um **sistema de pontuação acumulativa** baseado nas respostas do quiz.

---

## 🔢 Processo de Cálculo

### 1. **Coleta de Pontos por Pergunta**

Cada resposta selecionada no quiz possui um valor `score` atribuído:
- **Score 0**: Resposta indicando baixa ou nenhuma inflamação
- **Score 2-3**: Resposta indicando inflamação moderada
- **Score 4-5**: Resposta indicando inflamação alta

### 2. **Soma Total (totalScore)**

Os pontos são somados conforme o usuário responde:

```javascript
// Em QuizPage.jsx - handleOptionClick
if (option.score !== undefined) {
  setTotalScore(prev => prev + option.score)
}
```

**Nota**: Apenas perguntas que têm opções com `score` definido contribuem para o total. Perguntas sem `score` (como peso, altura, tipo de corpo) não afetam o cálculo.

---

## 📝 Perguntas que Contribuem para o Score

### **Pergunta 6** (ID: 6) - "Há quanto tempo você tenta emagrecer sem sucesso?"
- `score: 0` - Não estou tentando emagrecer no momento
- `score: 3` - Há alguns meses, com resultados lentos
- `score: 5` - Anos tentando, mas o peso sempre volta

### **Pergunta 7** (ID: 8) - "Como está sua barriga durante o dia?"
- `score: 0` - Normal, sem inchaço
- `score: 3` - Acordo bem, mas incha após as refeições
- `score: 5` - Vivo inchada, parece que estou grávida

### **Pergunta 8** (ID: 9) - "Você sente dores ou desconfortos frequentes?"
- `score: 0` - Não, me sinto bem
- `score: 2` - Às vezes, dores leves
- `score: 4` - Sim, dores frequentes em articulações ou músculos

### **Pergunta 9** (ID: 10) - "Como está seu sono?"
- `score: 0` - Durmo bem e acordo descansada
- `score: 2` - Durmo, mas acordo cansada
- `score: 5` - Insônia ou sono muito agitado

### **Pergunta 10** (ID: 11) - "Você tem dificuldade para perder gordura na barriga?"
- `score: 0` - Não, perco peso proporcionalmente
- `score: 3` - Um pouco, é a última parte a emagrecer
- `score: 5` - Sim, a barriga não diminui de jeito nenhum

### **Pergunta 11** (ID: 12) - "Com que frequência você come alimentos industrializados?"
- `score: 0` - Raramente, cozinho em casa
- `score: 3` - 3 a 4 vezes na semana
- `score: 5` - Quase todos os dias

### **Pergunta 12** (ID: 13) - "Você sente compulsão alimentar?"
- `score: 0` - Não, como quando tenho fome
- `score: 3` - Às vezes, principalmente à noite
- `score: 5` - Sim, tenho compulsão constante

### **Pergunta 13** (ID: 14) - "Como está sua disposição no dia a dia?"
- `score: 0` - Tenho energia o dia todo
- `score: 3` - Começo bem, mas canso à tarde
- `score: 5` - Vivo exausta, sem energia para nada

### **Pergunta 14** (ID: 15) - "Sua pele está com sinais de envelhecimento?"
- `score: 0` - Não, minha pele está saudável
- `score: 2` - Um pouco, notei mudanças recentes
- `score: 4` - Sim, pele sem vida, flácida ou com acne

### **Pergunta 15** (ID: 16) - "Como você descreveria seu metabolismo?"
- `score: 0` - Rápido, emagreço com facilidade
- `score: 2` - Normal, preciso me esforçar
- `score: 5` - Travado, não emagreço nem com dieta

---

## 📊 Score Máximo e Mínimo

### **Score Mínimo**: 0 pontos
- Quando todas as respostas indicam baixa inflamação

### **Score Máximo**: ~56 pontos (aproximado)
- Quando todas as respostas indicam inflamação alta
- Cálculo: 5+5+4+5+5+5+5+5+4+5 = 48 (com margem de variação)

### **Score Real Máximo Possível**: 50 pontos
- Somando todos os scores máximos de cada pergunta

---

## 🎯 Classificação por Nível de Inflamação

O `totalScore` é convertido em 3 níveis de inflamação na página de resultados:

### **1. Nível BAIXO** (totalScore ≤ 12)
```javascript
if (totalScore <= 12) {
  level: 'Baixo'
  percentage: 20%
  emoji: '😊'
  color: 'emerald'
}
```
- **Faixa de Score**: 0 a 12 pontos
- **Interpretação**: Poucos sinais de inflamação
- **Mensagem**: "Você está no caminho certo!"

### **2. Nível MODERADO** (12 < totalScore ≤ 30)
```javascript
else if (totalScore <= 30) {
  level: 'Moderado'
  percentage: 50%
  emoji: '😟'
  color: 'amber'
}
```
- **Faixa de Score**: 13 a 30 pontos
- **Interpretação**: Inflamação começando a atrapalhar
- **Mensagem**: "Seu corpo está pedindo ajuda"

### **3. Nível ALTO** (totalScore > 30)
```javascript
else {
  level: 'Alto'
  percentage: 85%
  emoji: '😰'
  color: 'rose'
}
```
- **Faixa de Score**: 31+ pontos
- **Interpretação**: Inflamação bloqueando o corpo
- **Mensagem**: "É hora de cuidar de você"

---

## 📈 Porcentagem de Inflamação

A porcentagem exibida na página de resultados **não é calculada diretamente** do score, mas é fixa para cada nível:

| Nível | Score Range | Porcentagem Exibida |
|-------|-------------|---------------------|
| Baixo | 0-12 | 20% |
| Moderado | 13-30 | 50% |
| Alto | 31+ | 85% |

**Nota**: A porcentagem é mais um indicador visual do que um cálculo exato. Representa a "gravidade" percebida do nível de inflamação.

---

## 🔍 Perguntas que NÃO Contribuem para o Score

Algumas perguntas do quiz **não têm score** e são usadas apenas para personalização:

1. **Pergunta 1** (ID: 1) - Peso atual (`type: "weight"`)
   - Usada para calcular IMC e mostrar objetivo

2. **Pergunta 2** (ID: 2) - Peso objetivo (`type: "goalWeight"`)
   - Usada para calcular quantos kg deseja perder

3. **Pergunta 3** (ID: 3) - Altura (`type: "height"`)
   - Usada para calcular IMC

4. **Pergunta 4** (ID: 4) - Tipo de corpo (`type: "bodyGoal"`)
   - Usada para personalização visual

5. **Pergunta 5** (ID: 5) - Evento/objetivo importante (`type: "motivation"`)
   - Usada para personalização e motivação

---

## 💾 Armazenamento do Score

O `totalScore` é armazenado em:
1. **QuizContext** (estado global React)
2. **localStorage** (persistência entre sessões)

```javascript
// Em QuizContext.jsx
useEffect(() => {
  localStorage.setItem('quizState', JSON.stringify({
    currentQuestion,
    totalScore,  // <-- Score salvo aqui
    userData
  }))
}, [currentQuestion, totalScore, userData])
```

---

## 🧪 Exemplos Práticos

### Exemplo 1: Score Baixo (8 pontos)
```
Pergunta 6: score 0 (não tenta emagrecer)
Pergunta 7: score 3 (incha após refeições)
Pergunta 8: score 2 (dores leves)
Pergunta 9: score 0 (dorme bem)
Pergunta 10: score 3 (um pouco de dificuldade)
Pergunta 11: score 0 (cozinha em casa)
Pergunta 12: score 0 (come quando tem fome)
Pergunta 13: score 0 (energia o dia todo)
Pergunta 14: score 0 (pele saudável)
Pergunta 15: score 0 (metabolismo rápido)
─────────────────────────────────
TOTAL: 8 pontos → Nível BAIXO (20%)
```

### Exemplo 2: Score Moderado (25 pontos)
```
Pergunta 6: score 5 (anos tentando)
Pergunta 7: score 5 (vive inchada)
Pergunta 8: score 4 (dores frequentes)
Pergunta 9: score 2 (acorda cansada)
Pergunta 10: score 3 (um pouco de dificuldade)
Pergunta 11: score 3 (3-4x por semana)
Pergunta 12: score 3 (às vezes compulsão)
Pergunta 13: score 0 (energia o dia todo)
Pergunta 14: score 0 (pele saudável)
Pergunta 15: score 0 (metabolismo rápido)
─────────────────────────────────
TOTAL: 25 pontos → Nível MODERADO (50%)
```

### Exemplo 3: Score Alto (42 pontos)
```
Pergunta 6: score 5 (anos tentando)
Pergunta 7: score 5 (vive inchada)
Pergunta 8: score 4 (dores frequentes)
Pergunta 9: score 5 (insônia)
Pergunta 10: score 5 (barriga não diminui)
Pergunta 11: score 5 (quase todos os dias)
Pergunta 12: score 5 (compulsão constante)
Pergunta 13: score 5 (vive exausta)
Pergunta 14: score 4 (pele sem vida)
Pergunta 15: score 5 (metabolismo travado)
─────────────────────────────────
TOTAL: 47 pontos → Nível ALTO (85%)
```

---

## 🔧 Como Modificar o Sistema

### Para Ajustar os Limites dos Níveis:

Edite `ResultPage.jsx`, função `getResultData()`:

```javascript
// Atual (12, 30)
if (totalScore <= 12) { /* Baixo */ }
else if (totalScore <= 30) { /* Moderado */ }
else { /* Alto */ }

// Exemplo: limites mais restritivos (10, 25)
if (totalScore <= 10) { /* Baixo */ }
else if (totalScore <= 25) { /* Moderado */ }
else { /* Alto */ }
```

### Para Modificar Scores das Perguntas:

Edite `quizData.js`, alterando os valores `score` nas opções:

```javascript
{
  id: 10,
  question: "Como está seu sono?",
  options: [
    { text: "Durmo bem", score: 0 },
    { text: "Acordo cansada", score: 2 },  // <-- Modificar aqui
    { text: "Insônia", score: 5 }          // <-- Modificar aqui
  ]
}
```

### Para Calcular Porcentagem Dinâmica:

Em vez de valores fixos (20%, 50%, 85%), calcule baseado no score máximo:

```javascript
const maxScore = 50  // Score máximo possível
const percentage = Math.min(100, Math.round((totalScore / maxScore) * 100))
```

---

## 📋 Resumo

| Aspecto | Detalhes |
|---------|----------|
| **Método** | Soma acumulativa de scores |
| **Perguntas Avaliadas** | 10 perguntas (das 15 totais) |
| **Score Range** | 0 a ~50 pontos |
| **Níveis** | 3 níveis (Baixo, Moderado, Alto) |
| **Limites** | ≤12 (Baixo), 13-30 (Moderado), 31+ (Alto) |
| **Porcentagem** | Fixa por nível (20%, 50%, 85%) |
| **Persistência** | localStorage + Context |

---

**Última atualização**: Baseado no código atual em `ResultPage.jsx` e `quizData.js`







