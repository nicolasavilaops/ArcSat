// ArcSat - Geospatial Intelligence Application
// Author: Avila DevOps
// Description: Interactive mapping and analytics for agribusiness

// Global variables
let map;
let markers = [];
let heatmapLayer;
let centroids = [];
let currentFilter = 'all';

// Initialize the application
document.addEventListener('DOMContentLoaded', function() {
    initMap();
    loadData();
    animateStats();
    initScrollEffects();
});

// Initialize Google Map
function initMap() {
    // Center on Brazil
    const center = { lat: -14.235, lng: -51.9253 };
    
    map = new google.maps.Map(document.getElementById('map'), {
        zoom: 5,
        center: center,
        styles: getMapStyles(),
        mapTypeControl: true,
        mapTypeControlOptions: {
            style: google.maps.MapTypeControlStyle.HORIZONTAL_BAR,
            position: google.maps.ControlPosition.TOP_RIGHT
        }
    });
}

// Custom map styles (agro theme)
function getMapStyles() {
    return [
        {
            "featureType": "landscape",
            "elementType": "all",
            "stylers": [
                { "color": "#f2f2f2" }
            ]
        },
        {
            "featureType": "landscape.natural",
            "elementType": "geometry",
            "stylers": [
                { "color": "#dcedc8" }
            ]
        },
        {
            "featureType": "poi",
            "elementType": "geometry",
            "stylers": [
                { "color": "#c5e1a5" }
            ]
        },
        {
            "featureType": "water",
            "elementType": "geometry",
            "stylers": [
                { "color": "#81d4fa" }
            ]
        },
        {
            "featureType": "road",
            "elementType": "geometry",
            "stylers": [
                { "color": "#ffffff" }
            ]
        }
    ];
}

// Load data from backend or CSV
async function loadData() {
    try {
        // Try to load from local data files
        const clientesResponse = await fetch('clientes-categorizados.json');
        const vinculosResponse = await fetch('vinculos-contatos-clientes.json');
        
        if (clientesResponse.ok && vinculosResponse.ok) {
            const clientes = await clientesResponse.json();
            const vinculos = await vinculosResponse.json();
            
            processData(clientes, vinculos);
        } else {
            // Use mock data if files not found
            loadMockData();
        }
    } catch (error) {
        console.log('Loading mock data:', error);
        loadMockData();
    }
}

// Process real data
function processData(clientes, vinculos) {
    const locations = [];
    
    clientes.forEach(cliente => {
        if (cliente.endereco) {
            // Create location object
            const location = {
                nome: cliente.razaoSocial || cliente.nome,
                tipo: determineTipo(cliente),
                endereco: formatEndereco(cliente.endereco),
                cnpj: cliente.cnpj,
                setor: cliente.setor,
                categoria: cliente.categoria,
                position: null // Will be geocoded
            };
            
            locations.push(location);
        }
    });
    
    // Geocode addresses to get coordinates
    geocodeLocations(locations);
}

// Determine if client is fornecedor or comprador
function determineTipo(cliente) {
    const categoria = cliente.categoria?.toLowerCase() || '';
    const setor = cliente.setor?.toLowerCase() || '';
    
    if (categoria.includes('fornecedor') || setor.includes('industria')) {
        return 'fornecedor';
    } else if (categoria.includes('comprador') || categoria.includes('cliente')) {
        return 'comprador';
    }
    return 'cliente';
}

// Format address for geocoding
function formatEndereco(endereco) {
    if (typeof endereco === 'string') return endereco;
    
    const parts = [];
    if (endereco.logradouro) parts.push(endereco.logradouro);
    if (endereco.numero) parts.push(endereco.numero);
    if (endereco.bairro) parts.push(endereco.bairro);
    if (endereco.municipio) parts.push(endereco.municipio);
    if (endereco.uf) parts.push(endereco.uf);
    if (endereco.cep) parts.push(endereco.cep);
    
    return parts.join(', ');
}

// Geocode addresses to coordinates
async function geocodeLocations(locations) {
    const geocoder = new google.maps.Geocoder();
    let processed = 0;
    
    for (const location of locations) {
        try {
            const result = await geocodeAddress(geocoder, location.endereco);
            if (result) {
                location.position = result;
                addMarker(location);
                processed++;
            }
        } catch (error) {
            console.error('Geocoding error:', error);
        }
        
        // Avoid rate limiting
        await sleep(100);
    }
    
    console.log(`Geocoded ${processed} of ${locations.length} locations`);
}

// Geocode single address
function geocodeAddress(geocoder, address) {
    return new Promise((resolve, reject) => {
        geocoder.geocode({ address: address + ', Brazil' }, (results, status) => {
            if (status === 'OK' && results[0]) {
                resolve(results[0].geometry.location);
            } else {
                resolve(null);
            }
        });
    });
}

// Load mock data for demonstration
function loadMockData() {
    console.log('Carregando dados de demonstração...');
    
    // Generate 100 mock locations across Brazil
    const mockLocations = generateMockLocations(100);
    
    mockLocations.forEach(location => addMarker(location));
    
    console.log(`✅ ${mockLocations.length} localizações de demonstração carregadas`);
}

// Generate realistic mock locations
function generateMockLocations(count) {
    const cidades = [
        { nome: 'Campinas', uf: 'SP', lat: -22.9099, lng: -47.0626 },
        { nome: 'Ribeirão Preto', uf: 'SP', lat: -21.1699, lng: -47.8099 },
        { nome: 'Santos', uf: 'SP', lat: -23.9618, lng: -46.3322 },
        { nome: 'Uberaba', uf: 'MG', lat: -19.7479, lng: -47.9381 },
        { nome: 'Uberlândia', uf: 'MG', lat: -18.9188, lng: -48.2766 },
        { nome: 'Sorocaba', uf: 'SP', lat: -23.5015, lng: -47.4526 },
        { nome: 'Goiânia', uf: 'GO', lat: -16.6869, lng: -49.2648 },
        { nome: 'Campo Grande', uf: 'MS', lat: -20.4697, lng: -54.6201 },
        { nome: 'Curitiba', uf: 'PR', lat: -25.4284, lng: -49.2733 },
        { nome: 'Londrina', uf: 'PR', lat: -23.3045, lng: -51.1696 },
        { nome: 'Cascavel', uf: 'PR', lat: -24.9555, lng: -53.4552 },
        { nome: 'Brasília', uf: 'DF', lat: -15.7939, lng: -47.8828 },
        { nome: 'Dourados', uf: 'MS', lat: -22.2211, lng: -54.8056 },
        { nome: 'Rio Verde', uf: 'GO', lat: -17.7939, lng: -50.9261 },
        { nome: 'Sorriso', uf: 'MT', lat: -12.5417, lng: -55.7139 },
        { nome: 'Sinop', uf: 'MT', lat: -11.8644, lng: -55.5050 },
        { nome: 'Lucas do Rio Verde', uf: 'MT', lat: -13.0536, lng: -55.9050 },
        { nome: 'Rondonópolis', uf: 'MT', lat: -16.4706, lng: -54.6356 }
    ];

    const fornecedores = [
        'John Deere', 'Case IH', 'New Holland', 'Massey Ferguson',
        'Valtra', 'Jacto', 'Stara', 'Kuhn', 'Marchesan',
        'Bunge', 'Cargill', 'ADM', 'Yara', 'Mosaic', 'Corteva'
    ];

    const fazendas = [
        'Fazenda Santa Maria', 'Fazenda Boa Vista', 'Agropecuária Moderna',
        'Fazenda Esperança', 'Fazenda São José', 'Fazenda Primavera',
        'Fazenda Bela Vista', 'Fazenda Progresso', 'Fazenda União'
    ];

    const cooperativas = [
        'Cooperativa Vale Verde', 'Cooperativa Agrícola Regional',
        'Cooperativa Central', 'Cooperativa do Cerrado'
    ];

    const locations = [];

    for (let i = 0; i < count; i++) {
        const cidade = cidades[Math.floor(Math.random() * cidades.length)];
        const tipo = Math.random() > 0.65 ? 'fornecedor' : 'comprador';
        
        let nome, setor, categoria;
        
        if (tipo === 'fornecedor') {
            nome = fornecedores[Math.floor(Math.random() * fornecedores.length)] + 
                   ' ' + cidade.nome;
            setor = Math.random() > 0.5 ? 'Automotiva Agrícola' : 'Insumos Agrícolas';
            categoria = ['Fornecedor Premium', 'Fornecedor Nacional', 'Fornecedor Internacional'][
                Math.floor(Math.random() * 3)
            ];
        } else {
            const rand = Math.random();
            if (rand > 0.7) {
                nome = cooperativas[Math.floor(Math.random() * cooperativas.length)] + 
                       ' de ' + cidade.nome;
                setor = 'Cooperativa';
                categoria = 'Cliente Corporativo';
            } else {
                nome = fazendas[Math.floor(Math.random() * fazendas.length)] + 
                       ' ' + (i + 1);
                setor = Math.random() > 0.6 ? 'Produtor Rural' : 'Pecuária';
                categoria = ['Cliente Gold', 'Cliente Enterprise', 'Cliente Premium'][
                    Math.floor(Math.random() * 3)
                ];
            }
        }

        // Add randomness to coordinates
        const latOffset = (Math.random() - 0.5) * 0.5;
        const lngOffset = (Math.random() - 0.5) * 0.5;

        locations.push({
            nome: nome,
            tipo: tipo,
            endereco: `${cidade.nome}, ${cidade.uf}`,
            position: {
                lat: cidade.lat + latOffset,
                lng: cidade.lng + lngOffset
            },
            setor: setor,
            categoria: categoria
        });
    }

    return locations;
}

// Add marker to map
function addMarker(location) {
    const position = location.position.lat ? 
        location.position : 
        new google.maps.LatLng(location.position.lat, location.position.lng);
    
    const marker = new google.maps.Marker({
        position: position,
        map: map,
        title: location.nome,
        icon: getMarkerIcon(location.tipo),
        animation: google.maps.Animation.DROP
    });
    
    // Create info window
    const infoWindow = new google.maps.InfoWindow({
        content: createInfoWindowContent(location)
    });
    
    marker.addListener('click', () => {
        infoWindow.open(map, marker);
    });
    
    marker.locationType = location.tipo;
    markers.push(marker);
}

// Get custom marker icon
function getMarkerIcon(tipo) {
    const color = tipo === 'fornecedor' ? '4a7c2e' : 'daa520';
    return {
        url: `https://chart.googleapis.com/chart?chst=d_map_pin_letter&chld=%E2%80%A2|${color}`,
        scaledSize: new google.maps.Size(40, 40)
    };
}

// Create info window content
function createInfoWindowContent(location) {
    const tipoIcon = location.tipo === 'fornecedor' ? '🏭' : '🛒';
    return `
        <div style="padding: 10px; max-width: 250px;">
            <h3 style="margin: 0 0 10px; color: #2d5016;">${tipoIcon} ${location.nome}</h3>
            <p style="margin: 5px 0; color: #666;">
                <strong>Tipo:</strong> ${location.tipo === 'fornecedor' ? 'Fornecedor' : 'Comprador'}
            </p>
            ${location.setor ? `<p style="margin: 5px 0; color: #666;"><strong>Setor:</strong> ${location.setor}</p>` : ''}
            ${location.categoria ? `<p style="margin: 5px 0; color: #666;"><strong>Categoria:</strong> ${location.categoria}</p>` : ''}
            <p style="margin: 5px 0; color: #666;">
                <strong>Endereço:</strong> ${location.endereco}
            </p>
        </div>
    `;
}

// Filter functions
function showAllMarkers() {
    currentFilter = 'all';
    markers.forEach(marker => marker.setMap(map));
    if (heatmapLayer) heatmapLayer.setMap(null);
}

function showFornecedores() {
    currentFilter = 'fornecedor';
    markers.forEach(marker => {
        marker.setMap(marker.locationType === 'fornecedor' ? map : null);
    });
    if (heatmapLayer) heatmapLayer.setMap(null);
}

function showCompradores() {
    currentFilter = 'comprador';
    markers.forEach(marker => {
        marker.setMap(marker.locationType === 'comprador' ? map : null);
    });
    if (heatmapLayer) heatmapLayer.setMap(null);
}

// Show heatmap
function showHeatmap() {
    if (heatmapLayer) {
        heatmapLayer.setMap(heatmapLayer.getMap() ? null : map);
        return;
    }
    
    const heatmapData = markers
        .filter(marker => marker.getMap() !== null)
        .map(marker => marker.getPosition());
    
    heatmapLayer = new google.maps.visualization.HeatmapLayer({
        data: heatmapData,
        radius: 50,
        opacity: 0.6
    });
    
    heatmapLayer.setMap(map);
    
    // Hide markers when heatmap is shown
    markers.forEach(marker => marker.setMap(null));
}

// Calculate centroids
function calculateCentroids() {
    // Clear existing centroids
    centroids.forEach(centroid => centroid.setMap(null));
    centroids = [];
    
    // Group markers by type
    const fornecedores = markers.filter(m => m.locationType === 'fornecedor' && m.getMap());
    const compradores = markers.filter(m => m.locationType === 'comprador' && m.getMap());
    
    if (fornecedores.length > 0) {
        const centroid = calculateCentroid(fornecedores);
        addCentroidMarker(centroid, 'Centróide Fornecedores', '#4a7c2e');
    }
    
    if (compradores.length > 0) {
        const centroid = calculateCentroid(compradores);
        addCentroidMarker(centroid, 'Centróide Compradores', '#daa520');
    }
    
    alert(`Centróides calculados!\n\nFornecedores: ${fornecedores.length}\nCompradores: ${compradores.length}`);
}

// Calculate centroid from markers
function calculateCentroid(markers) {
    let totalLat = 0;
    let totalLng = 0;
    
    markers.forEach(marker => {
        const pos = marker.getPosition();
        totalLat += pos.lat();
        totalLng += pos.lng();
    });
    
    return {
        lat: totalLat / markers.length,
        lng: totalLng / markers.length
    };
}

// Add centroid marker
function addCentroidMarker(position, label, color) {
    const marker = new google.maps.Marker({
        position: position,
        map: map,
        title: label,
        icon: {
            path: google.maps.SymbolPath.CIRCLE,
            scale: 12,
            fillColor: color,
            fillOpacity: 0.8,
            strokeColor: '#ffffff',
            strokeWeight: 3
        },
        zIndex: 1000
    });
    
    const infoWindow = new google.maps.InfoWindow({
        content: `<div style="padding: 10px;"><strong>${label}</strong><br>Lat: ${position.lat.toFixed(4)}<br>Lng: ${position.lng.toFixed(4)}</div>`
    });
    
    marker.addListener('click', () => {
        infoWindow.open(map, marker);
    });
    
    centroids.push(marker);
}

// Optimize routes
function optimizeRoutes() {
    const visibleMarkers = markers.filter(m => m.getMap() !== null);
    
    if (visibleMarkers.length < 2) {
        alert('É necessário ter pelo menos 2 marcadores visíveis para otimizar rotas.');
        return;
    }
    
    // Create a simple TSP solution using nearest neighbor
    const route = nearestNeighborTSP(visibleMarkers);
    
    // Draw route on map
    const path = route.map(marker => marker.getPosition());
    
    const polyline = new google.maps.Polyline({
        path: path,
        geodesic: true,
        strokeColor: '#2d5016',
        strokeOpacity: 0.8,
        strokeWeight: 3,
        map: map
    });
    
    // Calculate total distance
    const totalDistance = calculateRouteDistance(path);
    
    alert(`Rota otimizada!\n\nTotal de pontos: ${route.length}\nDistância estimada: ${totalDistance.toFixed(2)} km`);
}

// Nearest neighbor TSP algorithm
function nearestNeighborTSP(markers) {
    const route = [];
    const unvisited = [...markers];
    
    // Start with first marker
    let current = unvisited.shift();
    route.push(current);
    
    while (unvisited.length > 0) {
        let nearest = null;
        let minDistance = Infinity;
        
        unvisited.forEach(marker => {
            const distance = google.maps.geometry.spherical.computeDistanceBetween(
                current.getPosition(),
                marker.getPosition()
            );
            
            if (distance < minDistance) {
                minDistance = distance;
                nearest = marker;
            }
        });
        
        route.push(nearest);
        unvisited.splice(unvisited.indexOf(nearest), 1);
        current = nearest;
    }
    
    return route;
}

// Calculate total route distance
function calculateRouteDistance(path) {
    let totalDistance = 0;
    
    for (let i = 0; i < path.length - 1; i++) {
        totalDistance += google.maps.geometry.spherical.computeDistanceBetween(
            path[i],
            path[i + 1]
        );
    }
    
    return totalDistance / 1000; // Convert to km
}

// Animate statistics
function animateStats() {
    const stats = [
        { id: 'stat-clientes', target: 6591, suffix: '' },
        { id: 'stat-fornecedores', target: 2547, suffix: '' },
        { id: 'stat-propriedades', target: 1823, suffix: '' },
        { id: 'stat-area', target: 450000, suffix: '+' }
    ];
    
    stats.forEach(stat => {
        animateValue(stat.id, 0, stat.target, 2000, stat.suffix);
    });
}

// Animate number value
function animateValue(id, start, end, duration, suffix = '') {
    const element = document.getElementById(id);
    const range = end - start;
    const increment = range / (duration / 16);
    let current = start;
    
    const timer = setInterval(() => {
        current += increment;
        if (current >= end) {
            current = end;
            clearInterval(timer);
        }
        element.textContent = Math.floor(current).toLocaleString('pt-BR') + suffix;
    }, 16);
}

// Scroll effects
function initScrollEffects() {
    const navbar = document.getElementById('navbar');
    
    window.addEventListener('scroll', () => {
        if (window.scrollY > 100) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });
    
    // Smooth scroll for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
}

// Utility: sleep function
function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

// Export data to CSV
function exportToCSV(data, filename) {
    const csv = data.map(row => {
        return Object.values(row).map(value => {
            return `"${value}"`;
        }).join(',');
    }).join('\n');
    
    const blob = new Blob([csv], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = filename;
    a.click();
}
