// FUNCAO PARA FECHAR O MODAL
const closeModal = () => {
  if (isEditing) {
    isEditing = false;
  }
  modalContainerEl.style.display = 'none';
};

// FUNCAO PARA ABRIR O MODAL
const showModal = () => {
  modalContainerEl.style.display = 'flex';
};

// FUNCAO PARA ADICIONAR O ESTADO DOS INPUTS
const handleInputChange = (e) => {
  state[e.target.name] = e.target.value;
};

// FUNCAO PARA CARREGAR OS ESTADOS DO INPUT AO ABRIR O MODAL EM EDICAO
const loadInputState = () => {
  Object.keys(state).forEach((name) => {
    const input = document.querySelector(`[name=${name}]`);
    if (input) {
      input.value = state[name];
    }
  });
};

// FUNCAO PARA FAZER O SUBMIT DO FORM
const handleFormSubmit = async (e) => {
  e.preventDefault();

  const headers = new Headers({ 'Content-Type': 'application/json' });

  if (isEditing) {
    await fetch(e.target.action, {
      method: 'PUT',
      body: JSON.stringify(state),
      headers,
    });
  } else {
    await fetch(e.target.action, {
      method: e.target.method,
      body: JSON.stringify(state),
      headers,
    });
  }

  state = {};
  closeModal();
  window.location.reload();
};

// ADICIONA A FUNCAO DE SUBMIT NO FORM
const form = document.querySelector('.form');
form.addEventListener('submit', handleFormSubmit);

// FUNCAO PARA LIDAR COM ALTERAÇÕES DE PRIORIDADE DO PROJETO
const onPriorityChange = (el) => {
  el.getAttribute('value')
    ? el.setAttribute('value', '')
    : el.setAttribute('value', 'true');
  el.classList.toggle('selected');
  state[el.getAttribute('name')] = !!el.getAttribute('value');

  document.querySelector('[name="deadline"]').disabled = !state['isUrgent'];
};

// ESTADO DO COMPONENTE
let state = {};
let isEditing = false;

// ADICIONA AOS INPUT A FUNCAO PARA LIDAR COM OS DADOS DOS INPUTS
const inputs = document.querySelectorAll('.input__field');
inputs.forEach((input) => {
  input.addEventListener('change', handleInputChange);
  state[input.name] = '';
});

loadInputState();

const modalContainerEl = document.querySelector('.modal__container');
const modalEl = document.querySelector('.modal');

// FUNCAO PARA FAZER COM QUE O MODAL NAO FECHE AO CLCIAR NO MODAL
modalEl.onclick = (e) => {
  e.stopPropagation();
};

// PARA FAZER COM QUE O MODAL FECHE AO CLICAR FORA DO MODAL
modalEl.parentElement.onclick = closeModal;

// CARREGA PÁGINA DO PROJETO CLICADO
const handleItemClick = async (id) => {
  window.location.href = 'http://localhost:3000/projects/' + id;
};

// FAZ REQUISIÇÃO PARA COMPLETAR O PROJETO
const handleCheckItem = async (id) => {
  await fetch('http://localhost:3000/projects/' + id, {
    method: 'PUT',
  });

  window.location.reload();
};

// FAZ REQUISIÇÃO PARA DELETAR O PROJETO
const handleDeleteItem = async (id) => {
  await fetch('http://localhost:3000/projects/' + id, {
    method: 'DELETE',
  });

  window.location.reload();
};

// ABRE O MODAL NO MODO DE EDICAO
const handleEditItem = (project) => {
  if (project) {
    state = project;
    loadInputState();
    isEditing = true;
  }
  showModal();
};
