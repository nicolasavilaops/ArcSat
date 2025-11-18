# 🚀 Testar Localmente - ArcSat

## Método 1: Abrir Diretamente no Navegador (Simples)

### Limitação
⚠️ **Google Maps API pode não funcionar** com `file://` protocol

### Passos
1. Navegue até `d:\Github\`
2. Clique duas vezes em `index.html`
3. Ou clique com botão direito → **Abrir com** → Escolha seu navegador

## Método 2: Servidor HTTP Local (Recomendado)

### Opção A: Python HTTP Server
```bash
# Python 3.x
cd d:\Github
python -m http.server 8080

# Acesse: http://localhost:8080
```

### Opção B: Node.js HTTP Server
```bash
# Instalar (uma vez)
npm install -g http-server

# Executar
cd d:\Github
http-server -p 8080 -o

# Acesse: http://localhost:8080
```

### Opção C: PHP Built-in Server
```bash
cd d:\Github
php -S localhost:8080

# Acesse: http://localhost:8080
```

### Opção D: Live Server (VS Code Extension)
1. Instale a extensão **Live Server** no VS Code
2. Abra `index.html` no VS Code
3. Clique com botão direito → **Open with Live Server**
4. Abre automaticamente em `http://127.0.0.1:5500`

### Opção E: Servidor Express.js (Já Criado)
```bash
cd d:\Github
node interface-web-vinculacao.js

# Acesse: http://localhost:3000
```

## Método 3: GitHub Pages (Online)

### Após configurar API Key nos Secrets:

1. Acesse: `https://nicolasavilaops.github.io/ArcSat/`
2. Aguarde 2-5 minutos após push para deploy automático

## 🔧 Configuração Rápida para Teste

### 1. Substituir API Key Temporariamente

Edite `index.html` linha 9:
```html
<script src="https://maps.googleapis.com/maps/api/js?key=AIzaSyXXXXXXXXXXXXXXXXXXXXXXXX&libraries=visualization,drawing,geometry"></script>
```

⚠️ **IMPORTANTE**: 
- Use apenas para testes locais
- **NUNCA commite** esta alteração
- Reverta antes de fazer push

### 2. Usar Dados de Demonstração

A aplicação já está configurada para usar dados mock quando não encontrar os arquivos JSON.

Serão geradas **100 localizações** de demonstração:
- ✅ ~35 Fornecedores (John Deere, Case IH, Bunge, etc.)
- ✅ ~65 Compradores (Fazendas, Cooperativas, Pecuária)
- ✅ Distribuídos por SP, MG, GO, MS, PR, MT, DF

## 🧪 Testar Funcionalidades

### 1. Mapa Básico
- ✅ Zoom in/out
- ✅ Arrastar mapa
- ✅ Marcadores visíveis

### 2. Filtros
- 📍 **Todos**: Mostra todos os marcadores
- 🏭 **Fornecedores**: Apenas fornecedores (verde)
- 🛒 **Compradores**: Apenas compradores (dourado)

### 3. Análises Avançadas

#### 🔥 Mapa de Calor
1. Clique em **Mapa de Calor**
2. Visualize concentrações de clientes
3. Clique novamente para alternar

#### 🎯 Centróides
1. Certifique-se que tem marcadores visíveis
2. Clique em **Centróides**
3. Verá pontos centrais de fornecedores e compradores
4. Clique nos centróides para ver coordenadas

#### 🛣️ Otimizar Rotas
1. Certifique-se que tem pelo menos 2 marcadores visíveis
2. Clique em **Otimizar Rotas**
3. Verá linha conectando todos os pontos
4. Alert mostrará distância total estimada

### 4. Info Windows
- Clique em qualquer marcador
- Verá popup com:
  - Nome do cliente
  - Tipo (Fornecedor/Comprador)
  - Setor
  - Categoria
  - Endereço

## 🐛 Troubleshooting Local

### ❌ Mapa não carrega
**Causa**: API Key inválida ou não configurada
**Solução**: 
1. Verifique se substituiu `YOUR_API_KEY` corretamente
2. Confirme que billing está ativo no Google Cloud
3. Abra Console do navegador (`F12`) para ver erro específico

### ❌ CORS Error
**Causa**: Tentando abrir com `file://` protocol
**Solução**: Use um servidor HTTP local (Método 2)

### ❌ "Google is not defined"
**Causa**: Script do Google Maps não carregou
**Solução**: 
1. Verifique conexão com internet
2. Confirme que linha 9 de `index.html` está correta
3. Tente recarregar a página (`Ctrl+F5`)

### ❌ Marcadores não aparecem
**Causa**: Dados não carregados ou erro no JavaScript
**Solução**: 
1. Abra Console (`F12`)
2. Veja mensagens de log:
   - `"Carregando dados de demonstração..."`
   - `"✅ 100 localizações de demonstração carregadas"`
3. Se não aparecer, verifique erros no Console

### ❌ Estatísticas não animam
**Causa**: JavaScript não executou completamente
**Solução**: 
1. Recarregue a página
2. Aguarde alguns segundos
3. Faça scroll até a seção de estatísticas

## 📱 Testar Responsividade

### Desktop
- Redimensione janela do navegador
- Verifique se layout se adapta

### Mobile (Simulação)
1. Abra DevTools (`F12`)
2. Clique no ícone de dispositivo móvel (🖥️📱)
3. Selecione dispositivo:
   - iPhone 12 Pro
   - Samsung Galaxy S20
   - iPad
4. Teste todas as funcionalidades

## 🔍 Inspecionar Performance

### Lighthouse Audit
1. Abra DevTools (`F12`)
2. Aba **Lighthouse**
3. Categorias:
   - ✅ Performance
   - ✅ Accessibility
   - ✅ Best Practices
   - ✅ SEO
4. Clique em **Analyze page load**

### Network Tab
1. DevTools → **Network**
2. Recarregue página (`Ctrl+R`)
3. Verifique:
   - ✅ `index.html` carregou
   - ✅ `app.js` carregou
   - ✅ Google Maps API carregou
   - ✅ Sem erros 404

## 📊 Dados de Teste

### Estatísticas Exibidas
- **6.591** Clientes Ativos
- **2.547** Fornecedores
- **1.823** Propriedades Mapeadas
- **450.000+** Hectares

### Marcadores (Mock Data)
- ~100 localizações
- 35% Fornecedores (verde 🟢)
- 65% Compradores (dourado 🟡)

### Cidades Representadas
- SP: Campinas, Ribeirão Preto, Santos, Sorocaba
- MG: Uberaba, Uberlândia
- GO: Goiânia, Rio Verde
- MS: Campo Grande, Dourados
- PR: Curitiba, Londrina, Cascavel
- MT: Sorriso, Sinop, Lucas do Rio Verde, Rondonópolis
- DF: Brasília

## ✅ Checklist de Teste

- [ ] Página carrega sem erros
- [ ] Mapa aparece corretamente
- [ ] Marcadores visíveis no mapa
- [ ] Info windows funcionam ao clicar
- [ ] Filtro "Todos" funciona
- [ ] Filtro "Fornecedores" funciona
- [ ] Filtro "Compradores" funciona
- [ ] Mapa de Calor alterna corretamente
- [ ] Centróides calculam posições
- [ ] Otimização de rotas desenha linha
- [ ] Estatísticas animam ao carregar
- [ ] Scroll suave funciona nos links âncora
- [ ] Navbar muda ao fazer scroll
- [ ] Layout responsivo em mobile
- [ ] Sem erros no Console

## 🎨 Customização para Teste

### Alterar Quantidade de Marcadores

Em `app.js`, linha ~59, função `loadMockData()`:
```javascript
const mockLocations = generateMockLocations(100); // Altere 100 para o número desejado
```

### Alterar Zoom Inicial

Em `app.js`, linha ~18, função `initMap()`:
```javascript
zoom: 5, // Altere para 4 (menos zoom) ou 6 (mais zoom)
```

### Alterar Centro do Mapa

```javascript
const center = { lat: -14.235, lng: -51.9253 }; // Brasil central
// Ou para São Paulo: { lat: -23.5505, lng: -46.6333 }
```

## 🚀 Próximos Passos

Após testar localmente:

1. **Configurar API Key** no GitHub Secrets
2. **Fazer push** das alterações
3. **Ativar GitHub Pages**
4. **Configurar DNS** do domínio
5. **Testar online** em www.arcsat.com.br

---

📞 **Dúvidas?** Consulte `DEPLOY.md` ou `GOOGLE_MAPS_SETUP.md`
