// Seleciona elementos
const todoForm = document.getElementById('todo-form');
const todoInput = document.getElementById('todo-input');
const todoList = document.getElementById('todo-list');
const clearCompletedBtn = document.getElementById('clear-completed');

let tasks = [];

// Função para salvar no localStorage
function saveTasks() {
  localStorage.setItem('tasks', JSON.stringify(tasks));
}

// Função para carregar do localStorage
function loadTasks() {
  const savedTasks = localStorage.getItem('tasks');
  if (savedTasks) {
    tasks = JSON.parse(savedTasks);
  }
}

// Função para renderizar tarefas na lista
function renderTasks() {
  todoList.innerHTML = '';

  tasks.forEach((task, index) => {
    const li = document.createElement('li');
    li.className = task.completed ? 'completed' : '';

    // Texto da tarefa clicável para marcar/desmarcar concluída
    const span = document.createElement('span');
    span.textContent = task.text;
    span.className = 'todo-text';
    span.addEventListener('click', () => toggleCompleted(index));
    li.appendChild(span);

    // Botão para remover tarefa
    const removeBtn = document.createElement('button');
    removeBtn.textContent = '×';
    removeBtn.className = 'remove-btn';
    removeBtn.title = 'Remover tarefa';
    removeBtn.addEventListener('click', () => removeTask(index));
    li.appendChild(removeBtn);

    todoList.appendChild(li);
  });

  toggleClearCompletedBtn();
}

// Adicionar tarefa
function addTask(text) {
  if (!text.trim()) {
    alert('Por favor, insira uma tarefa válida!');
    return;
  }
  // Evita duplicados
  const duplicate = tasks.some(task => task.text.toLowerCase() === text.toLowerCase());
  if (duplicate) {
    alert('Esta tarefa já existe!');
    return;
  }
  tasks.push({ text: text.trim(), completed: false });
  saveTasks();
  renderTasks();
  todoInput.value = '';
  todoInput.focus();
}

// Alternar tarefa concluída
function toggleCompleted(index) {
  tasks[index].completed = !tasks[index].completed;
  saveTasks();
  renderTasks();
}

// Remover tarefa com confirmação
function removeTask(index) {
  if (confirm('Deseja remover esta tarefa?')) {
    tasks.splice(index, 1);
    saveTasks();
    renderTasks();
  }
}

// Limpar todas tarefas concluídas
function clearCompletedTasks() {
  tasks = tasks.filter(task => !task.completed);
  saveTasks();
  renderTasks();
}

// Mostrar ou esconder botão limpar concluídas
function toggleClearCompletedBtn() {
  const anyCompleted = tasks.some(task => task.completed);
  clearCompletedBtn.classList.toggle('hidden', !anyCompleted);
}

// Eventos

todoForm.addEventListener('submit', e => {
  e.preventDefault();
  addTask(todoInput.value);
});

clearCompletedBtn.addEventListener('click', clearCompletedTasks);

// Inicializa app
function init() {
  loadTasks();
  renderTasks();
  todoInput.focus();
}

window.onload = init;
