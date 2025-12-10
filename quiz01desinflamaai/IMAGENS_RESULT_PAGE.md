# 📸 Imagens Necessárias para Result Pages

## 🎯 Visão Geral

As páginas de resultados (`/result/1`, `/result/2`, `/result/3`) precisam de **3 imagens** representando cada nível de inflamação corporal. As imagens devem ser de mulheres em roupas fitness mostrando o corpo.

---

## 📋 Especificações das Imagens

### **Formato e Dimensões:**
- **Formato:** WEBP ou JPG
- **Dimensões recomendadas:** 600x800px (proporção 3:4 - retrato)
- **Qualidade:** Alta resolução, nítida
- **Peso do arquivo:** Máximo 200KB (otimizado para web)

---

## 🖼️ Imagens Requeridas

### **1. Imagem Nível BAIXO** 
**Caminho:** `/public/images/result-low.jpg`

**Descrição:**
- Mulher saudável e fitness
- Corpo tonificado, definido
- Expressão: Sorridente, confiante, feliz
- Roupa: Top fitness e shorts/legging (cinza ou cores neutras)
- Iluminação: Bem iluminada, ambiente claro
- Postura: Ereta, confiante
- Idade aparente: 25-35 anos

**Referência de estilo:**
- Mulher fitness, corpo definido sem exagero
- Aparência saudável e natural
- Fundo neutro ou ambiente fitness clean
- Boa iluminação natural

**Palavras-chave para geração:**
```
fitness woman, healthy body, toned body, smiling, confident, gray sportswear, 
well-lit studio, natural lighting, standing pose, front view, 
professional photography, clean background
```

---

### **2. Imagem Nível MODERADO**
**Caminho:** `/public/images/result-moderate.jpg`

**Descrição:**
- Mulher com corpo comum/médio
- Alguns sinais de peso extra ou falta de definição
- Expressão: Preocupada, pensativa, séria
- Roupa: Top fitness e shorts/legging (cores neutras)
- Iluminação: Natural, nem muito clara nem muito escura
- Postura: Natural, casual
- Idade aparente: 30-40 anos

**Referência de estilo:**
- Corpo comum, não muito definido
- Aparência realista, sem exageros
- Expressão facial mostra alguma preocupação
- Fundo simples

**Palavras-chave para geração:**
```
average body woman, concerned expression, thinking pose, sportswear, 
normal body type, realistic, natural lighting, simple background, 
front view, professional photography, neutral colors
```

---

### **3. Imagem Nível ALTO**
**Caminho:** `/public/images/result-high.jpg`

**Descrição:**
- Mulher com sobrepeso evidente
- Corpo com sinais claros de sedentarismo
- Expressão: Cansada, preocupada, desconfortável
- Roupa: Top fitness e shorts/legging (cores escuras)
- Iluminação: Mais suave, menos contrastada
- Postura: Mais retraída, menos confiante
- Idade aparente: 35-45 anos

**Referência de estilo:**
- Corpo com sobrepeso visível
- Aparência realista e respeitosa
- Expressão mostra desconforto ou preocupação
- Fundo neutro

**Palavras-chave para geração:**
```
overweight woman, concerned expression, tired look, dark sportswear, 
realistic body, bloated appearance, soft lighting, simple background, 
front view, professional photography, respectful portrayal
```

---

## 🛠️ Como Gerar as Imagens

### **Opção 1: IA Geradora de Imagens (Recomendado)**

Use ferramentas como:
- **Midjourney** (mais realista)
- **DALL-E 3** (via ChatGPT Plus)
- **Leonardo.ai** (gratuito com limites)
- **Stable Diffusion** (open source)

**Prompt base para cada imagem:**
```
Professional studio photography of a [description] woman in fitness attire, 
[body type], [expression], wearing gray/neutral sportswear (sports bra and shorts), 
standing pose, front view, clean neutral background, natural lighting, 
high quality, realistic, 8k, professional --ar 3:4
```

Substitua `[description]`, `[body type]`, `[expression]` conforme cada nível.

---

### **Opção 2: Banco de Imagens (Stock Photos)**

Procure em:
- **Pexels** (gratuito)
- **Unsplash** (gratuito)
- **Shutterstock** (pago)
- **Adobe Stock** (pago)

**Termos de busca:**
- Para BAIXO: `fitness woman body`, `toned woman`, `healthy woman fitness`
- Para MODERADO: `average woman fitness`, `woman workout beginning`
- Para ALTO: `overweight woman fitness`, `plus size woman workout`

---

### **Opção 3: Sessão de Fotos Real**

Se tiver budget:
- Contratar fotógrafo profissional
- 3 modelos diferentes representando cada nível
- Studio com fundo neutro
- Roupas fitness em cores neutras

---

## 📁 Onde Salvar as Imagens

Salve as imagens em:
```
/public/images/
  ├── result-low.jpg       (Nível Baixo)
  ├── result-moderate.jpg  (Nível Moderado)
  └── result-high.jpg      (Nível Alto)
```

Ou formato WEBP (recomendado para melhor performance):
```
/public/images/
  ├── result-low.webp
  ├── result-moderate.webp
  └── result-high.webp
```

Se usar WEBP, atualize o código em `ResultPage.jsx` linha 137:
```javascript
bodyImage: '/images/result-low.webp',    // linha 137
bodyImage: '/images/result-moderate.webp', // linha 172
bodyImage: '/images/result-high.webp',   // linha 207
```

---

## ✅ Checklist Final

Após adicionar as imagens, verifique:

- [ ] As 3 imagens estão na pasta `/public/images/`
- [ ] Os nomes dos arquivos estão corretos
- [ ] O formato é JPG ou WEBP
- [ ] As imagens têm boa qualidade
- [ ] O peso de cada imagem é < 200KB
- [ ] As proporções são 3:4 (retrato)
- [ ] Teste as 3 páginas:
  - [ ] `http://localhost:5173/result/1`
  - [ ] `http://localhost:5173/result/2`
  - [ ] `http://localhost:5173/result/3`

---

## 🎨 Observações de Design

1. **Consistência:** Todas as 3 imagens devem ter o mesmo estilo fotográfico
2. **Fundo:** Preferencialmente neutro (branco, cinza claro)
3. **Enquadramento:** Corpo inteiro ou do joelho para cima
4. **Roupas:** Cores neutras (cinza, preto, branco)
5. **Posição:** Mulher de frente ou 3/4, nunca de lado
6. **Iluminação:** Natural e suave, sem sombras duras

---

## 📞 Próximos Passos

1. Gere ou encontre as 3 imagens seguindo as especificações acima
2. Otimize as imagens (comprima para reduzir tamanho)
3. Salve na pasta `/public/images/`
4. Teste as páginas de resultado
5. Ajuste se necessário

**Dica:** Se não encontrar imagens perfeitas, use placeholders temporários e substitua depois. O importante é manter a proporção 3:4 e ter uma representação visual clara de cada nível.

