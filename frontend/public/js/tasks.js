// ESTADO DO INPUT DAS TAREFAS
let state = {};

// FUNCAO PARA LIDAR COM O SUBMIT DO FORM
const handleFormSubmit = async (e) => {
  e.preventDefault();

  const headers = new Headers({ 'Content-Type': 'application/json' });

  await fetch(e.target.action, {
    method: e.target.method,
    body: JSON.stringify(state),
    headers,
  });

  state = {};
  window.location.reload();
};

// ADICIONA A FUNCAO DE SUBMIT AO FORM
const form = document.querySelector('.form');
form.addEventListener('submit', handleFormSubmit);

// FUNCAO PARA ADICIONAR O ESTADO DO INPUT
const handleInputChange = (e) => {
  state[e.target.name] = e.target.value;
};

// ADICIONA AOS INPUTS A FUNCAO PARA LIDAR COM INPUTS
const inputs = document.querySelectorAll('.input__field');
inputs.forEach((input) => {
  input.addEventListener('change', handleInputChange);
  state[input.name] = '';
});
