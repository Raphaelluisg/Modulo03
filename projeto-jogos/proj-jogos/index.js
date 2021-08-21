const express = require('express');
const app = express();

const port = 3010;

app.use(express.json());

const jogos = [
    'Final Fantasy VII',
    'Chrono trigger',
    'Silent Hill',
    'Resident Evil',
    'Parasite Eve',
    'Mario Rpg',
    'Lufia',
    'lineage II',
    'Enduro',
];

const msgInicio = [
    'Ola',
    'Bom dia, seja bem vindo.',
    'Hoje é seu dia',
    'Veja seu jogo, escolhido do dia.'
];

function randomMinMax(min, max) {
    return Math.floor(Math.random() * (max - min)) + min;
}

function frase(num){
    return msgInicio[num];
}

//GET /HOME
app.get('/', (req, res) => {
    res.send(`<h1>${frase(randomMinMax(0, 3))}</h1>`);
});

//forEach é para poder mostrar item a item da lista jogos
jogos.forEach(function(item, indice){
    console.log(item, indice);
})

//e para poder tamanho da lista length
console.log(jogos.length);

//Get para a rota meus jogos
app.get('/meusjogos', (req, res) => {
    res.send(jogos);
});

// rota para um jogo apresentado aleatoriamente
function jogoAleatorio(num) {
    return jogos[num];
};

app.get('/meusjogos/jogoAleatorio', (req, res) => {
    res.send(`${jogoAleatorio(randomMinMax(0,jogos.length))}`);
});

app.get('/meusjogos/:id', (req, res) => {
    const id = req.params.id -1;
    const jogo = jogos[id];
    if (!jogo){
        res.send("ID Inválido, jogo não localizado.")
    }else{
    res.send(jogo);
    }
});

//POST rota para criar
app.post('/meusjogos', (req, res) => { 
    const jogo = req.body.jogo;
    console.log(req.body);
    const id = jogos.length;
    jogos.push(jogo);

    res.send(`Novo Jogo adicionado com sucesso: ${jogo}.`)
})

//PUT, rota para atualizar
app.put('/meusjogos/:id', (req, res) => {
    const id = req.params.id -1;
    const jogo = req.body.jogo;
    const jogoAnterior = jogos[id]; //guardar o jogo anterior para ser exibido
    jogos[id] = jogo;
    res.send(`Alteração no jogo ${jogoAnterior}. Lista de jogos atualizado com sucesso.:${jogo}`)
});

//DELETE, para deletar, deixando null na tabela
app.delete('/meusjogos/:id', (req, res) => {
    const id = req.params.id -1;
    delete jogos[id];
    if(!jogo){
        res.send("Jogo não encontrado.")
    }
    delete jogos[id];
    res.send("O jogo foi deletado com sucesso.")
})

app.listen(port, () =>{
    console.log(`App funcionando na porta: http://localhost:${port}/`);
});