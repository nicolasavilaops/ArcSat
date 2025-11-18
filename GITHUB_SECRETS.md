# 🔐 GitHub Secrets e Variables - ArcSat

Este guia mostra como configurar todos os secrets e variables no GitHub para deploy em produção.

## 📋 Acessar Configurações

1. Vá para: https://github.com/nicolasavilaops/ArcSat
2. Clique em **Settings** (⚙️)
3. No menu lateral: **Secrets and variables** → **Actions**

## 🔒 SECRETS (Dados Sensíveis)

### 1. API Keys e Tokens

#### GOOGLE_MAPS_API_KEY
- **Nome**: `GOOGLE_MAPS_API_KEY`
- **Valor**: Sua chave da Google Maps API
- **Como obter**: Veja `GOOGLE_MAPS_SETUP.md`

#### MONGODB_URI
- **Nome**: `MONGODB_URI`
- **Valor**: `mongodb+srv://usuario:senha@cluster.mongodb.net/arcsat?retryWrites=true&w=majority`
- **Opções gratuitas**:
  - MongoDB Atlas (512MB grátis): https://www.mongodb.com/cloud/atlas
  - MongoDB Cloud (compartilhado)

#### MONGODB_PASSWORD
- **Nome**: `MONGODB_PASSWORD`
- **Valor**: Senha do usuário MongoDB

#### REDIS_PASSWORD
- **Nome**: `REDIS_PASSWORD`
- **Valor**: Senha do Redis
- **Opções gratuitas**:
  - Redis Cloud (30MB grátis): https://redis.com/try-free/
  - Upstash (10K req/dia grátis): https://upstash.com/

#### SESSION_SECRET
- **Nome**: `SESSION_SECRET`
- **Valor**: String aleatória de 64 caracteres
- **Gerar**:
```bash
node -e "console.log(require('crypto').randomBytes(64).toString('hex'))"
```

#### JWT_SECRET
- **Nome**: `JWT_SECRET`
- **Valor**: String aleatória de 64 caracteres
- **Gerar**:
```bash
node -e "console.log(require('crypto').randomBytes(64).toString('hex'))"
```

#### GITHUB_TOKEN
- **Nome**: `GITHUB_TOKEN`
- **Valor**: Personal Access Token
- **Como obter**:
  1. GitHub → Settings → Developer settings → Personal access tokens → Tokens (classic)
  2. Generate new token (classic)
  3. Scopes: `repo`, `workflow`
  4. Copie o token (começa com `ghp_`)

#### GITHUB_WEBHOOK_SECRET
- **Nome**: `GITHUB_WEBHOOK_SECRET`
- **Valor**: String aleatória de 32 caracteres
- **Gerar**:
```bash
node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
```

#### AVILA_API_KEY
- **Nome**: `AVILA_API_KEY`
- **Valor**: Chave da API Avila
- **Como obter**: Entre em contato com api.avila.inc

### 2. Monitoring (Opcional)

#### GOOGLE_ANALYTICS_ID
- **Nome**: `GOOGLE_ANALYTICS_ID`
- **Valor**: `G-XXXXXXXXXX`
- **Como obter**: https://analytics.google.com/

#### SENTRY_DSN
- **Nome**: `SENTRY_DSN`
- **Valor**: `https://xxxxx@sentry.io/xxxxx`
- **Como obter**: https://sentry.io/ (gratuito até 5K eventos/mês)

## 📊 VARIABLES (Configurações Públicas)

### Configurações de Aplicação

#### NODE_ENV
- **Nome**: `NODE_ENV`
- **Valor**: `production`

#### PORT
- **Nome**: `PORT`
- **Valor**: `3000`

#### API_VERSION
- **Nome**: `API_VERSION`
- **Valor**: `v1`

#### BASE_URL
- **Nome**: `BASE_URL`
- **Valor**: `https://www.arcsat.com.br`

### MongoDB (Configurações Não-Sensíveis)

#### MONGODB_DB_NAME
- **Nome**: `MONGODB_DB_NAME`
- **Valor**: `arcsat`

#### MONGODB_MAX_POOL_SIZE
- **Nome**: `MONGODB_MAX_POOL_SIZE`
- **Valor**: `10`

### Redis (Configurações Não-Sensíveis)

#### REDIS_HOST
- **Nome**: `REDIS_HOST`
- **Valor**: URL do seu Redis (ex: `redis-12345.upstash.io`)

#### REDIS_PORT
- **Nome**: `REDIS_PORT`
- **Valor**: `6379` ou porta customizada

#### REDIS_TTL
- **Nome**: `REDIS_TTL`
- **Valor**: `3600`

#### CACHE_ENABLED
- **Nome**: `CACHE_ENABLED`
- **Valor**: `true`

### APIs Brasileiras

#### BRASILAPI_BASE_URL
- **Nome**: `BRASILAPI_BASE_URL`
- **Valor**: `https://brasilapi.com.br/api`

#### RECEITAWS_BASE_URL
- **Nome**: `RECEITAWS_BASE_URL`
- **Valor**: `https://www.receitaws.com.br/v1`

#### AVILA_API_BASE_URL
- **Nome**: `AVILA_API_BASE_URL`
- **Valor**: `https://api.avila.inc`

### Contato e Suporte

#### CONTACT_EMAIL
- **Nome**: `CONTACT_EMAIL`
- **Valor**: `contato@arcsat.com.br`

#### SUPPORT_PHONE
- **Nome**: `SUPPORT_PHONE`
- **Valor**: `+5517997811471`

#### SUPPORT_WHATSAPP
- **Nome**: `SUPPORT_WHATSAPP`
- **Valor**: `https://wa.me/5517997811471`

### CORS

#### CORS_ORIGIN
- **Nome**: `CORS_ORIGIN`
- **Valor**: `https://www.arcsat.com.br,https://nicolasavilaops.github.io`

### Rate Limiting

#### RATE_LIMIT_MAX_REQUESTS
- **Nome**: `RATE_LIMIT_MAX_REQUESTS`
- **Valor**: `100`

### Features Flags

#### FEATURE_GEOPROCESSING
- **Nome**: `FEATURE_GEOPROCESSING`
- **Valor**: `true`

#### FEATURE_CNPJ_ENRICHMENT
- **Nome**: `FEATURE_CNPJ_ENRICHMENT`
- **Valor**: `true`

## 🚀 Configuração Rápida (Script)

### No GitHub via GitHub CLI

```bash
# Instalar GitHub CLI
# Windows: choco install gh
# Mac: brew install gh

# Login
gh auth login

# Navegar para o repositório
cd d:\Github

# Adicionar Secrets
gh secret set GOOGLE_MAPS_API_KEY
gh secret set MONGODB_URI
gh secret set MONGODB_PASSWORD
gh secret set REDIS_PASSWORD
gh secret set SESSION_SECRET
gh secret set JWT_SECRET
gh secret set GITHUB_TOKEN
gh secret set GITHUB_WEBHOOK_SECRET
gh secret set AVILA_API_KEY
gh secret set GOOGLE_ANALYTICS_ID
gh secret set SENTRY_DSN

# Adicionar Variables
gh variable set NODE_ENV --body "production"
gh variable set PORT --body "3000"
gh variable set API_VERSION --body "v1"
gh variable set BASE_URL --body "https://www.arcsat.com.br"
gh variable set MONGODB_DB_NAME --body "arcsat"
gh variable set REDIS_HOST --body "seu-redis-host.upstash.io"
gh variable set REDIS_PORT --body "6379"
gh variable set CACHE_ENABLED --body "true"
gh variable set CONTACT_EMAIL --body "contato@arcsat.com.br"
gh variable set SUPPORT_PHONE --body "+5517997811471"
gh variable set CORS_ORIGIN --body "https://www.arcsat.com.br,https://nicolasavilaops.github.io"
gh variable set FEATURE_GEOPROCESSING --body "true"
gh variable set FEATURE_CNPJ_ENRICHMENT --body "true"
```

## 🔍 Verificar Configuração

### Listar Secrets
```bash
gh secret list
```

### Listar Variables
```bash
gh variable list
```

## 📦 Serviços Gratuitos Recomendados

### 1. MongoDB Atlas (Database)
- **Free Tier**: 512 MB
- **URL**: https://www.mongodb.com/cloud/atlas/register
- **Setup**:
  1. Create cluster (M0 FREE)
  2. Database Access → Add user
  3. Network Access → Add IP (0.0.0.0/0 para GitHub Actions)
  4. Connect → Copy connection string

### 2. Upstash Redis (Cache)
- **Free Tier**: 10K requests/dia
- **URL**: https://console.upstash.com/
- **Setup**:
  1. Create Redis Database
  2. Copy: Endpoint, Port, Password
  3. Use REST API para evitar problemas de conexão

### 3. Vercel/Railway (Backend Deploy)
- **Vercel**: https://vercel.com/ (Serverless functions)
- **Railway**: https://railway.app/ ($5/mês de crédito grátis)
- **Render**: https://render.com/ (Free tier com sleep)

### 4. Sentry (Error Tracking)
- **Free Tier**: 5K events/mês
- **URL**: https://sentry.io/signup/

### 5. Google Analytics 4
- **Free**: Ilimitado
- **URL**: https://analytics.google.com/

## 🔐 Segurança

### ✅ Boas Práticas

1. **Nunca commite secrets no Git**
2. **Use secrets diferentes para dev/prod**
3. **Rotacione secrets periodicamente** (a cada 90 dias)
4. **Use scopes mínimos necessários** no GitHub Token
5. **Configure IP whitelist** quando possível (MongoDB, Redis)
6. **Habilite 2FA** em todos os serviços

### ❌ Evite

1. Secrets em código
2. Secrets em logs
3. Secrets em URLs
4. Compartilhar secrets via chat/email
5. Usar secrets fracos ou previsíveis

## 🧪 Testar Localmente

### Criar .env local (NÃO commitar!)

```bash
# Copiar template
cp .env.example .env

# Editar com seus valores
code .env
```

### Carregar variáveis

```javascript
// No início do seu app
require('dotenv').config();

const mongoUri = process.env.MONGODB_URI;
const apiKey = process.env.GOOGLE_MAPS_API_KEY;
```

## 📝 Checklist de Configuração

- [ ] Todos os secrets adicionados no GitHub
- [ ] Todas as variables configuradas
- [ ] MongoDB Atlas criado e connection string obtida
- [ ] Redis/Upstash configurado
- [ ] Google Maps API key com billing habilitado
- [ ] CORS origins corretos
- [ ] Session/JWT secrets gerados (64 chars)
- [ ] GitHub token com scopes corretos
- [ ] .env.example atualizado (sem valores reais)
- [ ] .gitignore inclui .env
- [ ] Workflow do GitHub Actions configurado
- [ ] Deploy testado com secrets

## 🔄 Atualizar Secrets

```bash
# Via GitHub CLI
gh secret set NOME_DO_SECRET

# Ou via interface web
# Settings → Secrets → Actions → Update
```

## 📞 Suporte

- 📧 Email: contato@arcsat.com.br
- 📱 WhatsApp: https://wa.me/5517997811471
- 💬 Issues: https://github.com/nicolasavilaops/ArcSat/issues

---

🔐 **Configuração segura = Aplicação confiável!** ✨
