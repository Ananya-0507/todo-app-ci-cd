const statusEl = document.getElementById("status");
const listEl = document.getElementById("todo-list");
const formEl = document.getElementById("todo-form");
const inputEl = document.getElementById("todo-input");

let todos = [];

async function loadTodos() {
  try {
    statusEl.textContent = "Loading todos…";
    const res = await fetch('http://localhost:3000/todos'); // calls your backend
    const data = await res.json();

    todos = data.map((t) => ({ ...t }));
    renderTodos();
    statusEl.textContent = Loaded ${todos.length} item(s).;
  } catch (err) {
    console.error(err);
    statusEl.textContent = "Failed to load API.";
  }
}

function renderTodos() {
  listEl.innerHTML = "";

  if (todos.length === 0) {
    const li = document.createElement("li");
    li.className = "status";
    li.textContent = "No todos yet. Add one!";
    listEl.appendChild(li);
    return;
  }

  todos.forEach((todo) => {
    const li = document.createElement("li");
    li.className = "todo-item";

    const main = document.createElement("div");
    main.className = "todo-main";

    const title = document.createElement("span");
    title.className = "todo-title" + (todo.done ? " done" : "");
    title.textContent = todo.title;

    const badge = document.createElement("span");
    badge.className = "todo-badge";
    badge.textContent = todo.done ? "DONE" : "PENDING";

    main.appendChild(title);
    main.appendChild(badge);

    const actions = document.createElement("div");
    actions.className = "todo-actions";

    const completeBtn = document.createElement("button");
    completeBtn.className = "complete";
    completeBtn.textContent = todo.done ? "Undo" : "Done";
    completeBtn.onclick = () => {
      todo.done = !todo.done; // local toggle
      renderTodos();
    };

    const deleteBtn = document.createElement("button");
    deleteBtn.className = "delete";
    deleteBtn.textContent = "Delete";
    deleteBtn.onclick = () => {
      todos = todos.filter((t) => t.id !== todo.id);
      renderTodos();
    };

    actions.appendChild(completeBtn);
    actions.appendChild(deleteBtn);

    li.appendChild(main);
    li.appendChild(actions);
    listEl.appendChild(li);
  });
}

formEl.addEventListener("submit", (e) => {
  e.preventDefault();
  const title = inputEl.value.trim();
  if (!title) return;

  const newTodo = {
    id: Date.now(),
    title,
    done: false,
  };

  todos.push(newTodo);
  inputEl.value = "";
  renderTodos();
  statusEl.textContent = "Added locally (not saved to server)";
});

// On page load
loadTodos();