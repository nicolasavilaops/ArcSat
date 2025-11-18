# Guia de Deploy - GitHub Pages

## 📋 Pré-requisitos

- [x] Conta GitHub ativa
- [x] Repositório ArcSat criado
- [x] Chave Google Maps API
- [x] Domínio registrado (www.arcsat.com.br)

## 🚀 Passo a Passo

### 1. Preparar Chave da API do Google Maps

**IMPORTANTE**: Não commite a chave diretamente no código!

#### Opção A: Substituir antes do deploy
Edite `index.html` linha 9:
```html
<script src="https://maps.googleapis.com/maps/api/js?key=SUA_CHAVE_AQUI&libraries=visualization,drawing,geometry"></script>
```

#### Opção B: Usar GitHub Actions (recomendado)
1. Vá em **Settings** → **Secrets and variables** → **Actions**
2. Clique em **New repository secret**
3. Nome: `GOOGLE_MAPS_API_KEY`
4. Valor: Cole sua chave
5. Salve

Crie `.github/workflows/deploy.yml`:
```yaml
name: Deploy to GitHub Pages

on:
  push:
    branches: [ main ]

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      
      - name: Replace API Key
        run: |
          sed -i "s/YOUR_API_KEY/${{ secrets.GOOGLE_MAPS_API_KEY }}/g" index.html
      
      - name: Deploy to GitHub Pages
        uses: peaceiris/actions-gh-pages@v3
        with:
          github_token: ${{ secrets.GITHUB_TOKEN }}
          publish_dir: ./
```

### 2. Configurar GitHub Pages

1. Acesse: `https://github.com/nicolasavilaops/ArcSat`
2. Vá em **Settings** (⚙️)
3. Menu lateral: **Pages**
4. Em **Source**:
   - Branch: `main`
   - Folder: `/ (root)`
5. Clique em **Save**
6. ✅ Site publicado em: `https://nicolasavilaops.github.io/ArcSat/`

### 3. Configurar Domínio Customizado

#### No Provedor de Domínio (Registro.br, GoDaddy, etc.)

Adicione os seguintes registros DNS:

```dns
Tipo    Host    Valor                    TTL
────────────────────────────────────────────────
A       @       185.199.108.153          3600
A       @       185.199.109.153          3600
A       @       185.199.110.153          3600
A       @       185.199.111.153          3600
CNAME   www     nicolasavilaops.github.io.  3600
```

**Exemplo no Registro.br:**
1. Faça login
2. Vá em **DNS** → **Zona de DNS**
3. Adicione os 4 registros A
4. Adicione o registro CNAME
5. Aguarde propagação (até 48h, geralmente 1-2h)

#### No GitHub

1. Ainda em **Settings** → **Pages**
2. Em **Custom domain**, digite: `www.arcsat.com.br`
3. Clique em **Save**
4. Aguarde verificação DNS (⏳ pode levar minutos)
5. ✅ Marque **Enforce HTTPS** (obrigatório após verificação)

### 4. Verificar CNAME

O arquivo `CNAME` já foi criado com:
```
www.arcsat.com.br
```

Se não existir, crie na raiz do repositório.

### 5. Commit e Push

```bash
cd D:\Github
git add .
git commit -m "feat: landing page completa com geoprocessamento"
git push origin main
```

### 6. Verificar Deploy

Aguarde 2-5 minutos e acesse:
- ✅ `https://nicolasavilaops.github.io/ArcSat/`
- ✅ `https://www.arcsat.com.br` (após DNS propagar)

## 🔍 Verificação de DNS

### Windows (PowerShell)
```powershell
nslookup www.arcsat.com.br
```

Deve retornar:
```
Address: 185.199.108.153
         185.199.109.153
         185.199.110.153
         185.199.111.153
```

### Online
- [DNS Checker](https://dnschecker.org/) - Digite `www.arcsat.com.br`
- [What's My DNS](https://whatsmydns.net/) - Verifica globalmente

## 🐛 Troubleshooting

### ❌ "Domain is not verified"
**Solução**: Aguarde propagação DNS (até 48h). Verifique com `nslookup`.

### ❌ "There isn't a GitHub Pages site here"
**Soluções**:
1. Verifique se CNAME está na raiz do repositório
2. Confirme que branch `main` está selecionado em Pages
3. Limpe cache do navegador (`Ctrl+Shift+R`)

### ❌ Mapa não carrega
**Soluções**:
1. Verifique se API Key está correta
2. Confirme billing habilitado no Google Cloud Console
3. Verifique Console do navegador (`F12`) para erros

### ❌ HTTPS não funciona
**Solução**: 
1. Desmarque e marque novamente "Enforce HTTPS"
2. Aguarde 15-30 minutos
3. Limpe cache DNS: `ipconfig /flushdns`

## 📊 Monitoramento

### Google Analytics (Opcional)

Adicione antes do `</head>` em `index.html`:

```html
<!-- Google Analytics -->
<script async src="https://www.googletagmanager.com/gtag/js?id=G-XXXXXXXXXX"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', 'G-XXXXXXXXXX');
</script>
```

### GitHub Insights

- **Traffic**: Settings → Insights → Traffic
- **Visitors**: Visualize acessos nos últimos 14 dias
- **Popular content**: Páginas mais visitadas

## 🔄 Atualizações

Para atualizar o site:

```bash
# Faça as alterações necessárias
git add .
git commit -m "update: descrição da mudança"
git push origin main
```

Deploy automático em 2-5 minutos! ⚡

## 🔐 Segurança

### Restrições da API Key

No Google Cloud Console:

1. **Application restrictions**:
   - HTTP referrers
   - Adicione:
     - `https://www.arcsat.com.br/*`
     - `https://nicolasavilaops.github.io/*`

2. **API restrictions**:
   - Restrict key
   - Selecione apenas:
     - ✅ Maps JavaScript API
     - ✅ Geocoding API
     - ✅ Places API

3. **Quotas**:
   - Maps JavaScript API: 28.000 loads/mês (free)
   - Geocoding: 40.000 requests/mês (free)

### HTTPS

✅ GitHub Pages fornece HTTPS gratuito via Let's Encrypt

## 📞 Suporte

Problemas? Contate:
- 📧 contato@arcsat.com.br
- 💬 [Abrir Issue no GitHub](https://github.com/nicolasavilaops/ArcSat/issues)

## ✅ Checklist Final

- [ ] API Key configurada
- [ ] Billing habilitado no Google Cloud
- [ ] Código commitado e pushed
- [ ] GitHub Pages ativado
- [ ] CNAME configurado
- [ ] DNS configurado no provedor
- [ ] Verificação DNS concluída
- [ ] HTTPS habilitado
- [ ] Site acessível em www.arcsat.com.br
- [ ] Mapa carregando corretamente
- [ ] Todas as funcionalidades testadas

---

🎉 **Parabéns! Seu site ArcSat está no ar!** 🚀
