# 🗺️ Guia: Configurar Google Maps API

## 1️⃣ Criar Projeto no Google Cloud

1. Acesse: [Google Cloud Console](https://console.cloud.google.com/)
2. Clique em **Select a project** → **NEW PROJECT**
3. Nome do projeto: `ArcSat`
4. Clique em **CREATE**

## 2️⃣ Ativar APIs Necessárias

1. No menu lateral, vá em **APIs & Services** → **Library**
2. Pesquise e ative as seguintes APIs:
   - ✅ **Maps JavaScript API**
   - ✅ **Geocoding API**
   - ✅ **Places API** (opcional)
   - ✅ **Directions API** (opcional)

## 3️⃣ Criar API Key

1. Vá em **APIs & Services** → **Credentials**
2. Clique em **+ CREATE CREDENTIALS** → **API key**
3. Copie a chave gerada
4. ⚠️ **IMPORTANTE**: Restrinja a chave imediatamente!

## 4️⃣ Restringir a API Key (Segurança)

### Application Restrictions
1. Clique em **Edit API key**
2. Em **Application restrictions**, selecione **HTTP referrers (web sites)**
3. Adicione os domínios:
```
https://www.arcsat.com.br/*
https://nicolasavilaops.github.io/*
http://localhost:3000/*
```

### API Restrictions
1. Em **API restrictions**, selecione **Restrict key**
2. Marque apenas:
   - ✅ Maps JavaScript API
   - ✅ Geocoding API
   - ✅ Places API
   - ✅ Directions API

3. Clique em **SAVE**

## 5️⃣ Configurar Billing (Obrigatório)

⚠️ **O Google Maps requer billing habilitado, mas oferece $200 de crédito mensal gratuito!**

1. No menu lateral, vá em **Billing**
2. Clique em **LINK A BILLING ACCOUNT**
3. Crie uma conta de billing ou vincule uma existente
4. Adicione cartão de crédito (não será cobrado dentro do free tier)

### 💰 Free Tier Limits (Mensais)
- **Maps JavaScript API**: 28.000 loads gratuitos
- **Geocoding API**: 40.000 requisições gratuitas
- **Directions API**: 40.000 requisições gratuitas

**💡 Dica**: Configure alertas de cobrança em **Billing** → **Budgets & alerts**

## 6️⃣ Configurar Quotas (Opcional)

Proteja-se de custos inesperados:

1. Vá em **APIs & Services** → **Quotas**
2. Selecione **Maps JavaScript API**
3. Clique em **EDIT QUOTAS**
4. Defina limites diários:
   - Requests per day: 1.000
   - Requests per 100 seconds: 100

## 7️⃣ Adicionar a Key no Projeto

### Opção A: GitHub Secrets (Recomendado para produção)

1. Vá no repositório: [github.com/nicolasavilaops/ArcSat](https://github.com/nicolasavilaops/ArcSat)
2. **Settings** → **Secrets and variables** → **Actions**
3. Clique em **New repository secret**
4. Nome: `GOOGLE_MAPS_API_KEY`
5. Valor: Cole sua API Key
6. Clique em **Add secret**

✅ O GitHub Actions substituirá automaticamente no deploy!

### Opção B: Desenvolvimento Local

Crie arquivo `.env` na raiz do projeto:
```env
GOOGLE_MAPS_API_KEY=AIzaSyXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX
```

E edite `index.html` para usar:
```javascript
<script>
  const API_KEY = 'AIzaSyXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX';
</script>
<script src="https://maps.googleapis.com/maps/api/js?key=..." async defer></script>
```

### Opção C: Substituir Diretamente (NÃO recomendado)

Edite `index.html` linha 9:
```html
<script src="https://maps.googleapis.com/maps/api/js?key=SUA_CHAVE_AQUI&libraries=visualization,drawing,geometry"></script>
```

⚠️ **NUNCA commite a chave diretamente no Git se o repositório for público!**

## 8️⃣ Testar a Configuração

### Teste Local
```bash
# Abra o index.html direto no navegador
start index.html

# Ou use um servidor local
npx http-server -p 8080
```

Abra o Console do navegador (`F12`) e verifique:
- ✅ Sem erros da API
- ✅ Mapa carregando
- ✅ Marcadores aparecendo

### Teste Online
Após deploy no GitHub Pages:
1. Acesse: `https://nicolasavilaops.github.io/ArcSat/`
2. Verifique se o mapa carrega
3. Teste as funcionalidades:
   - Marcadores
   - Heatmap
   - Centróides
   - Otimização de rotas

## 🐛 Troubleshooting

### ❌ Erro: "This page can't load Google Maps correctly"
**Causa**: Billing não habilitado
**Solução**: Ative billing no Google Cloud Console

### ❌ Erro: "RefererNotAllowedMapError"
**Causa**: Domínio não autorizado nas restrições
**Solução**: Adicione o domínio correto em HTTP referrers

### ❌ Erro: "ApiNotActivatedMapError"
**Causa**: API não ativada
**Solução**: Ative Maps JavaScript API na Library

### ❌ Mapa em cinza
**Causa**: Problemas com billing ou quotas excedidas
**Solução**: 
1. Verifique billing ativo
2. Verifique quotas em **APIs & Services** → **Quotas**
3. Veja erros detalhados no Console do navegador

## 📊 Monitorar Uso

1. Vá em **APIs & Services** → **Dashboard**
2. Visualize gráficos de uso de cada API
3. Configure alertas de quota

### Criar Alerta de Cobrança

1. **Billing** → **Budgets & alerts**
2. **CREATE BUDGET**
3. Budget name: `ArcSat API Limit`
4. Budget amount: $50 (ou seu limite)
5. **Threshold rules**: 50%, 90%, 100%
6. Email alerts: Adicione seu email
7. **FINISH**

## 🔐 Boas Práticas de Segurança

✅ **SEMPRE restrinja a API Key**
✅ **Use GitHub Secrets para chaves**
✅ **Configure billing alerts**
✅ **Monitore uso regularmente**
✅ **Rotacione keys periodicamente**
❌ **NUNCA commite keys no Git**
❌ **NUNCA use keys sem restrições**

## 📱 APIs Adicionais (Futuro)

### Directions API (Rotas entre pontos)
```javascript
const directionsService = new google.maps.DirectionsService();
const directionsRenderer = new google.maps.DirectionsRenderer();
```

### Distance Matrix API (Cálculo de distâncias)
```javascript
const service = new google.maps.DistanceMatrixService();
service.getDistanceMatrix({
  origins: [origin],
  destinations: [destination],
  travelMode: 'DRIVING'
}, callback);
```

### Places API (Busca de locais)
```javascript
const service = new google.maps.places.PlacesService(map);
service.findPlaceFromQuery({
  query: 'John Deere Campinas',
  fields: ['name', 'geometry']
}, callback);
```

## 📞 Suporte Google Maps

- 📚 [Documentação Oficial](https://developers.google.com/maps/documentation)
- 💬 [Stack Overflow](https://stackoverflow.com/questions/tagged/google-maps)
- 🎓 [Google Maps Platform](https://mapsplatform.google.com/)
- 📧 [Suporte Google Cloud](https://cloud.google.com/support)

## ✅ Checklist de Configuração

- [ ] Projeto criado no Google Cloud
- [ ] Billing habilitado
- [ ] Maps JavaScript API ativada
- [ ] Geocoding API ativada
- [ ] API Key criada
- [ ] Restrições de domínio configuradas
- [ ] Restrições de API configuradas
- [ ] Quotas definidas
- [ ] Alertas de cobrança criados
- [ ] Key adicionada ao GitHub Secrets
- [ ] Deploy testado e funcionando
- [ ] Mapa carregando sem erros

---

🎉 **Configuração completa! Seu ArcSat está pronto para geoprocessamento avançado!** 🗺️
