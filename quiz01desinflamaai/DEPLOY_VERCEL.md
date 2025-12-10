# 🚀 Como Fazer Deploy no Vercel

## Opção 1: Deploy Automático via GitHub (RECOMENDADO)

O projeto já está configurado para fazer deploy automático quando você fizer push no GitHub!

### Passos:

1. **Obter Token do Vercel:**
   - Acesse: https://vercel.com/account/tokens
   - Clique em "Create Token"
   - Dê um nome: `GitHub Actions Deploy`
   - Copie o token

2. **Obter IDs do Vercel:**
   - Acesse: https://vercel.com/account
   - Veja o "Team ID" (ou "Personal Account ID")
   - Acesse seu projeto (ou crie um novo em https://vercel.com/new)
   - Vá em Settings → General
   - Copie o "Project ID"

3. **Adicionar Secrets no GitHub:**
   - Acesse: https://github.com/nitroco28/detoxquiz-br/settings/secrets/actions
   - Clique em "New repository secret"
   - Adicione os 3 secrets:
     - `VERCEL_TOKEN` → Cole o token do passo 1
     - `VERCEL_ORG_ID` → Cole o Team ID do passo 2
     - `VERCEL_PROJECT_ID` → Cole o Project ID do passo 2

4. **Fazer Push:**
   - Qualquer push para `main` fará deploy automático!

---

## Opção 2: Deploy Manual via Vercel Dashboard

1. **Acesse:** https://vercel.com/new
2. **Conecte seu GitHub:**
   - Clique em "Import Git Repository"
   - Selecione `nitroco28/detoxquiz-br`
3. **Configure:**
   - Framework Preset: **Vite**
   - Root Directory: `detoxfunnel` (se necessário)
   - Build Command: `npm run build`
   - Output Directory: `dist`
4. **Deploy:**
   - Clique em "Deploy"
   - Pronto! 🎉

---

## Opção 3: Deploy via CLI (Terminal)

1. **Obter Token do Vercel:**
   - Acesse: https://vercel.com/account/tokens
   - Crie um token

2. **Fazer Login:**
   ```bash
   cd /Users/matheusfernandes/Documents/detoxfunnel01/detoxfunnel
   npx vercel login
   ```

3. **Fazer Deploy:**
   ```bash
   npx vercel --prod
   ```

---

## ✅ Configuração Atual

O projeto já tem:
- ✅ `vercel.json` configurado
- ✅ Build funcionando (`npm run build`)
- ✅ GitHub Actions configurado para deploy automático

**Só falta adicionar os secrets no GitHub para ativar o deploy automático!**

---

## 🎯 Recomendação

**Use a Opção 1 (Deploy Automático)** - É a mais fácil e faz deploy automaticamente a cada push!













