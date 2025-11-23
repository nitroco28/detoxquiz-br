# 🚀 Guia de Configuração - GitHub Actions

## ✅ O que foi instalado

Foram criados **4 workflows** do GitHub Actions:

1. **CI/CD Pipeline** - Testes e build automático
2. **Deploy to Vercel** - Deploy automático para produção
3. **Preview Deployment** - Build de preview em PRs
4. **Security Audit** - Verificação de vulnerabilidades

---

## 📋 Workflows Criados

### 1. `ci.yml` - Pipeline CI/CD
- ✅ Executa em push e pull requests
- ✅ Instala dependências
- ✅ Roda ESLint
- ✅ Faz build do projeto
- ✅ Salva artefatos

**Status:** ✅ Pronto para usar (não precisa configuração adicional)

---

### 2. `deploy-vercel.yml` - Deploy Automático
- ✅ Executa em push para `main`/`master`
- ✅ Faz deploy automático para Vercel

**⚠️ Configuração necessária:**
Você precisa adicionar 3 secrets no GitHub:

1. **VERCEL_TOKEN**
   - Acesse: https://vercel.com/account/tokens
   - Clique em "Create Token"
   - Copie o token gerado

2. **VERCEL_ORG_ID**
   - Acesse: https://vercel.com/account
   - Veja o "Team ID" ou "Personal Account ID"

3. **VERCEL_PROJECT_ID**
   - Acesse seu projeto no Vercel
   - Vá em Settings → General
   - Copie o "Project ID"

**Como adicionar secrets:**
1. No GitHub, vá em: **Settings → Secrets and variables → Actions**
2. Clique em **"New repository secret"**
3. Adicione cada um dos 3 secrets acima

---

### 3. `deploy-preview.yml` - Preview em PRs
- ✅ Executa em pull requests
- ✅ Faz build e comenta no PR

**Status:** ✅ Pronto para usar (não precisa configuração adicional)

---

### 4. `security.yml` - Auditoria de Segurança
- ✅ Executa em push, PRs e semanalmente
- ✅ Verifica vulnerabilidades nas dependências

**Status:** ✅ Pronto para usar (não precisa configuração adicional)

---

## 🎯 Próximos Passos

### 1. Fazer Commit e Push
```bash
git add .github/
git commit -m "feat: adiciona GitHub Actions workflows"
git push
```

### 2. Verificar Execução
1. Acesse seu repositório no GitHub
2. Clique na aba **"Actions"**
3. Você verá os workflows executando

### 3. Configurar Secrets (Opcional - apenas para deploy automático)
Se quiser usar o deploy automático para Vercel:
- Siga as instruções acima para adicionar os 3 secrets
- O workflow `deploy-vercel.yml` será ativado automaticamente

---

## 🔍 Verificar se está funcionando

### Teste Rápido:
1. Faça uma pequena alteração no código
2. Faça commit e push
3. Vá na aba "Actions" do GitHub
4. Você deve ver os workflows executando

### O que você verá:
- ✅ **CI/CD Pipeline** executando (verde = sucesso)
- ✅ **Security Audit** executando
- ⚠️ **Deploy to Vercel** pode falhar se não tiver os secrets configurados (isso é normal)

---

## 📝 Notas Importantes

- **CI/CD e Security Audit** funcionam imediatamente (sem configuração)
- **Deploy to Vercel** só funciona após adicionar os secrets
- Todos os workflows usam **Node.js 20.x**
- Os builds são executados no **Ubuntu Latest**

---

## 🆘 Troubleshooting

### Workflow não está executando?
- Verifique se você fez push para a branch correta (`main` ou `master`)
- Verifique se o arquivo `.yml` está na pasta `.github/workflows/`

### Deploy falhando?
- Verifique se os 3 secrets estão configurados corretamente
- Verifique se os IDs do Vercel estão corretos
- Verifique se o token do Vercel não expirou

### Build falhando?
- Verifique os logs na aba "Actions"
- Verifique se há erros de lint ou build localmente
- Execute `npm run lint` e `npm run build` localmente primeiro

---

**Tudo pronto!** 🎉

Os workflows estão configurados e prontos para uso. Faça commit e push para ativá-los!

