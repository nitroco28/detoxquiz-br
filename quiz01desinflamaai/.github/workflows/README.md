# GitHub Actions Workflows

Este diretório contém os workflows do GitHub Actions configurados para o projeto.

## 📋 Workflows Disponíveis

### 1. CI/CD Pipeline (`ci.yml`)
**Quando executa:**
- Push para branches `main`, `master` ou `develop`
- Pull Requests para `main` ou `master`

**O que faz:**
- ✅ Instala dependências
- ✅ Executa ESLint
- ✅ Faz build do projeto
- ✅ Salva artefatos do build

**Status:** Ativo e funcionando

---

### 2. Deploy to Vercel (`deploy-vercel.yml`)
**Quando executa:**
- Push para branches `main` ou `master`

**O que faz:**
- ✅ Faz build do projeto
- ✅ Faz deploy automático para Vercel (produção)

**Configuração necessária:**
Você precisa adicionar os seguintes secrets no GitHub:
- `VERCEL_TOKEN` - Token de acesso do Vercel
- `VERCEL_ORG_ID` - ID da organização no Vercel
- `VERCEL_PROJECT_ID` - ID do projeto no Vercel

**Como obter:**
1. Acesse https://vercel.com/account/tokens
2. Crie um novo token
3. Adicione como secret no GitHub: Settings → Secrets and variables → Actions

---

### 3. Preview Deployment (`deploy-preview.yml`)
**Quando executa:**
- Pull Requests para `main` ou `master`

**O que faz:**
- ✅ Executa linting
- ✅ Faz build do projeto
- ✅ Comenta no PR com status do build

**Status:** Ativo e funcionando

---

### 4. Security Audit (`security.yml`)
**Quando executa:**
- Push para branches `main` ou `master`
- Pull Requests para `main` ou `master`
- Semanalmente (segundas-feiras às 9h UTC)

**O que faz:**
- ✅ Verifica vulnerabilidades de segurança nas dependências
- ✅ Alerta se encontrar problemas

**Status:** Ativo e funcionando

---

## 🔧 Como Usar

### Verificar Status dos Workflows
1. Acesse a aba "Actions" no seu repositório GitHub
2. Veja o histórico de execuções
3. Clique em uma execução para ver detalhes

### Adicionar Secrets (para Deploy)
1. Vá em Settings → Secrets and variables → Actions
2. Clique em "New repository secret"
3. Adicione os secrets necessários:
   - `VERCEL_TOKEN`
   - `VERCEL_ORG_ID`
   - `VERCEL_PROJECT_ID`

### Desabilitar um Workflow
1. Edite o arquivo `.yml` correspondente
2. Comente a seção `on:` ou remova o arquivo

---

## 📝 Notas

- Todos os workflows usam Node.js 20.x
- Os builds são executados no Ubuntu Latest
- Os artefatos são mantidos por 1 dia
- O cache do npm é usado para acelerar builds

---

**Última atualização:** 2025













