const express = require('express');
const app = express();
const port = 3000;
app.set('view engine', 'ejs');
app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
app.use(express.static('./public'));
app.get('/', (req, res) => {
  res.render('index', { title: 'Home' });
});
app.get('/index', (req, res) => {
  res.redirect('/');
});
app.get('/home', (req, res) => {
  res.redirect('/');
});
app.get('/rockpaperscissor', (req, res) => {
  res.render('rockpaperscissor', { title: 'Rock Paper Scissor' });
});
