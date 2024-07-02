const pg = require('pg');
const express = require('express');

const app = express()
const port = process.env.PORT || 8080;


const { Client } = pg
const client = new Client({ connectionString: process.env.POSTGRES_URL })

app.use(express.static('public'));

app.use(express.json());

app.post('/usuario', async (request, response) => {
  
  await client.connect();

  let data = request.body;

  const text = 'INSERT INTO usuario (nome, sobrenome, idade, email, celular, principal, whatsapp, corporativo) VALUES($1, $2, $3, $4, $5, $6, $7, $8) RETURNING *'
  const values = [
    data.nome,
    data.sobrenome,
    data.idade,
    data.email,
    data.celular,
    data.selecaoPrincipal === 'sim',
    data.selecaoWhatsapp === 'sim',
    data.corporativo === 'sim'
  ]
 
  const result = await client.query(text, values)
  response.json(result.rows[0]);
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})

module.exports = app;