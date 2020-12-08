const express = require('express');
const api = require('../services/api');

const route = express.Router();

// ROTAS DOS LEMBRETES
route.get('/', async (req, res) => {
  const { data } = await api.get('/reminders');

  return res.render('pages/reminders', { reminders: data });
});

// RECEBE OS DADOS DO LEMBRETE PELO CORPO DA REQUISIÇÃO E FAZ UMA REQUISIÇÃO POST PARA O BACKEND, ADICIONANDO O LEMBRETE AO BANCO
route.post('/', async (req, res) => {
  const newReminder = req.body;

  await api.post('/reminders', newReminder);

  return res.status(200).end();
});

// RECEBE O ID DO LEMBRETE COMO PARÂMETRO, FAZ REQUISIÇÃO GET PARA RECEBER O LEMBRETE DO BACKEND E ATUALIZA O isCompleted DO LEMBRETE ATRAVÉS DO PUT
route.put('/:id', async (req, res) => {
  const { id } = req.params;

  const { data: reminder } = await api.get('/reminders/' + id);

  await api.put('/reminders/' + id, {
    ...reminder,
    isCompleted: !reminder.isCompleted,
  });

  return res.status(200).end();
});

// RECEBE O ID DO LEMBRETE COMO PARÂMETRO E FAZ REQUISIÇÃO DELETE PARA O BACKEND DELETAR O LEMBRETE
route.delete('/:id', async (req, res) => {
  const { id } = req.params;

  await api.delete('/reminders/' + id);

  return res.status(200).end();
});

module.exports = route;
