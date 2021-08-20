const express = require('express');
const app = express();

const port = 4000;

app.use(express.json());

const modelos = [
    'Onix',
    'hilux',
    'Uno',
    'C6',
    'Clio',
    'Spacefox',
];

const tipos = [
    'SUV',
    'Sedan',
    'Hatch',
];

const combustiveis = [
    'Alcool',
    'Gasolina',
    'Flex',
    'Diesel',
];

const marcas = [
    'Chevrolet',
    'Fiat',
    'Citroen',
    'Toyota',
    'Volkswagen',
    'Renault',
];

const anoCarros = [
    '1970',
    '2005',
    '2015',
];

const msgInicial = [
    'Seja bem vindo a sua concessionaria',
    'Concessionaria do Seu lunga',
    'Concessionaria a curva te espera, aguardando seu contato'
];

function random(){
    return Math.floor(Math.random() * msgInicial.length);
};

console.log(random());

app.get('/', (req, res) => {
    res.send(msgInicial[random()]);
});

app.get('/carros', (req, res) => {
    res.send(`Modelos: ${modelos},
    Marca: ${marcas},
    Tipo: ${tipos},
    Combustivel: ${combustiveis},
    Ano:${anoCarros},`);
});

app.get('/carros/:id', (req, res) => {
    const id = req.params.id -1;
    if(!modelos[id] || !marcas[id] || !tipos[id] || !combustiveis[id] || !anoCarros[id]) {
    }
    res.send(`Modelos: ${modelos},
    Marca: ${marcas},
    Tipo: ${tipos},
    Combustivel: ${combustiveis},
    Ano:${anoCarros},`)
});

app.post('/carros', (req, res) =>{
    const modelo = req.body.modelo;
    const marca = req.body.marca;
    const tipo = req.body.tipo;
    const combustivel = req.body.combustivel;
    const anoCarro = req.body.anoCarro;

    const id = modelos.length;

    modelos[id] = modelo;
    marcas[id] = marca;
    tipos[id] = tipo;
    combustiveis[id] = combustivel;
    anoCarros[id] = anoCarro;

    res.send(`Carro adicionado com sucesso: ${modelo}.
    O ID do veiculo registrado é ${id+1}`)
});

app.put('/carros/:id', (req, res) => {
    const id = req.params.id - 1;
    if(!modelos[id] || !marcas[id] || !tipos[id] || !combustiveis[id] || !anoCarros[id]);{
        res.send('Veículo não encontrado, tente novamente.');
}
    const modelo = req.body.modelo;
    const modeloAnterior = modelos[id];
    const marca = req.body.marca;
    const tipo = req.body.tipo;
    const combustivel = req.body.combustivel;
    const anoCarro = req.body.anoCarro;

    modelos[id] = modelo;
    marcas[id] = marca;
    tipos[id] = tipo;
    combustiveis[id] = combustivel;
    anoCarros[id] = anoCarro;
    res.send(`Veiculo atualizado com sucesso, o veiculo anterior era: ${modeloAnterior}, sendo substituido por: ${modelo}`)
});

app.delete('/carros/:id', (req, res) => {
    const id = req.params.id -1;

    if(!modelos[id] || !marcas[id] || !tipos[id] || !combustiveis[id] || !anoCarros[id]){
        res.send("Veiculo não foi encontrado, tente novamente!");
    }

    delete modelos[id];
    delete marcas[id];
    delete tipos[id];
    delete combustiveis[id];
    delete anoCarros[id];
    res.send("Veiculo excluído com sucesso.") 
});

app.listen(port, () => {
    console.info(`App Funcionando em: http://localhost:${port}`)
});