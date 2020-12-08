const express = require('express');
const bodyParser = require('body-parser');
const expressLayouts = require('express-ejs-layouts');
const path = require('path');
const api = require('./services/api');

const remindersRoute = require('./routes/remindersRoute');
const projectsRoute = require('./routes/projectsRoute');

const app = express();

// PORTA USADA PARA ACESSAR O FRONTEND
const PORT = 3000;

// MIDDLEWARES PARA FAZER O PARSE DO BODY DAS REQUISIÇÕES JSON E URLENCODED
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// DEFINE A PASTA COM CONTEÚDO ESTÁTICO, A TEMPLATE ENGINE E O LAYOUT DA APLICAÇÃO
app.use(express.static(path.join(__dirname, '/public')));
app.set('view engine', 'ejs');
app.use(expressLayouts);

app.get('/', (req, res) => {
  return res.render('pages/home');
});

// MIDDLEWARE COM ROTAS PARA OS LEMBRETES
app.use('/reminders', remindersRoute);

// MIDDLEWARE COM ROTAS PARA OS PROJETOS
app.use('/projects', projectsRoute);

app.listen(PORT, () => {
  console.log(`Ouvindo em http://localhost:${PORT}`);
});
