import express from 'express';
import pg from 'pg';

const app = express()

const { Client } = pg
const client = new Client({ connectionString: process.env.POSTGRES_URL })
await client.connect();

app.use(express.json());

app.use(express.static('public'));

app.post('/api/usuario', async (req, res) => {
  let data = req.body;

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
  res.json(result.rows[0]);
});

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => console.log(`Server is running in port ${PORT}`));
