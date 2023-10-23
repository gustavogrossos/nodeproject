const express = require('express')
const app = express()
const port = 3000
app.use(express.json());

let bd = [

    {
        id: "1",
        name: "Gustavo"
    },

    {
        id : "2",
        name: "Felippe"
    }

]





app.get('/users', (request, response) => {
  response.json(bd);
})

app.get('/users/:id', (request, response) => {

// PEGAR O ID DA REQUISIÇÃO
const idUser = request.params.id;

// ENCONTRAR O USUÁRIO CORRESPONDENTE NO BANCO DE DADOS
const user = bd.filter((usuario) => usuario.id === idUser);



// RESPONDER A REQUISIÇÃO COM AS INFORMAÇÕES DO USUÁRIO
response.json(user);
})

app.post('/users', (request, response) =>{

// PEGAR O CORPO DA REQUISIÇÃO
const body = request.body;

// CRIAR UM NOVO OBJETO A PARTIR DESSE CORPO
const newUser = {
  id: (bd.length + 1).toString(),
  name: body.name
}

// ADICIONAR ESSE NOVO OBJETO NO BANCO
bd.push(newUser);

// RESPONDER A REQUISIÇÃO COM O BANCO COMPLETO
response.json(bd);

})

app.delete('/users/:id', (request, response) => {

// PEGAR O ID DA REQUISIÇÃO
const idUser = request.params.id;

// PERCORRER O BANCO E ENCONTRAR QUEM TEM O ID DA REQUISIÇÃO
bd = bd.filter((usuario) => usuario.id != idUser);

// DELETAR O USUÁRIO QUE TEM O ID

// RESPONDER COM O MEU BANCO ATUALIZADO
response.json(bd);

})

app.patch('/users/:id', (request, response) =>{

// PEGAR O ID DA REQUISIÇÃO
const idUser = request.params.id;

// PEGAR O CORPO DA REQUISIÇÃO
const body = request.body;

// PERCORRER O BANCO
bd = bd.map((usuario) => {

  if(usuario.id === idUser){
    usuario.name = body.name;
  }

  return usuario

})

// RESPONDER A REPOSIÇÃO COM O BANCO
response.json(bd)

})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})