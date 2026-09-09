const mysql = require('mysql2/promise');

// Parse CA certificate from environment if available
const sslOptions = process.env.DB_CA_CERT
  ? { ca: process.env.DB_CA_CERT }
  : { rejectUnauthorized: false };

const pool = mysql.createPool({
  uri: process.env.DATABASE_URL,
  ssl: sslOptions,
  waitForConnections: true,
  connectionLimit: 5,
  queueLimit: 0
});

module.exports = pool;