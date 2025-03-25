import { serve } from '@hono/node-server'
import { Hono } from 'hono'

const app = new Hono()
import mysql from 'mysql2/promise';
import 'dotenv/config'

app.get('/', (c) => {
  return c.text('Hello Hono!')
})
export default app
serve({
  fetch: app.fetch,
  port: 3000
}, (info) => {
  console.log(`Server is running on http://localhost:${info.port}`)
})

const dbConfig = {
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  connectionLimit: 10, // Le nombre maximal de connexion simultané
  waitForConnections: true,
  queueLimit: 0,
}
const pool = mysql.createPool(dbConfig)

testConnexion()

async function testConnexion() {
  try {
    // Demander une connexion au pool
    const connexion = await pool.getConnection()
    console.log("Connexion réussie")
    connexion.release()
  } catch (error) {
    console.log("Bonsoir non")
  }
}

async function getFilms() {
  try {
    const [resultat] = await pool.query('SELECT films.*, genres.nom AS genre_nom FROM films LEFT JOIN genres ON films.genre_id = genres.id')
    console.log(resultat) // Afficher dans la console la liste des films
    return (resultat) // Retourne une promesse
  } catch (error) {
    console.log('Erreur lors de la récupération des données')
    throw error // Retourner donc une promesse qui ne va pas être résolue
  }
}

getFilms()

app.use('*', async (c, next) => {
  c.header('Access-Control-Allow-Origin', '*');
  c.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  c.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');

  if (c.req.method === 'OPTIONS') {
    return c.text('', 204);
  }

  await next();
});

app.get('/api/films', async (c) => {
  try {
    const films = await getFilms(); // Appel à votre fonction asynchrone
    return c.json({ status: 'success', data: films }); // Renvoi des données sous forme de JSON
  } catch (error) {
    console.error(error);
    return c.json({ message: 'Une erreur est survenue lors de la récupération des films.' }, 500);
  }
});