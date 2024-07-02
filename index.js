const pg = require('pg');
const express = require('express');

const app = express()

const { Client } = pg
const client = new Client({ connectionString: process.env.POSTGRES_URL })

app.use(express.static('public'));

app.use(express.json({ extended: false }));

app.post('/api/usuario', async (req, res) => {
  
  await client.connect();

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
