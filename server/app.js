import express from 'express';
import helmet from 'helmet';
import path from 'path';
import logger from 'morgan';
import session from 'express-session';
import methodOverride from 'method-override';
import routes from './routes';
const app = express();
app.use(helmet({
  contentSecurityPolicy: false,
}));
const port = process.env.PORT_NUM;
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, '/views'));
app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
app.use(logger('dev'));
app.use(express.static('public'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
const expiryDate = new Date(Date.now() + 2 * 60 * 60 * 1000); 
app.use(session({
  name: process.env.SESSION_NAME,
  resave: false,
  saveUninitialized: false,
  secret: process.env.SESSION_SECRET,
  cookie: {
    httpOnly: true,
    path: '/',
    expiryDate,
    sameSite: true,
    secure: false,
  },
}));
app.use(methodOverride('_method'));
app.use(routes);
app.use((req, res) => {
  let login = false;
  if (req.session.userId) { login = true; }
  res.status(404).render('404', { title: '404', login, username: req.session.username || '' });
});
