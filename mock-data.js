// Mock data generator for ArcSat demo
// Generates realistic sample data for Brazilian agribusiness

function generateMockClientes(count = 50) {
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
        { nome: 'Rondonópolis', uf: 'MT', lat: -16.4706, lng: -54.6356 },
        { nome: 'Patos de Minas', uf: 'MG', lat: -18.5789, lng: -46.5183 },
        { nome: 'Paracatu', uf: 'MG', lat: -17.2217, lng: -46.8750 }
    ];

    const nomesFornecedores = [
        'John Deere', 'Case IH', 'New Holland', 'Massey Ferguson',
        'Valtra', 'Jacto', 'Stara', 'Kuhn', 'Marchesan', 'Jumil',
        'Bunge', 'Cargill', 'ADM', 'Yara', 'Mosaic', 'Corteva',
        'Basf', 'Syngenta', 'FMC', 'Nufarm'
    ];

    const nomesFazendas = [
        'Fazenda Santa Maria', 'Fazenda Boa Vista', 'Agropecuária Moderna',
        'Fazenda Esperança', 'Fazenda São José', 'Fazenda Primavera',
        'Fazenda Bela Vista', 'Fazenda Progresso', 'Fazenda Futuro',
        'Fazenda União', 'Fazenda Harmonia', 'Fazenda Vitória'
    ];

    const cooperativas = [
        'Cooperativa Vale Verde', 'Cooperativa Agrícola Regional',
        'Cooperativa Central', 'Cooperativa do Cerrado',
        'Cooperativa Mista Rural', 'Cooperativa Tritícola'
    ];

    const setores = [
        'Automotiva Agrícola',
        'Insumos Agrícolas',
        'Produtor Rural',
        'Pecuária',
        'Cooperativa',
        'Distribuidor',
        'Concessionária'
    ];

    const clientes = [];

    for (let i = 0; i < count; i++) {
        const cidade = cidades[Math.floor(Math.random() * cidades.length)];
        const tipo = Math.random() > 0.6 ? 'fornecedor' : 'comprador';
        
        let nome, setor, categoria;
        
        if (tipo === 'fornecedor') {
            nome = nomesFornecedores[Math.floor(Math.random() * nomesFornecedores.length)] + 
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
                nome = nomesFazendas[Math.floor(Math.random() * nomesFazendas.length)];
                setor = Math.random() > 0.6 ? 'Produtor Rural' : 'Pecuária';
                categoria = ['Cliente Gold', 'Cliente Enterprise', 'Cliente Premium'][
                    Math.floor(Math.random() * 3)
                ];
            }
        }

        // Add some randomness to coordinates
        const latOffset = (Math.random() - 0.5) * 0.5;
        const lngOffset = (Math.random() - 0.5) * 0.5;

        clientes.push({
            nome: nome,
            tipo: tipo,
            endereco: `${cidade.nome}, ${cidade.uf}`,
            position: {
                lat: cidade.lat + latOffset,
                lng: cidade.lng + lngOffset
            },
            setor: setor,
            categoria: categoria,
            cnpj: gerarCNPJ(),
            telefone: gerarTelefone(cidade.uf),
            email: gerarEmail(nome)
        });
    }

    return clientes;
}

function gerarCNPJ() {
    const base = Math.floor(Math.random() * 90000000) + 10000000;
    const filial = '0001';
    return `${base.toString().substring(0, 2)}.${base.toString().substring(2, 5)}.${base.toString().substring(5)}/` +
           `${filial}-${Math.floor(Math.random() * 90) + 10}`;
}

function gerarTelefone(uf) {
    const ddds = {
        'SP': ['11', '12', '13', '14', '15', '16', '17', '18', '19'],
        'MG': ['31', '32', '33', '34', '35', '37', '38'],
        'GO': ['62', '64'],
        'MS': ['67'],
        'PR': ['41', '42', '43', '44', '45', '46'],
        'MT': ['65', '66'],
        'DF': ['61']
    };
    
    const ddd = ddds[uf] ? ddds[uf][Math.floor(Math.random() * ddds[uf].length)] : '11';
    const numero = Math.floor(Math.random() * 900000000) + 100000000;
    
    return `+55 ${ddd} ${numero.toString().substring(0, 5)}-${numero.toString().substring(5)}`;
}

function gerarEmail(nome) {
    const dominio = ['agro.com.br', 'rural.com.br', 'fazenda.com.br', 'agronegocio.com.br'][
        Math.floor(Math.random() * 4)
    ];
    
    const nomeNormalizado = nome
        .toLowerCase()
        .normalize('NFD')
        .replace(/[\u0300-\u036f]/g, '')
        .replace(/[^a-z0-9\s]/g, '')
        .split(' ')
        .slice(0, 2)
        .join('');
    
    return `contato@${nomeNormalizado}.${dominio}`;
}

// Export functions
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        generateMockClientes,
        gerarCNPJ,
        gerarTelefone,
        gerarEmail
    };
}
