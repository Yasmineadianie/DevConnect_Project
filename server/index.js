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

const port = 4000;
const app = express();

app.use(cors());
app.use(express.json());

app.use('/images', express.static(__dirname + '/public/images'));

//**************** EJERCICIO DE AUTH Y LOGIN DE LA PAGINA DEvConnect************

app.post('/api/register', async (req, res) => {
  console.log(req.body);
  const { name, lastname, email, bio, img, password } = req.body;

  try {
    let sql =
      'INSERT INTO user(name, lastname, email, bio, img, password) VALUES (?,?,?,?,?,?)';
    let hashedPAss = await bcrypt.hash(password, 10);
    let values = [name, lastname, email, bio, img, hashedPAss];
    await connection.query(sql, values);

    res.status(200).json('todo ok');
  } catch (error) {
    console.log(error);

    res.status(500).json(error);
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
