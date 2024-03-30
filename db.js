// import  {Pool}  from 'pg';

import pkg from 'pg';
const {Pool} = pkg;

import { config } from 'dotenv';
config();
const host = process.env.DB_HOST;
const user = process.env.DB_USER;
const password = process.env.DB_PASSWORD;
const database = process.env.DB_DATABASE;


const pool = new Pool({
  user: user,
  host: host,
  database: database,
  password: password,
  port: 5432,
});


pool.connect()
  .then(() => {
    console.log('Database connection successful');
  })
  .catch(error => {
    console.error('Error connecting to database:', error);
  });

/**
 * Execute a SQL query with parameters
 * @param {string} queryText - The SQL query string
 * @param {array} queryParams - An array of parameter values
 * @returns {Promise} - A promise that resolves with the query result
 */
export async function query(queryText, queryParams) {
    try {
      const client = await pool.connect();
      const result = await client.query(queryText, queryParams);
      client.release();
      return result;
    } catch (error) {
      console.error('Error executing query:', error);
      throw error;
    }
  }
  
  export default pool;
