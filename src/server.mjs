import pg from 'pg';
import express from 'express'

const app = express()
const port = 3000


const { Client } = pg
const client = new Client({ connectionString: process.env.POSTGRES_URL })
await client.connect();

app.use(express.static('public'));

app.use(express.json());

app.post('/usuario', async (request, response) => {
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