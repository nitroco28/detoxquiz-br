# 🚀 Guia de Deploy - Detox Funnel

## Opção 1: Vercel (Recomendado - Mais Fácil)

### Método A: Via Interface Web (Mais Simples)

1. **Criar conta no GitHub (se não tiver)**
   - Acesse: https://github.com
   - Crie uma conta gratuita

2. **Criar repositório no GitHub**
   - Clique em "New repository"
   - Nome: `detoxfunnel01` (ou outro nome)
   - Marque como **Public** ou **Private**
   - NÃO marque "Initialize with README"
   - Clique em "Create repository"

3. **Fazer push do código para GitHub**
   ```bash
   git add .
   git commit -m "Initial commit - Detox Funnel Quiz"
   git branch -M main
   git remote add origin https://github.com/SEU_USUARIO/detoxfunnel01.git
   git push -u origin main
   ```
   (Substitua `SEU_USUARIO` pelo seu username do GitHub)

4. **Deploy no Vercel**
   - Acesse: https://vercel.com
   - Clique em "Sign Up" e faça login com GitHub
   - Clique em "Add New Project"
   - Importe o repositório `detoxfunnel01`
   - Vercel detecta automaticamente que é um projeto Vite
   - Clique em "Deploy"
   - Pronto! Seu site estará no ar em ~2 minutos

### Método B: Via CLI (Terminal)

1. **Instalar Vercel CLI**
   ```bash
   npm install -g vercel
   ```

2. **Fazer login**
   ```bash
   vercel login
   ```

3. **Deploy**
   ```bash
   vercel
   ```
   - Siga as instruções no terminal
   - Escolha as opções padrão
   - Seu site será publicado!

---

## Opção 2: Netlify (Alternativa)

1. **Criar conta no Netlify**
   - Acesse: https://www.netlify.com
   - Faça login com GitHub

2. **Deploy**
   - Clique em "Add new site" > "Import an existing project"
   - Conecte seu repositório GitHub
   - Configure:
     - Build command: `npm run build`
     - Publish directory: `dist`
   - Clique em "Deploy site"

---

## Opção 3: Render (Alternativa)

1. **Criar conta no Render**
   - Acesse: https://render.com
   - Faça login com GitHub

2. **Criar Static Site**
   - Clique em "New +" > "Static Site"
   - Conecte seu repositório GitHub
   - Configure:
     - Build Command: `npm run build`
     - Publish Directory: `dist`
   - Clique em "Create Static Site"

---

## 📝 Notas Importantes

- **Domínio personalizado**: Todas as plataformas permitem adicionar domínio próprio
- **HTTPS**: Automático em todas as plataformas
- **Atualizações**: Ao fazer push no GitHub, o site atualiza automaticamente
- **Gratuito**: Todos os serviços têm planos gratuitos generosos

---

## ✅ Checklist Antes do Deploy

- [x] Projeto tem script `build` configurado
- [x] `.gitignore` está configurado
- [ ] Código commitado no Git
- [ ] Repositório criado no GitHub
- [ ] Deploy realizado

---

## 🎯 Recomendação Final

**Use Vercel** - É a opção mais simples, rápida e otimizada para projetos React/Vite!

