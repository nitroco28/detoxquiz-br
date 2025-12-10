# 🎨 Prompts Prontos para Gerar Imagens com IA

Use estes prompts em **Midjourney**, **DALL-E 3**, **Leonardo.ai** ou **Stable Diffusion**

---

## 📸 IMAGEM 1: Nível BAIXO
**Arquivo:** `result-low.jpg` ou `result-low.webp`

### Prompt para Midjourney:
```
Professional studio photography of a fit healthy woman in gray sportswear, 
toned athletic body, bright confident smile, wearing sports bra and shorts, 
standing straight, front view, hands on hips pose, clean white background, 
natural soft lighting, professional fitness photography, 8k quality, 
realistic skin texture, age 28-32 --ar 3:4 --v 6 --style raw
```

### Prompt para DALL-E 3:
```
Professional fitness photograph of a healthy woman with toned body in gray sportswear. 
She is smiling confidently, wearing a gray sports bra and shorts, standing with 
good posture facing the camera. Clean white studio background with soft natural 
lighting. High quality, realistic, professional photography, vertical composition 3:4 ratio.
```

### Prompt para Leonardo.ai:
```
Professional fitness woman portrait, toned body, gray sportswear, confident smile, 
sports bra and shorts, standing pose, front view, white background, 
natural lighting, photorealistic, high quality, 3:4 ratio
```

---

## 📸 IMAGEM 2: Nível MODERADO
**Arquivo:** `result-moderate.jpg` ou `result-moderate.webp`

### Prompt para Midjourney:
```
Professional studio photography of an average body woman in neutral sportswear, 
normal body type not overweight not fit, concerned thoughtful expression, 
wearing beige sports bra and leggings, standing naturally, front view, 
clean gray background, natural diffused lighting, realistic everyday woman, 
8k quality, authentic look, age 32-38 --ar 3:4 --v 6 --style raw
```

### Prompt para DALL-E 3:
```
Professional photograph of a woman with average body type in neutral beige sportswear. 
She has a concerned, thoughtful expression, wearing a beige sports bra and leggings, 
standing naturally facing the camera. Clean gray studio background with soft lighting. 
Realistic, relatable, everyday woman appearance, high quality photography, 
vertical composition 3:4 ratio.
```

### Prompt para Leonardo.ai:
```
Average body woman portrait, normal body type, concerned expression, 
beige sportswear, sports bra and leggings, natural standing pose, 
front view, gray background, soft lighting, photorealistic, 
high quality, 3:4 ratio
```

---

## 📸 IMAGEM 3: Nível ALTO
**Arquivo:** `result-high.jpg` ou `result-high.webp`

### Prompt para Midjourney:
```
Professional studio photography of a plus size woman in dark sportswear, 
overweight body with visible weight, tired concerned expression, 
wearing black sports bra and leggings, standing pose showing full body, 
front view, clean neutral background, soft diffused lighting, 
realistic and respectful portrayal, 8k quality, authentic representation, 
age 35-42 --ar 3:4 --v 6 --style raw
```

### Prompt para DALL-E 3:
```
Professional photograph of a plus size woman with overweight body in dark sportswear. 
She has a tired, concerned expression, wearing a black sports bra and leggings, 
standing facing the camera showing full body. Clean neutral studio background 
with soft lighting. Realistic, respectful, authentic portrayal, high quality 
photography, vertical composition 3:4 ratio.
```

### Prompt para Leonardo.ai:
```
Plus size woman portrait, overweight body, tired expression, 
dark black sportswear, sports bra and leggings, standing pose, 
front view, neutral background, soft lighting, photorealistic, 
respectful portrayal, high quality, 3:4 ratio
```

---

## 🎯 Configurações Recomendadas

### Para Midjourney:
- **Versão:** `--v 6` ou `--v 6.1`
- **Estilo:** `--style raw` (mais realista)
- **Aspect Ratio:** `--ar 3:4`
- **Quality:** Padrão (não precisa especificar)

### Para DALL-E 3 (ChatGPT):
- **Tamanho:** 1024x1792 (vertical)
- **Estilo:** Natural/Vivid
- **Qualidade:** HD

### Para Leonardo.ai:
- **Model:** Leonardo Phoenix ou Leonardo Diffusion XL
- **Dimensions:** 768x1024 (3:4)
- **Guidance Scale:** 7-8
- **Quality:** High

### Para Stable Diffusion:
- **Model:** Realistic Vision ou Deliberate
- **Steps:** 30-50
- **CFG Scale:** 7-8
- **Sampler:** DPM++ 2M Karras
- **Resolution:** 768x1024

---

## ✏️ Modificadores Úteis (Opcionais)

Adicione ao final dos prompts se necessário:

### Para Mais Realismo:
```
, hyper realistic, award winning photography, professional studio lighting
```

### Para Suavizar:
```
, soft focus, flattering lighting, beauty photography
```

### Para Background Específico:
```
, solid white background, no shadows
, gradient gray background, studio setup
```

---

## 🔄 Variações

Se o resultado não ficar bom na primeira tentativa, tente:

1. **Regenerar** (mesmo prompt, resultado diferente)
2. **Ajustar idade:** Mude a faixa etária
3. **Mudar roupas:** Experimente outras cores
4. **Background:** Teste branco, cinza ou gradiente
5. **Expressão:** Ajuste "smile", "concerned", "tired"

---

## 📥 Pós-Processamento

Após gerar as imagens:

1. **Download** em alta qualidade
2. **Crop/Ajuste** se necessário (manter 3:4)
3. **Otimizar tamanho:**
   - Usar TinyPNG.com ou Squoosh.app
   - Meta: < 200KB por imagem
4. **Converter para WebP** (opcional, melhor compressão):
   - Online: cloudconvert.com
   - CLI: `cwebp input.jpg -o output.webp -q 85`
5. **Renomear:**
   - `result-low.webp`
   - `result-moderate.webp`
   - `result-high.webp`
6. **Salvar em:** `/public/images/`

---

## 🎬 Sequência de Ação Rápida

### Usando ChatGPT + DALL-E 3:

1. Abra ChatGPT Plus
2. Cole o Prompt da Imagem 1
3. Aguarde gerar
4. Download → Salve como `result-low.jpg`
5. Repita para Imagens 2 e 3
6. Otimize no TinyPNG
7. Coloque em `/public/images/`
8. Teste: `http://localhost:5173/result/1`

**Tempo estimado:** 10-15 minutos

---

## 🆓 Alternativa Gratuita

### Sem IA? Use Stock Photos:

**Pexels.com:**
```
Busca 1: "fitness woman body toned"
Busca 2: "woman workout average body"  
Busca 3: "plus size woman fitness"
```

**Filtros:**
- Orientação: Retrato (Portrait)
- Tamanho: Large
- Licença: Grátis para uso comercial

**Critérios:**
- Fundo neutro ou uniforme
- Mulher de frente ou 3/4
- Roupas fitness
- Boa iluminação

---

## ✅ Checklist Final

Antes de usar as imagens:

- [ ] 3 imagens geradas/encontradas
- [ ] Proporção 3:4 (retrato)
- [ ] Qualidade alta, nítidas
- [ ] Tamanho < 200KB cada
- [ ] Nomes corretos (result-low, result-moderate, result-high)
- [ ] Formato JPG ou WEBP
- [ ] Salvas em `/public/images/`
- [ ] Testadas nas 3 páginas

---

## 💡 Dica Pro

**Use o mesmo prompt base** para as 3 imagens, mudando apenas:
- Descrição do corpo
- Expressão facial
- Cor das roupas

Isso garante **consistência visual** entre as 3 imagens!

---

*Prompts otimizados para resultados realistas e profissionais*
*Última atualização: 09/12/2025*

