import express from 'express';
import path from 'path';
import logger from 'morgan';
import session from 'express-session';
import methodOverride from 'method-override'
import routes from './routes/routes';
import authRoutes from './routes/authRoutes';
const app = express();
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
app.use(session({
  name: process.env.SESSION_NAME,
  resave: false,
  saveUninitialized: false,
  secret: process.env.SESSION_SECRET,
  cookie: {
    maxAge: 2 * 60 * 60 * 1000, 
    sameSite: true,
    secure: false,
  },
}));
app.use(methodOverride('_method'));
app.use(routes);
app.use('/auth', authRoutes);
app.use((req, res) => {
  res.status(404).render('404', { title: '404' });
});
