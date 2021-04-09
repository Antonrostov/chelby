import express from 'express';
import morgan from 'morgan';
import path from 'path';
import routes from './routes/routes';
import authRoutes from './routes/authRoutes';
const app = express();
const port = 3000;
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, '/views'));
app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
app.use(morgan('tiny'));
app.use(express.static('public'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(routes);
app.use('/auth', authRoutes);
app.use((req, res) => {
  res.status(404).render('404', { title: '404' });
});
