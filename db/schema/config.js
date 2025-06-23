import pg from 'pg'
import 'dotenv/config'

const { PGHOST, PGUSER, PGPASSWORD, PGDATABASE, PGPORT } = process.env

/*
console.log('DEBUG: DB_HOST: ', DB_HOST)
console.log('DEBUG: DB_USER: ', DB_USER)
console.log('DEBUG: DB_PASSWORD: ', DB_PASSWORD)
console.log('DEBUG: DB_DATABASE: ', DB_DATABASE)
console.log('DEBUG: DB_PORT: ', DB_PORT)
*/

const pool = new pg.Pool({
  host: PGHOST,
  user: PGUSER,
  password: PGPASSWORD,
  database: PGDATABASE,
  port: PGPORT,
  allowExitOnIdle: true
})

pool.query('SELECT NOW()', (err, res) => {
  if (err) {
    console.log('Error connecting to DB', err)
  } else {
    console.log('DB Connected', res.rows[0])
  }
})

export default pool
