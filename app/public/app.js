const statusEl = document.getElementById('status');
const listEl = document.getElementById('todo-list');
const inputEl = document.getElementById('todo-input');
const formEl = document.getElementById('todo-form');

let todos = [];

async function loadTodos() {
  try {
    statusEl.textContent = 'Loading todos...';

    
    const res = await fetch('/todos');
    const data = await res.json();

    todos = data.map(t => ({ ...t }));
    renderTodos();

    
    statusEl.textContent = 'Loaded ' + todos.length + ' item(s).';
  } catch (err) {
    console.error(err);
    statusEl.textContent = 'Failed to load API.';
  }
}

function renderTodos() {
  listEl.innerHTML = '';

  if (todos.length === 0) {
    const li = document.createElement('li');
    li.className = 'status';
    li.textContent = 'No todos yet. Add one!';
    listEl.appendChild(li);
    return;
  }

  for (const todo of todos) {
    const li = document.createElement('li');
    li.textContent = todo.title;
    if (todo.done) li.classList.add('done');
    listEl.appendChild(li);
  }
}

formEl.addEventListener('submit', async (e) => {
  e.preventDefault();

  const title = inputEl.value.trim();
  if (!title) return;

  const newTodo = { title, done: false };

  try {
    statusEl.textContent = 'Saving...';

    const res = await fetch('/todos', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(newTodo),
    });

    const saved = await res.json();
    todos.push(saved);
    renderTodos();
    statusEl.textContent = 'Saved!';
    inputEl.value = '';
  } catch (err) {
    console.error(err);
    statusEl.textContent = 'Failed to save.';
  }
});

window.addEventListener('load', loadTodos);