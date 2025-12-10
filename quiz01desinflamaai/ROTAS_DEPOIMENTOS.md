# 📋 TODAS AS ROTAS DE DEPOIMENTOS

Este documento lista todas as rotas onde depoimentos aparecem no fluxo do quiz, para facilitar a adição de imagens.

## 🗺️ MAPEAMENTO COMPLETO

### Estrutura:
- **Rota**: URL que você pode acessar diretamente
- **Índice**: Posição da pergunta no array (usado na URL)
- **ID**: ID da pergunta no quizData.js
- **Pergunta**: Texto da pergunta que aciona o depoimento
- **Depoimento**: Qual depoimento aparece (índice no array testimonials)
- **Status da Imagem**: Se já tem imagem ou precisa adicionar

---

## 📍 DEPOIMENTO 1: Mariana Costa

**Status**: ✅ **TEM IMAGEM** (`/images/marianacosta.png`)

**Nota**: Este depoimento não está mapeado atualmente. Ele aparece como fallback quando não há mapeamento.

---

## 📍 DEPOIMENTO 2: Patricia Almeida

**Rota**: `/testimonial/8`
- **Índice no Array**: 8
- **ID da Pergunta**: 10
- **Pergunta**: "Como está seu sono?"
- **Depoimento**: Índice 1 (Patricia Almeida)
- **Status da Imagem**: ✅ **TEM IMAGEM** (`/images/patriciaalmeida.png`)

**Como testar**: 
1. Acesse: `http://localhost:5173/quiz/8`
2. Responda qualquer opção
3. Será redirecionado para `/testimonial/8`

---

## 📍 DEPOIMENTO 3: Camila Ferreira

**Rota**: `/testimonial/11`
- **Índice no Array**: 11
- **ID da Pergunta**: 13
- **Pergunta**: "Você sente compulsão alimentar ou ansiedade para comer?"
- **Depoimento**: Índice 2 (Camila Ferreira)
- **Status da Imagem**: ❌ **PRECISA ADICIONAR** (`image: null`)

**Como testar**: 
1. Acesse: `http://localhost:5173/quiz/11`
2. Responda qualquer opção
3. Será redirecionado para `/testimonial/11`

**Para adicionar imagem**:
1. Coloque a imagem em: `/public/images/camiloferreira.png` (ou .webp)
2. Atualize em `quizData.js`:
   ```javascript
   {
     id: 3,
     name: "Camila Ferreira, 41 anos",
     // ... outros campos ...
     image: "/images/camiloferreira.png"  // ← Adicione aqui
   }
   ```

---

## 📍 DEPOIMENTO 4: Renata Lima

**Rota**: Não mapeada atualmente (não aparece no fluxo)

**Status da Imagem**: ❌ **PRECISA ADICIONAR** (`image: null`)

**Para usar este depoimento**:
1. Escolha uma pergunta que deveria acionar este depoimento
2. Adicione `feedbackType: "testimonial"` na pergunta
3. Adicione no `testimonialMapping`:
   ```javascript
   export const testimonialMapping = {
     10: 1,  // Patricia
     13: 2,  // Camila
     X: 3,   // ← Adicione aqui (X = ID da pergunta escolhida)
   }
   ```

**Para adicionar imagem**:
1. Coloque a imagem em: `/public/images/renatalima.png` (ou .webp)
2. Atualize em `quizData.js`:
   ```javascript
   {
     id: 4,
     name: "Renata Lima, 36 anos",
     // ... outros campos ...
     image: "/images/renatalima.png"  // ← Adicione aqui
   }
   ```

---

## 📊 RESUMO DAS ROTAS ATIVAS

| Rota | Pergunta | Depoimento | Imagem |
|------|----------|------------|--------|
| `/testimonial/8` | Como está seu sono? (ID 10) | Patricia Almeida | ✅ `/images/patriciaalmeida.png` |
| `/testimonial/11` | Você sente compulsão alimentar... (ID 13) | Camila Ferreira | ❌ Precisa adicionar |

---

## 🔧 COMO ADICIONAR NOVA IMAGEM

### Passo 1: Adicionar a imagem
```bash
# Copie a imagem para a pasta public/images/
cp images/nome-da-imagem.png public/images/
```

### Passo 2: Atualizar quizData.js
```javascript
{
  id: X,
  name: "Nome, idade",
  // ... outros campos ...
  image: "/images/nome-da-imagem.png"  // ← Adicione aqui
}
```

### Passo 3: Testar
1. Acesse a rota do depoimento: `http://localhost:5173/testimonial/X`
2. Verifique se a imagem aparece corretamente

---

## 📝 NOTAS IMPORTANTES

- **Formato de imagem**: Use `.png` ou `.webp` (`.webp` é mais leve)
- **Tamanho recomendado**: Otimize as imagens antes de adicionar
- **Nome do arquivo**: Use nomes descritivos e consistentes (ex: `camiloferreira.png`)
- **Caminho**: Sempre use `/images/` (não `images/` ou `./images/`)

---

## 🧪 TESTAR TODAS AS ROTAS

Para testar rapidamente todas as rotas de depoimentos:

```bash
# Depoimento da Patricia
http://localhost:5173/testimonial/8

# Depoimento da Camila
http://localhost:5173/testimonial/11
```

Ou navegue pelo quiz normalmente e responda as perguntas que acionam depoimentos.







