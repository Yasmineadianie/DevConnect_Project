
import mysql from 'mysql2/promise';
import dotenv from 'dotenv';

dotenv.config();

let connection;

try {
    connection = await mysql.createConnection({
        host: process.env.DB_HOST || 'localhost',
        user: process.env.DB_USER || 'root',
        password: process.env.DB_PASSWORD || 'root',
        database: process.env.DB_NAME || 'redes',
        port: process.env.DB_PORT || 3306,
        ssl: process.env.DB_SSL === 'true' ? { rejectUnauthorized: false } : null
    });
    console.log(" Conexión a la base de datos ok.");
} catch (error) {
    console.error(" Error al conectar a la base de datos:", error.message);
}

export default connection;

// Función para crear la tabla automáticamente
const crearTablaInicial = async () => {
  try {
    const sql = `
      CREATE TABLE IF NOT EXISTS user (
        user_id INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
        name VARCHAR(50),
        lastname VARCHAR(50),
        email VARCHAR(100) UNIQUE NOT NULL,
        password VARCHAR(100) NOT NULL,
        bio TEXT,
        img VARCHAR(100),
        type SMALLINT NOT NULL DEFAULT 0
      );
    `;
    await connection.query(sql);
    console.log("Tabla 'user' verificada/creada en Aiven");
  } catch (err) {
    console.error(" Error al crear la tabla:", err.message);
  }
};

// Ejecutar la función
crearTablaInicial();