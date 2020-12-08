// ESTADO DO INPUT DOS LEMBRETES
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

// ADICIONA A FUNCAO DE SUBMIT NO FORM
const form = document.querySelector('.form');
form.addEventListener('submit', handleFormSubmit);

// FUNCAO PARA ADICIONAR O ESTADO DO INPUT
const handleInputChange = (e) => {
  state[e.target.name] = e.target.value;
};

// ADICIONA AOS INPUT A FUNCAO PARA LIDAR COM OS DADOS DO INPUT
const inputs = document.querySelectorAll('.input__field');
inputs.forEach((input) => {
  input.addEventListener('change', handleInputChange);
  state[input.name] = '';
});

// FUNCAO PARA FAZER REQUISIÇÃO PARA COMPLETAR O ITEM
const handleCheckItem = async (id) => {
  await fetch('http://localhost:3000/reminders/' + id, {
    method: 'PUT',
  });

  window.location.reload();
};

// FUNCAO PARA FAZER REQUISIÇÃO PARA DELETAR O ITEM
const handleDeleteItem = async (id) => {
  await fetch('http://localhost:3000/reminders/' + id, {
    method: 'DELETE',
  });

  window.location.reload();
};
