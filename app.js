const express = require('express');
const morgan = require('morgan');
const routes = require('./routes/routes');
const app = express();
const port = 3000;
app.set('view engine', 'ejs');
app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
app.use(morgan('tiny'));
app.use(express.static('./public'));
app.use(routes);
app.use((req, res) => {
  res.status(404).render('404', { title: '404' });
});
