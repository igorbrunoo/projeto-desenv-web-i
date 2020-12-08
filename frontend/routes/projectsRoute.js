const express = require('express');
const api = require('../services/api.js');

const route = express.Router();

// ROTAS DOS PROJETOS
route.get('/', async (req, res) => {
  const { data } = await api.get('/projects');

  return res.render('pages/projects', { projects: data });
});

// RECEBE OS DADOS DO FORM NO CORPO DA REQUISIÇÃO COM O PROJETO E FAZ REQUISIÇÃO POST COM OS DADOS DO PROJETO PARA O BACKEND
route.post('/', async (req, res) => {
  const newProject = req.body;

  await api.post('/projects', { ...newProject, tasks: [] });

  return res.status(200).end();
});

// RECEBE OS DADOS DO FORM COM O PROJETO ATUALIZADO NO CORPO DA REQUISIÇÃO E FAZ REQUISIÇÃO PUT COM O ID DO PROJETO PARA O BACKEND COM OS DADOS ATUALIZADOS
route.put('/', async (req, res) => {
  const project = req.body;

  await api.put('/projects/' + project.id, project);

  res.status(200).end();
});

// RECEBE O ID DO PROJETO POR PARÂMETRO E FAZ REQUISIÇÃO PARA O BACKEND COM O PROJETO ATUALIZADO
route.put('/:id', async (req, res) => {
  const { id } = req.params;
  const { data: project } = await api.get('/projects/' + id);

  await api.put('/projects/' + id, {
    ...project,
    isCompleted: !project.isCompleted,
  });

  return res.status(200).end();
});

// RECEBE O ID DO PROJETO POR PARÂMETRO E FAZ REQUISIÇÃO DELETE PARA DELETAR O PROJETO DO BANCO
route.delete('/:id', async (req, res) => {
  const { id } = req.params;

  await api.delete('/projects/' + id);

  return res.status(200).end();
});

// RECEBE O ID DO PROJETO CLICADO POR PARÂMETRO, FAZ REQUISIÇÃO PARA O BACKEND RECEBENDO OS DADOS DO PROJETO E RENDERIZA A PÁGINA DO PROJETO
route.get('/:id', async (req, res) => {
  const { id } = req.params;
  const { data } = await api.get('/projects/' + id);

  return res.render('pages/tasks', { project: data });
});

// RECEBE O ID DO PROJETO POR PARÂMETRO E A TAREFA NO CORPO DA REQUISIÇÃO, FAZ REQUISIÇÃO GET PARA RECEBER O PROJETO, ADICIONA A TASK AO PROJETO E MANDA REQUISIÇÃO PARA ATUALIZAR O BANCO
route.post('/:projectId/tasks', async (req, res) => {
  const { projectId } = req.params;
  const task = req.body;

  const { data: project } = await api.get('/projects/' + projectId);

  project.tasks.push(task);

  await api.put('/projects/' + projectId, project);

  return res.status(200).end();
});

module.exports = route;
