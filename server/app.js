import cors from 'cors';
import express from 'express';
import helmet from 'helmet';
import path from 'path';
import logger from 'morgan';
import cookieParser from 'cookie-parser';
import methodOverride from 'method-override';
import routes from './routes';
require('dotenv').config();
const app = express();
app.use(cors({
  origin: 'localhost:3000',
  credentials: true,
  exposedHeaders: ['Set-Cookie'],
  preflightContinue: true,
  allowedHeaders: 'Content-Type, Authorization, X-Requested-With',
}));
app.use(helmet({ contentSecurityPolicy: false }));
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, '/views'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));
app.use(methodOverride('_method'));
app.use(cookieParser());
app.use(logger('dev'));
app.use(routes);
const port = process.env.PORT_NUM;
app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
