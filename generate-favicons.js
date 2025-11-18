/**
 * ArcSat Favicon Generator
 * Generates all necessary favicon and social media images
 * Uses Canvas to create professional icons with ArcSat branding
 */

const fs = require('fs');
const { createCanvas } = require('canvas');

// ArcSat Color Palette
const colors = {
    primary: '#2d5016',
    secondary: '#4a7c2e',
    accent: '#6b9d3e',
    gold: '#daa520',
    white: '#ffffff'
};

/**
 * Draw ArcSat logo on canvas
 */
function drawLogo(canvas, size) {
    const ctx = canvas.getContext('2d');
    const scale = size / 100;

    // Background gradient
    const gradient = ctx.createLinearGradient(0, 0, size, size);
    gradient.addColorStop(0, colors.primary);
    gradient.addColorStop(1, colors.secondary);
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, size, size);

    // Draw stylized "AS" letters
    ctx.fillStyle = colors.white;
    ctx.font = `bold ${40 * scale}px Arial`;
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText('A', size * 0.35, size * 0.45);
    
    ctx.fillStyle = colors.gold;
    ctx.fillText('S', size * 0.65, size * 0.55);

    // Draw arc/satellite icon
    ctx.strokeStyle = colors.gold;
    ctx.lineWidth = 3 * scale;
    ctx.beginPath();
    ctx.arc(size * 0.5, size * 0.5, size * 0.35, -Math.PI * 0.3, Math.PI * 0.3);
    ctx.stroke();

    // Draw satellite point
    ctx.fillStyle = colors.gold;
    ctx.beginPath();
    ctx.arc(size * 0.75, size * 0.35, 3 * scale, 0, Math.PI * 2);
    ctx.fill();

    // Add subtle leaf/grain icon
    ctx.strokeStyle = colors.accent;
    ctx.lineWidth = 2 * scale;
    ctx.beginPath();
    ctx.moveTo(size * 0.2, size * 0.8);
    ctx.quadraticCurveTo(size * 0.25, size * 0.7, size * 0.3, size * 0.75);
    ctx.stroke();
}

/**
 * Draw social media image
 */
function drawSocialImage(canvas, width, height) {
    const ctx = canvas.getContext('2d');

    // Background gradient
    const gradient = ctx.createLinearGradient(0, 0, width, height);
    gradient.addColorStop(0, colors.primary);
    gradient.addColorStop(1, colors.secondary);
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, width, height);

    // Add pattern
    ctx.strokeStyle = 'rgba(255, 255, 255, 0.05)';
    ctx.lineWidth = 2;
    for (let i = 0; i < 10; i++) {
        ctx.beginPath();
        ctx.arc(width * (i * 0.1), height * 0.5, height * 0.3, 0, Math.PI * 2);
        ctx.stroke();
    }

    // Logo in corner
    const logoSize = height * 0.4;
    const logoCanvas = createCanvas(logoSize, logoSize);
    drawLogo(logoCanvas, logoSize);
    ctx.drawImage(logoCanvas, 50, height / 2 - logoSize / 2);

    // Title
    ctx.fillStyle = colors.white;
    ctx.font = `bold ${height * 0.12}px Arial`;
    ctx.textAlign = 'left';
    ctx.textBaseline = 'middle';
    ctx.fillText('ArcSat', logoSize + 80, height * 0.35);

    // Subtitle
    ctx.fillStyle = colors.gold;
    ctx.font = `${height * 0.06}px Arial`;
    ctx.fillText('Inteligência Geoespacial', logoSize + 80, height * 0.55);
    ctx.fillText('para o Agronegócio', logoSize + 80, height * 0.68);

    // URL
    ctx.fillStyle = 'rgba(255, 255, 255, 0.8)';
    ctx.font = `${height * 0.05}px Arial`;
    ctx.fillText('www.arcsat.com.br', width - 250, height - 30);
}

/**
 * Generate favicon in specified size
 */
function generateFavicon(size) {
    const canvas = createCanvas(size, size);
    drawLogo(canvas, size);
    return canvas;
}

/**
 * Generate social media image
 */
function generateSocialImage(width, height) {
    const canvas = createCanvas(width, height);
    drawSocialImage(canvas, width, height);
    return canvas;
}

/**
 * Save canvas to PNG file
 */
function saveAsPNG(canvas, filename) {
    const buffer = canvas.toBuffer('image/png');
    fs.writeFileSync(filename, buffer);
    console.log(`✅ Criado: ${filename}`);
}

/**
 * Main generation function
 */
function generateAllAssets() {
    console.log('🎨 Gerando favicons e imagens sociais do ArcSat...\n');

    // Favicon sizes
    const faviconSizes = [16, 32, 48, 180, 192, 512];
    
    faviconSizes.forEach(size => {
        const canvas = generateFavicon(size);
        saveAsPNG(canvas, `favicon-${size}x${size}.png`);
    });

    // Special: favicon.ico (32x32 is most common)
    const faviconCanvas = generateFavicon(32);
    saveAsPNG(faviconCanvas, 'favicon.png');
    console.log('ℹ️  Renomeie favicon.png para favicon.ico se necessário');

    // Social media images
    console.log('\n📱 Gerando imagens para redes sociais...\n');
    
    const ogCanvas = generateSocialImage(1200, 630);
    saveAsPNG(ogCanvas, 'og-image.png');

    const twitterCanvas = generateSocialImage(1200, 600);
    saveAsPNG(twitterCanvas, 'twitter-card.png');

    console.log('\n✨ Todos os assets foram gerados com sucesso!');
    console.log('\n📋 Arquivos criados:');
    console.log('   - favicon-16x16.png');
    console.log('   - favicon-32x32.png');
    console.log('   - favicon-48x48.png');
    console.log('   - favicon-180x180.png (Apple Touch Icon)');
    console.log('   - favicon-192x192.png (Android)');
    console.log('   - favicon-512x512.png (Android)');
    console.log('   - favicon.png (para converter em .ico)');
    console.log('   - og-image.png (Open Graph 1200x630)');
    console.log('   - twitter-card.png (Twitter 1200x600)');
    console.log('\n💡 Dica: Use um conversor online para gerar .ico:');
    console.log('   https://convertico.com/ ou https://www.favicon-generator.org/');
}

// Check if canvas module is installed
try {
    require.resolve('canvas');
    generateAllAssets();
} catch (e) {
    console.error('❌ Módulo "canvas" não encontrado!');
    console.log('\n📦 Instale com: npm install canvas');
    console.log('\nOu use o gerador HTML: abra generate-favicons.html no navegador');
    process.exit(1);
}
