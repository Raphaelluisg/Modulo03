const express = require('express'); //*importando o modulo express
const app = express(); //express dentro do app

const port = 3000;

app.use(express.json());

const filmes = [
    'Exterminador do Futuro 2',
    'Willow',
    'Star Wars - Uma nova esperança',
    'Loucademia de Policia',
    'Robocop',
    'Batman - Cavaleiro das Trevas',
    'Conan - O Barbaro',
    'Alien - O Oitavo Passageiro'
];

const msgFilmes = [
    'Bem vindo ao mundo do cinema',
    'Escolha e assista seu filme favorito',
    'The winter is comming',
    'I´m Batman',
]

function randomMinMax(min, max) {
    return Math.floor(Math.random() * (max - min) + min);
}

function frase(num){
    return msgFilmes[num];
}

//GET, rota home
app.get('/', (req, res) => {
    res.send(`<h2>${frase(randomMinMax(0, 3))}</h2>`);
});

//GET/filmes ,para poder listar todos os filmes da const filmes
app.get('/filmes', (req, res) => {
    res.send(filmes);
});

//rota para mostrar um filme aleatório
function filmeAleatorio(num){
    return filmes[num];
};

app.get('/filmes/filmeAleatorio', (req, res) => {
    res.send(`${filmeAleatorio(randomMinMax(0, filmes.length))}`);
});

//GET /meusfilmes/:id, para poder exibir apenas o id(nesse caso o filme(numero)selecionado)
app.get('/filmes/:id', (req, res) => {
    const id = req.params.id -1;
    const filme = filmes[id];
    if(!filme){
        res.send('Id não encontrado, tente novamente.')
    }else{
    res.send(filme);
    }
});

app.post('/filmes', (req, res) => {
    const filme = req.body.filme;
    console.log(req.body);
    const id = filmes.length;
    filmes.push(filme);
    res.send(`Filme adicionado com sucesso: ${filme}`);
});

app.put('/filmes/:id', (req, res) => {
    const id = req.params.id -1;
    const filme = req.body.filme;
    const filmeAnterior = filme[id]; //guardar o jogo anterior para ser exibido
    filmes[id] = filme;
    res.send(`Alteração no jogo ${filmeAnterior}. Lista de jogos atualizado com sucesso.:${filme}`)
});

app.delete('/filmes/:id', (req, res) => {
    const id = req.params.id -1;
    delete filmes[id];
    if(!filme){
        res.send("Filme não encontrado.")
    }
    delete filmes[id];
    res.send("O filme foi deletado com sucesso.")
});

app.listen(port, ()=>{
    console.info(`O app está funcionando na porta: http://localhost:${port}/`);
});