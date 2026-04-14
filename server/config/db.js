import mysql from 'mysql2/promise';
import dotenv from 'dotenv';

dotenv.config();

const connection = mysql.createPool({
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  ssl: { rejectUnauthorized: false },
});

const crearTablaSiNoExiste = async () => {
  try {
    const query = `
            CREATE TABLE IF NOT EXISTS user (
                user_id INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
                name VARCHAR(100),
                lastname VARCHAR(100),
                email VARCHAR(150) UNIQUE NOT NULL,
                password VARCHAR(255) NOT NULL,
                bio TEXT,
                img VARCHAR(255) DEFAULT 'default.png',
                type SMALLINT DEFAULT 0
            ) ENGINE=InnoDB;
        `;
    await connection.query(query);
    console.log(" ÉXITO: Tabla 'user' verificada o creada en Aiven.");
  } catch (error) {
    console.error(' ERROR al crear la tabla:', error.message);
  }
};

connection
  .getConnection()
  .then(() => {
    console.log('Conectado a Aiven.');
    crearTablaSiNoExiste();
  })
  .catch((err) => console.error('Error de conexión:', err.message));

export default connection;
