# 📍 Rotas Completas do Projeto DetoxFunnel

## 🎯 Rotas Principais (Estáticas)

| Rota | Componente | Descrição | Quando Acessar |
|------|-----------|-----------|----------------|
| `/` | `WelcomePage` | Página inicial de boas-vindas | Entrada do usuário |
| `/loading` | `LoadingPage` | Tela de carregamento | Após completar todas as perguntas do quiz |
| `/projection` | `ProjectionPage` | Projeção de resultados (se ainda estiver ativa) | Após loading (pode estar removida) |
| `/result` | `ResultPage` | Página de resultados do quiz (calcula automaticamente) | Após quiz completo |
| `/result/1` | `ResultPage` | Resultado Nível Baixo (0-12 pontos) | Acesso direto ou automático |
| `/result/2` | `ResultPage` | Resultado Nível Moderado (13-30 pontos) | Acesso direto ou automático |
| `/result/3` | `ResultPage` | Resultado Nível Alto (31+ pontos) | Acesso direto ou automático |
| `/protocol` | `ProtocolPage` | Protocolo personalizado | Após visualizar resultados |

---

## 📝 Rotas Dinâmicas do Quiz

### Rotas de Perguntas do Quiz
**Padrão**: `/quiz/:questionId`

O `questionId` é o **índice da pergunta** (0-based).

#### Todas as Perguntas Disponíveis:

| Rota | Índice | ID | Pergunta | Tipo |
|------|--------|----|----------|------| 
| `/quiz/0` | 0 | 1 | "Qual é o seu peso atual?" | `weight` |
| `/quiz/1` | 1 | 2 | "Qual peso você gostaria de alcançar?" | `goalWeight` |
| `/quiz/2` | 2 | 3 | "Qual é a sua altura?" | `height` |
| `/quiz/3` | 3 | 4 | "Que tipo de corpo você deseja alcançar?" | `bodyGoal` |
| `/quiz/4` | 4 | 5 | "Você tem algum evento ou objetivo importante?" | - |
| `/quiz/5` | 5 | 6 | "Há quanto tempo você tenta emagrecer sem sucesso?" | - |
| `/quiz/6` | 6 | 8 | "Como está sua barriga durante o dia?" | - |
| `/quiz/7` | 7 | 9 | "Você sente dores ou desconfortos frequentes?" | - |
| `/quiz/8` | 8 | 10 | "Como está seu sono?" | - |
| `/quiz/9` | 9 | 11 | "Você tem dificuldade para perder gordura na barriga e cintura?" | - |
| `/quiz/10` | 10 | 12 | "Com que frequência você come alimentos industrializados?" | - |
| `/quiz/11` | 11 | 13 | "Você sente compulsão alimentar ou ansiedade para comer?" | - |
| `/quiz/12` | 12 | 14 | "Como está sua disposição no dia a dia?" | - |
| `/quiz/13` | 13 | 15 | "Sua pele está com sinais de envelhecimento ou sem viço?" | - |
| `/quiz/14` | 14 | 16 | "Como você descreveria seu metabolismo?" | - |

**Total de Perguntas**: 15 perguntas (índices 0-14)

---

## 💬 Rotas de Depoimentos (Testimonials)

**Padrão**: `/testimonial/:questionId?`

O `questionId` é **opcional** e representa o **índice da pergunta** que acionou o depoimento.

### Depoimentos Ativos:

| Rota | Pergunta (Índice/ID) | Depoimento Exibido | Quando Acontece |
|------|---------------------|-------------------|-----------------|
| `/testimonial/8` | Pergunta 9 (ID: 10)<br/>"Como está seu sono?" | Patricia Almeida<br/>"Acabou a insônia e perdi peso após desinflamar" | Após responder pergunta sobre sono |
| `/testimonial/11` | Pergunta 12 (ID: 13)<br/>"Você sente compulsão alimentar?" | Camila Ferreira<br/>"Zerei a compulsão por doces e perdi 15kg" | Após responder sobre compulsão alimentar |

### Nota sobre Depoimentos:
- O depoimento é exibido quando uma pergunta tem `feedbackType: "testimonial"`
- O `questionId` na URL corresponde ao **índice da pergunta** que acionou o depoimento
- O mapeamento entre pergunta e depoimento está em `testimonialMapping` em `quizData.js`

---

## 🔄 Fluxo Completo de Navegação

### Fluxo Típico do Usuário:

```
1. / (WelcomePage)
   ↓ [Clique em Começar]
   
2. /quiz/0 (Pergunta 1: Peso atual)
   ↓ [Seleciona peso]
   
3. /quiz/1 (Pergunta 2: Peso objetivo)
   ↓ [Seleciona peso objetivo]
   
4. /quiz/2 (Pergunta 3: Altura)
   ↓ [Seleciona altura]
   
5. /quiz/3 (Pergunta 4: Tipo de corpo)
   ↓ [Seleciona opção]
   
6. /quiz/4 (Pergunta 5: Evento importante)
   ↓ [Seleciona opção]
   
7. /quiz/5 (Pergunta 6: Tempo tentando emagrecer)
   ↓ [Seleciona opção]
   
8. /quiz/6 (Pergunta 7: Inchaço abdominal)
   ↓ [Seleciona opção]
   
9. /quiz/7 (Pergunta 8: Dores ou desconfortos)
   ↓ [Seleciona opção]
   
10. /quiz/8 (Pergunta 9: Sono)
    ↓ [Seleciona opção]
    
11. /testimonial/8 (Depoimento da Patricia - sobre sono)
    ↓ [Clica em Continuar]
    
12. /quiz/9 (Pergunta 10: Barriga não diminui)
    ↓ [Seleciona opção]
    
13. /quiz/10 (Pergunta 11: Come fora de casa)
    ↓ [Seleciona opção]
    
14. /quiz/11 (Pergunta 12: Compulsão alimentar)
    ↓ [Seleciona opção]
    
15. /testimonial/11 (Depoimento da Camila - sobre compulsão)
    ↓ [Clica em Continuar]
    
16. /quiz/12 (Pergunta 13: Nível de energia)
    ↓ [Seleciona opção]
    
17. /quiz/13 (Pergunta 14: Pele)
    ↓ [Seleciona opção]
    
18. /quiz/14 (Pergunta 15: Metabolismo)
    ↓ [Seleciona opção]
    
19. /loading (Tela de carregamento)
    ↓ [Após alguns segundos]
    
20. /result (Página de Resultados)
    ↓ [Clica em Ver Protocolo]
    
21. /protocol (Protocolo Personalizado)
```

---

## 📋 Resumo Rápido

### Rotas Estáticas:
- `/` - Página inicial
- `/loading` - Carregamento
- `/result` - Resultados
- `/protocol` - Protocolo

### Rotas Dinâmicas:
- `/quiz/0` até `/quiz/14` - 15 perguntas do quiz
- `/testimonial/8` - Depoimento após pergunta sobre sono
- `/testimonial/11` - Depoimento após pergunta sobre compulsão

### Rota Catch-All:
- `*` - Qualquer rota não encontrada redireciona para `/`

---

## 🔍 Como Testar Rotas Específicas

### Testar uma Pergunta Específica:
```
http://localhost:5173/quiz/0  (Primeira pergunta)
http://localhost:5173/quiz/3  (Pergunta 4 - Tipo de corpo)
http://localhost:5173/quiz/8  (Pergunta 9 - Sono)
```

### Testar um Depoimento:
```
http://localhost:5173/testimonial/8   (Depoimento da Patricia)
http://localhost:5173/testimonial/11  (Depoimento da Camila)
```

### Testar Páginas Finais:
```
http://localhost:5173/result    (Resultados)
http://localhost:5173/protocol  (Protocolo)
```

---

## 📝 Notas Técnicas

1. **Índices vs IDs**: 
   - O `questionId` na URL é o **índice** (0-based) do array `questions`
   - O `id` dentro de cada pergunta é um identificador interno (1, 2, 3...)

2. **Depoimentos Opcionais**:
   - A rota `/testimonial/:questionId?` tem `questionId` opcional
   - Se não fornecido, usa `currentQuestion` do Context

3. **Navegação**:
   - Todas as navegações usam `navigate()` com `replace: false` para manter histórico
   - O Context (`QuizContext`) mantém estado global do quiz

4. **Estado Persistido**:
   - O estado do quiz é salvo no `localStorage`
   - Permite retomar de onde parou (se implementado)

---

## 🎯 Para Desenvolvedores

### Adicionar Nova Rota:
1. Adicione a rota em `src/App.jsx`
2. Crie o componente na pasta `src/pages/`
3. Importe e adicione ao `<Routes>`

### Adicionar Nova Pergunta:
1. Adicione no array `questions` em `src/quizData.js`
2. A rota será automaticamente `/quiz/[novo-índice]`

### Adicionar Novo Depoimento:
1. Adicione no array `testimonials` em `src/quizData.js`
2. Configure `feedbackType: "testimonial"` na pergunta desejada
3. Adicione mapeamento em `testimonialMapping`
4. A rota será `/testimonial/[índice-da-pergunta]`

---

**Última atualização**: Baseado no estado atual do código em `src/App.jsx` e `src/quizData.js`

