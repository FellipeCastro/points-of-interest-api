const mysql = require('mysql2/promise');
const fs = require('fs');
const path = require('path');
require('dotenv').config({ path: path.resolve(process.cwd(), '.env.test') });

module.exports = async () => {
  // Wait for MySQL to be ready
  const maxAttempts = 20;
  let attempt = 0;
  while (attempt < maxAttempts) {
    try {
      const connection = await mysql.createConnection({
        host: process.env.DB_HOST,
        port: process.env.DB_PORT,
        user: process.env.DB_USER,
        password: process.env.DB_PASSWORD,
      });
      await connection.end();
      break;
    } catch (err) {
      attempt++;
      // eslint-disable-next-line no-console
      console.log(`Waiting for MySQL... attempt ${attempt}`);
      // eslint-disable-next-line no-await-in-loop
      await new Promise((r) => setTimeout(r, 1000));
    }
  }

  // Create test database schema (table)
  const connection = await mysql.createConnection({
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
  });

  const createTableSql = `
    CREATE TABLE IF NOT EXISTS points_of_interest (
      id INT AUTO_INCREMENT PRIMARY KEY,
      name VARCHAR(255) NOT NULL,
      coordinate_x INT NOT NULL,
      coordinate_y INT NOT NULL
    );
  `;

  await connection.query(createTableSql);
  await connection.end();
};
