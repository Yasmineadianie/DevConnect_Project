import express from 'express';
import connection from './config/db.js';
import cors from 'cors';
import { uploadImage } from './middlewares/multer.js';

import bcrypt from 'bcrypt';
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import jwt from 'jsonwebtoken';
import { verifyToken } from './middlewares/verifyToken.js';

const __dirname = dirname(fileURLToPath(import.meta.url));

const port = process.env.PORT || 4000;
const app = express();

const allowedOrigins = [
  'https://dev-connect-project-flax.vercel.app',
  'http://localhost:5173',
  'http://localhost:3000'
];

app.use(cors({
  origin: function (origin, callback) {
    
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error('Bloqueado por CORS: Origen no permitido'));
    }
  },
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  credentials: true
}));


app.use(express.json());

app.use('/images', express.static(__dirname + '/public/images'));

//****************  AUTH Y LOGIN DE LA PAGINA DEvConnect************

app.post('/api/register', uploadImage('users'), async (req, res) => {
  console.log(' Intento de Registro ');
  console.log('Body recibido:', req.body);
  console.log('Archivo recibido:', req.file);

  try {
    // 1. Extraemos y parseamos los datos que vienen del FormData
    if (!req.body.registerData) {
      return res.status(400).json({ message: 'No data provided' });
    }

    const data = JSON.parse(req.body.registerData);
    const { name, lastname, email, bio, password } = data;

    // 2. Gestionamos la imagen (Multer la guarda en req.file)
    const imgName = req.file ? req.file.filename : 'default.png';

    // 3. Encriptamos y guardamos en DB
    let sql =
      'INSERT INTO user(name, lastname, email, bio, img, password) VALUES (?,?,?,?,?,?)';
    let hashedPass = await bcrypt.hash(password, 10);
    let values = [name, lastname, email, bio, imgName, hashedPass];

    await connection.query(sql, values);

    res.status(200).json({ message: 'User created successfully' });
  } catch (error) {
    console.error('ERROR EN REGISTER:', error);
    res.status(500).json({ error: error.message });
  }
});

//**********login*******
app.post('/api/login', async (req, res) => {

  console.log('********', req.body);

  const { email, password } = req.body;

  try {
    let sql = 'select *  from user where email = ?';

    let values = [email];
    let [result] = await connection.query(sql, values);

    if (result.length == 0) {
      res.status(401).json({ message: 'Unauthorized' });
    } else {
      let user = result[0];

      let resultCompare = await bcrypt.compare(password, user.password);

      console.log('resultCompare', resultCompare);

      if (!resultCompare) {
        res.status(401).json({ message: 'Invalid password' });
      } else {
        const token = jwt.sign({ user_id: user.user_id }, 'cloclo', {
          expiresIn: '2d',
        });
        console.log('tokennn', token);

        res.status(200).json({ message: 'login good', token });
      }
    }
  } catch (error) {
    console.log(error);

    res.status(500).json('error', error);
  }
});

app.get('/api/getUser', verifyToken, async (req, res) => {
  try {
    const { idUser } = req;

    let sql =
      'select user_id, name, lastname, email, type, bio, img  from user where user_id = ?';
    let [result] = await connection.query(sql, [idUser]);
    console.log(result);

    res.status(200).json({ user: result[0] });
  } catch (error) {
    console.log(error);

    res.status(500).json('error');
  }
});

app.get('/api/profiles', async (req, res) => {
  try {
    let sql =
      'select user_id, name, lastname, email, type, bio, img  from user';

    let users = await connection.query(sql);
    res.status(200).json(users);
  } catch (error) {
    console.log(error);
    res.status(500).json('error');
  }
});

app.listen(port, () => console.log('corriendo por el ' + port));
