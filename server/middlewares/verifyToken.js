import jwt from 'jsonwebtoken';
export const verifyToken = (req, res, next) => {
  let tokenBearer = req.headers.authorization;
  let token = tokenBearer.split(' ')[1];

  try {
    let result = jwt.verify(token, 'cloclo');

    const { user_id } = result;
    req.idUser = user_id;

    next();
  } catch (error) {
    console.log(error);
    res.status(401).json('unauthorized');
  }
};
