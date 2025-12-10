# 📍 Rotas de Resultados por Nível de Inflamação

## 🎯 Nova Funcionalidade

Agora existem rotas específicas para cada nível de resultado, permitindo acesso direto a cada tipo de resultado:

---

## 📋 Rotas Disponíveis

### **Rota Genérica** (mantida para compatibilidade)
- `/result` - Calcula automaticamente o nível baseado no `totalScore` do usuário

### **Rotas Específicas por Nível**

| Rota | Nível | Score Range | Porcentagem | Cor | Emoji |
|------|-------|-------------|-------------|-----|-------|
| `/result/1` | **Baixo** | 0 - 12 pontos | 20% | Verde (Emerald) | 😊 |
| `/result/2` | **Moderado** | 13 - 30 pontos | 50% | Amarelo (Amber) | 😟 |
| `/result/3` | **Alto** | 31+ pontos | 85% | Rosa (Rose) | 😰 |

---

## 🔄 Como Funciona

### **Lógica de Determinação do Nível**

A `ResultPage` agora aceita um parâmetro opcional `levelId` na URL:

1. **Se `levelId` for fornecido** (`/result/1`, `/result/2`, `/result/3`):
   - Usa o `levelId` diretamente para exibir o resultado correspondente
   - Permite acesso direto a qualquer nível, independente do score do usuário

2. **Se `levelId` NÃO for fornecido** (`/result`):
   - Calcula automaticamente baseado no `totalScore` do usuário:
     - `totalScore <= 12` → Nível 1 (Baixo)
     - `12 < totalScore <= 30` → Nível 2 (Moderado)
     - `totalScore > 30` → Nível 3 (Alto)

---

## 🚀 Fluxo de Navegação

### **Fluxo Automático (Atual)**

```
Quiz Completo
  ↓
LoadingPage (calcula levelId baseado em totalScore)
  ↓
/result/[levelId] (redirecionamento automático)
```

### **Navegação Manual**

Você pode navegar diretamente para qualquer nível:
- `http://localhost:5173/result/1` - Ver resultado Baixo
- `http://localhost:5173/result/2` - Ver resultado Moderado
- `http://localhost:5173/result/3` - Ver resultado Alto

---

## 📝 Código Implementado

### **App.jsx** (Rotas)
```jsx
<Route path="/result/:levelId?" element={<ResultPage />} />
```
- O `?` torna o `levelId` opcional
- Permite tanto `/result` quanto `/result/1`

### **ResultPage.jsx** (Lógica)
```jsx
const { levelId } = useParams()
const { totalScore, userData } = useQuiz()

const getResultData = () => {
  let levelIdNum = null
  
  // Se levelId foi fornecido na URL, usa ele
  if (levelId) {
    levelIdNum = parseInt(levelId)
  } else {
    // Caso contrário, calcula baseado no totalScore
    if (totalScore <= 12) levelIdNum = 1
    else if (totalScore <= 30) levelIdNum = 2
    else levelIdNum = 3
  }
  
  // Retorna dados baseado no levelIdNum
  switch (levelIdNum) {
    case 1: return { /* Dados Nível Baixo */ }
    case 2: return { /* Dados Nível Moderado */ }
    case 3: return { /* Dados Nível Alto */ }
  }
}
```

### **LoadingPage.jsx** (Redirecionamento)
```jsx
const getLevelId = () => {
  if (totalScore <= 12) return 1
  else if (totalScore <= 30) return 2
  else return 3
}

// Após carregar, redireciona para /result/[levelId]
navigate(`/result/${levelId}`, { replace: false })
```

---

## ✅ Benefícios

1. **Acesso Direto**: Permite testar/visualizar qualquer nível sem precisar fazer o quiz
2. **URLs Semânticas**: URLs mais descritivas (`/result/1`, `/result/2`, `/result/3`)
3. **Compatibilidade**: Mantém a rota `/result` funcionando para usuários que chegam sem levelId
4. **Testabilidade**: Facilita testes e desenvolvimento
5. **Compartilhamento**: Permite compartilhar links específicos para cada nível

---

## 🧪 Como Testar

### **Testar Rotas Específicas**:
```
http://localhost:5173/result/1  # Nível Baixo
http://localhost:5173/result/2  # Nível Moderado
http://localhost:5173/result/3  # Nível Alto
```

### **Testar Rota Genérica**:
```
http://localhost:5173/result  # Calcula automaticamente
```

### **Testar Fluxo Completo**:
1. Complete o quiz
2. LoadingPage calcula o levelId
3. Redireciona automaticamente para `/result/[levelId]`

---

## 📊 Dados de Cada Nível

### **Nível 1 - Baixo** (`/result/1`)
- **Mensagem Principal**: "Você está no caminho certo!"
- **Subtítulo**: "Seu corpo mostra poucos sinais de inflamação"
- **Porcentagem**: 20%
- **Boa Notícia**:
  - Seu metabolismo está funcionando bem
  - Você tem facilidade para manter o peso
  - Sua disposição é boa na maior parte do tempo
- **Atenção**:
  - Pequenos ajustes podem turbinar ainda mais seus resultados
  - Prevenir é sempre melhor que remediar

### **Nível 2 - Moderado** (`/result/2`)
- **Mensagem Principal**: "Seu corpo está pedindo ajuda"
- **Subtítulo**: "A inflamação está começando a atrapalhar seus resultados"
- **Porcentagem**: 50%
- **Boa Notícia**:
  - Identificar o problema agora é o melhor momento
  - Ainda dá tempo de reverter completamente
  - Muitas mulheres já passaram por isso e superaram
- **Atenção**:
  - A dificuldade para emagrecer não é culpa sua
  - O inchaço e cansaço são sinais do seu corpo
  - Sem ação, a situação tende a piorar

### **Nível 3 - Alto** (`/result/3`)
- **Mensagem Principal**: "É hora de cuidar de você"
- **Subtítulo**: "A inflamação está bloqueando seu corpo"
- **Porcentagem**: 85%
- **Boa Notícia**:
  - Você não está sozinha - milhares de mulheres já reverteram isso
  - A inflamação é 100% reversível
  - Em 30 dias você pode começar a ver mudanças reais
- **Atenção**:
  - A dificuldade extrema para emagrecer tem explicação
  - O cansaço constante não é "normal da idade"
  - Cada dia sem agir é mais inflamação acumulada

---

## 🔗 Relação com Outras Rotas

### **Rotas Relacionadas**:
- `/loading` → Calcula e redireciona para `/result/[levelId]`
- `/result/[levelId]` → CTA leva para `/protocol`
- `/protocol` → Usa dados do `ResultPage` via Context

### **Compatibilidade**:
- ✅ `/result` ainda funciona (calcula automaticamente)
- ✅ `/result/1`, `/result/2`, `/result/3` são novas rotas
- ✅ Todas as outras páginas continuam funcionando normalmente

---

## 📝 Notas Técnicas

1. **Parâmetro Opcional**: O `levelId` é opcional na rota (`:levelId?`)
2. **Fallback**: Se `levelId` não for válido, usa nível 1 (Baixo) como padrão
3. **Context Preservado**: O `totalScore` e `userData` continuam sendo usados para outras partes da página
4. **URLs Persistentes**: As URLs específicas permitem bookmark e compartilhamento

---

**Última atualização**: Implementado com sucesso ✅
**Status**: Todas as rotas funcionando corretamente







