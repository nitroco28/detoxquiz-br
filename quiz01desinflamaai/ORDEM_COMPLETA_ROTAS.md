# 📍 ORDEM COMPLETA DE TODAS AS ROTAS

## 🚀 FLUXO COMPLETO DO APLICATIVO

### 1️⃣ **`/`** → WelcomePage
**Página Inicial - Boas-Vindas**
- Descrição da avaliação
- Botão "Descobrir Por Que Não Consigo Emagrecer"
- Navega para: `/quiz/0`

---

## 📋 QUIZ - PERGUNTAS EM ORDEM

### 2️⃣ **`/quiz/0`** → QuizPage
**Pergunta 1 de 15** (ID 1)
- **Pergunta**: "Qual é o seu peso atual?"
- **Tipo**: Input numérico (slider)
- **Feedback**: Nenhum
- **Próxima**: `/quiz/1`

---

### 3️⃣ **`/quiz/1`** → QuizPage
**Pergunta 2 de 15** (ID 2)
- **Pergunta**: "Qual peso você gostaria de alcançar?"
- **Tipo**: Input numérico (slider)
- **Feedback**: 💡 Feedback rápido (mensagem motivacional)
- **Próxima**: `/quiz/2`

---

### 4️⃣ **`/quiz/2`** → QuizPage
**Pergunta 3 de 15** (ID 3)
- **Pergunta**: "Qual é a sua altura?"
- **Tipo**: Input numérico (slider)
- **Feedback**: 📊 Calcula IMC automaticamente
- **Próxima**: `/quiz/3`

---

### 5️⃣ **`/quiz/3`** → QuizPage
**Pergunta 4 de 15** (ID 4)
- **Pergunta**: "Que tipo de corpo você deseja alcançar?"
- **Tipo**: Escolha visual (4 imagens)
  - Magra
  - Fortalecida
  - Tonificado
  - Com curvas
- **Feedback**: Nenhum
- **Próxima**: `/quiz/4`

---

### 6️⃣ **`/quiz/4`** → QuizPage
**Pergunta 5 de 15** (ID 5)
- **Pergunta**: "Você tem algum evento ou objetivo importante?"
- **Tipo**: Múltipla escolha (6 opções)
- **Feedback**: 💡 Feedback rápido
- **Próxima**: `/quiz/5`

---

### 7️⃣ **`/quiz/5`** → QuizPage
**Pergunta 6 de 15** (ID 6)
- **Pergunta**: "Há quanto tempo você tenta emagrecer sem sucesso?"
- **Tipo**: Múltipla escolha (3 opções)
- **Feedback**: 💡 Feedback rápido
- **Próxima**: `/quiz/6`

---

### 8️⃣ **`/quiz/6`** → QuizPage
**Pergunta 7 de 15** (ID 8)
- **Pergunta**: "Como está sua barriga durante o dia?"
- **Tipo**: Múltipla escolha (3 opções)
- **Feedback**: 💡 Feedback rápido
- **Próxima**: `/quiz/7`

---

### 9️⃣ **`/quiz/7`** → QuizPage
**Pergunta 8 de 15** (ID 9)
- **Pergunta**: "Você sente dores ou desconfortos frequentes?"
- **Tipo**: Múltipla escolha (3 opções)
- **Feedback**: 💡 Feedback rápido
- **Próxima**: `/quiz/8`

---

### 🔟 **`/quiz/8`** → QuizPage
**Pergunta 9 de 15** (ID 10)
- **Pergunta**: "Como está seu sono?"
- **Tipo**: Múltipla escolha (3 opções)
- **Feedback**: ⭐ **DEPOIMENTO** (após responder)
- **Próxima**: `/testimonial/8` → depois `/quiz/9`

---

## 💬 DEPOIMENTOS

### 1️⃣ **`/testimonial/8`** → TestimonialPage
**Depoimento da Patricia Almeida**
- **Aparece após**: Pergunta 9 (ID 10 - "Como está seu sono?")
- **Imagem**: ✅ `/images/patriciaalmeida.png`
- **Resultado**: "Acabou a insônia e voltei a ter energia"
- **Próxima**: `/quiz/9`

---

### 1️⃣1️⃣ **`/quiz/9`** → QuizPage
**Pergunta 10 de 15** (ID 11)
- **Pergunta**: "Você tem dificuldade para perder gordura na barriga e cintura?"
- **Tipo**: Múltipla escolha (3 opções)
- **Feedback**: 💡 Feedback rápido
- **Próxima**: `/quiz/10`

---

### 1️⃣2️⃣ **`/quiz/10`** → QuizPage
**Pergunta 11 de 15** (ID 12)
- **Pergunta**: "Com que frequência você come alimentos industrializados?"
- **Tipo**: Múltipla escolha (3 opções)
- **Feedback**: 💡 Feedback rápido
- **Próxima**: `/quiz/11`

---

### 1️⃣3️⃣ **`/quiz/11`** → QuizPage
**Pergunta 12 de 15** (ID 13)
- **Pergunta**: "Você sente compulsão alimentar ou ansiedade para comer?"
- **Tipo**: Múltipla escolha (3 opções)
- **Feedback**: ⭐ **DEPOIMENTO** (após responder)
- **Próxima**: `/testimonial/11` → depois `/quiz/12`

---

### 1️⃣4️⃣ **`/testimonial/11`** → TestimonialPage
**Depoimento da Camila Ferreira**
- **Aparece após**: Pergunta 12 (ID 13 - "Você sente compulsão alimentar...")
- **Imagem**: ✅ `/images/marianacosta.png`
- **Resultado**: "Zerei a compulsão por doces e perdi 15kg"
- **Próxima**: `/quiz/12`

---

### 1️⃣5️⃣ **`/quiz/12`** → QuizPage
**Pergunta 13 de 15** (ID 14)
- **Pergunta**: "Como está sua disposição no dia a dia?"
- **Tipo**: Múltipla escolha (3 opções)
- **Feedback**: 💡 Feedback rápido
- **Próxima**: `/quiz/13`

---

### 1️⃣6️⃣ **`/quiz/13`** → QuizPage
**Pergunta 14 de 15** (ID 15)
- **Pergunta**: "Sua pele está com sinais de envelhecimento ou sem viço?"
- **Tipo**: Múltipla escolha (3 opções)
- **Feedback**: 💡 Feedback rápido
- **Próxima**: `/quiz/14`

---

### 1️⃣7️⃣ **`/quiz/14`** → QuizPage
**Pergunta 15 de 15** (ID 16)
- **Pergunta**: "Como você descreveria seu metabolismo?"
- **Tipo**: Múltipla escolha (3 opções)
- **Feedback**: 💡 Feedback rápido
- **Próxima**: `/loading`

---

## 📊 PÁGINAS FINAIS

### 1️⃣8️⃣ **`/loading`** → LoadingPage
**Processando Resultados**
- Animação de loading
- Mostra progresso
- Simula processamento
- **Próxima**: `/result`

---

### 1️⃣9️⃣ **`/result`** → ResultPage
**Resultado da Avaliação**
- Mostra nível de inflamação
- Diagnóstico personalizado
- Métricas e explicações
- Botão para ver protocolo
- **Próxima**: `/protocol`

---

### 2️⃣0️⃣ **`/protocol`** → ProtocolPage
**Protocolo Detox Personalizado**
- Plano de ação detalhado
- Recomendações específicas
- Final do fluxo

---

### 2️⃣1️⃣ **`/projection`** → ProjectionPage
**Projeção de Peso** *(Opcional - não aparece no fluxo principal)*
- Gráfico de projeção de peso
- Estimativa de resultados

---

## 📊 RESUMO VISUAL

```
/ (Welcome)
  ↓
/quiz/0 → /quiz/1 → /quiz/2 → /quiz/3 → /quiz/4 → /quiz/5 → /quiz/6 → /quiz/7
  ↓
/quiz/8 → /testimonial/8 → /quiz/9 → /quiz/10 → /quiz/11 → /testimonial/11
  ↓
/quiz/12 → /quiz/13 → /quiz/14
  ↓
/loading → /result → /protocol
```

---

## 📋 LEGENDA

- 💡 = Feedback rápido (aparece na mesma página)
- ⭐ = Depoimento (redireciona para página de depoimento)
- 📊 = Calcula IMC automaticamente
- ✅ = Tem imagem configurada
- ❌ = Precisa adicionar imagem

---

## 🗺️ TOTAL DE ROTAS

**20 rotas principais:**
- 1 rota inicial (`/`)
- 15 rotas de quiz (`/quiz/0` até `/quiz/14`)
- 2 rotas de depoimentos (`/testimonial/8` e `/testimonial/11`)
- 4 rotas finais (`/loading`, `/result`, `/protocol`, `/projection`)

---

## 🔗 ROTAS DE DEPOIMENTOS (RESUMO)

| Rota | Depoimento | Imagem | Pergunta Acionadora |
|------|-----------|--------|-------------------|
| `/testimonial/8` | Patricia Almeida | ✅ `patriciaalmeida.png` | ID 10: "Como está seu sono?" |
| `/testimonial/11` | Camila Ferreira | ✅ `marianacosta.png` | ID 13: "Você sente compulsão alimentar..." |

---

## 📝 NOTAS

- Todas as rotas de quiz são dinâmicas: `/quiz/:questionId`
- Rotas de depoimentos: `/testimonial/:questionId` (parâmetro opcional para compatibilidade)
- Rota wildcard (`*`) redireciona para `/` se a rota não existir







