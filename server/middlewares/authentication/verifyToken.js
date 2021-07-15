import jwtAuth from './jwtAuth';
const verifyToken = (req, res, next) => {
  if (req.cookies.access_token) {
    const token = req.cookies.access_token.split(' ')[1];
    return jwtAuth.verify(
      token,
      (decoded) => {
        req.decoded = decoded;
        next();
      },
      () => res.redirect('/'),
    );
  }
  return res.redirect('/auth/login');
};
export default verifyToken;
