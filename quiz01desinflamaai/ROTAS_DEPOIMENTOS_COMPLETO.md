# 📋 TODAS AS ROTAS DE DEPOIMENTOS - GUIA COMPLETO

## 🎯 ROTAS ATIVAS NO FLUXO

### 1️⃣ **Rota: `/testimonial/8`**
- **Pergunta**: "Como está seu sono?"
- **ID da Pergunta**: 10
- **Índice no Array**: 8
- **Depoimento**: **Patricia Almeida** (índice 1)
- **Status da Imagem**: ✅ **TEM IMAGEM** (`/images/patriciaalmeida.png`)

**URL para testar**: `http://localhost:5173/testimonial/8`

---

### 2️⃣ **Rota: `/testimonial/11`**
- **Pergunta**: "Você sente compulsão alimentar ou ansiedade para comer?"
- **ID da Pergunta**: 13
- **Índice no Array**: 11
- **Depoimento**: **Camila Ferreira** (índice 2)
- **Status da Imagem**: ❌ **PRECISA ADICIONAR**

**URL para testar**: `http://localhost:5173/testimonial/11`

**Para adicionar imagem da Camila**:
1. Coloque a imagem em: `/public/images/camiloferreira.png` (ou `.webp`)
2. Atualize `quizData.js` linha 241:
   ```javascript
   image: "/images/camiloferreira.png"  // Trocar null por isso
   ```

---

## 📊 RESUMO VISUAL

| Rota | Depoimento | Imagem | Status |
|------|-----------|--------|--------|
| `/testimonial/8` | Patricia Almeida | `/images/patriciaalmeida.png` | ✅ OK |
| `/testimonial/11` | Camila Ferreira | `null` | ❌ Precisa adicionar |

---

## 📝 DEPOIMENTOS DISPONÍVEIS (mas não mapeados)

### Mariana Costa (índice 0)
- **Status da Imagem**: ✅ TEM (`/images/marianacosta.png`)
- **Nota**: Aparece como fallback quando não há mapeamento

### Renata Lima (índice 3)
- **Status da Imagem**: ❌ PRECISA ADICIONAR
- **Nota**: Não está mapeada para nenhuma pergunta atualmente

---

## 🔧 COMO ADICIONAR IMAGEM PARA CAMILA FERREIRA

### Passo 1: Adicionar arquivo
```bash
# Copie a imagem para public/images/
cp images/camiloferreira.png public/images/
# ou
cp images/camiloferreira.webp public/images/
```

### Passo 2: Atualizar quizData.js
Localize a linha 241 e altere:
```javascript
// ANTES:
image: null // Placeholder - adicionar imagem depois

// DEPOIS:
image: "/images/camiloferreira.png"
```

### Passo 3: Testar
Acesse: `http://localhost:5173/testimonial/11`

---

## 🧪 TESTAR TODAS AS ROTAS

Você pode testar diretamente no navegador:

1. **Patricia Almeida**: 
   - URL: `http://localhost:5173/testimonial/8`
   - Ou: Navegue até `/quiz/8` e responda qualquer opção

2. **Camila Ferreira**: 
   - URL: `http://localhost:5173/testimonial/11`
   - Ou: Navegue até `/quiz/11` e responda qualquer opção

---

## 📍 MAPEAMENTO TÉCNICO

```javascript
// Em quizData.js
export const testimonialMapping = {
  10: 1,  // ID 10 (índice 8) → Depoimento índice 1 (Patricia)
  13: 2,  // ID 13 (índice 11) → Depoimento índice 2 (Camila)
}
```

**Estrutura**:
- Chave = ID da pergunta
- Valor = Índice do depoimento no array `testimonials`

---

## ✅ CHECKLIST PARA ADICIONAR IMAGENS

- [ ] ✅ Patricia Almeida - `/testimonial/8` - **JÁ TEM IMAGEM**
- [ ] ❌ Camila Ferreira - `/testimonial/11` - **PRECISA ADICIONAR**
- [ ] ⚠️ Renata Lima - Não mapeada - **PRECISA ADICIONAR** (se for usar)

---

## 💡 DICAS

1. **Formato**: Use `.webp` para melhor performance (mais leve)
2. **Tamanho**: Otimize as imagens antes de adicionar
3. **Nome**: Use nomes consistentes (ex: `camiloferreira.png`)
4. **Caminho**: Sempre comece com `/images/` (barra inicial)







