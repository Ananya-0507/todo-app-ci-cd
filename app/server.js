const path = require('path');
const bodyParser = require('body-parser');
const express = require('express');

const app = express();
app.use(bodyParser.json());

// In-memory todo list
let todos = [
  { id: 1, title: 'Buy milk', done: false },
];

// GET /todos  -> list all todos
app.get('/todos', (req, res) => {
  res.json(todos);
});

// POST /todos -> add a new todo
app.post('/todos', (req, res) => {
  const title = (req.body && req.body.title || '').trim();

  if (!title) {
    return res.status(400).json({ error: 'Title is required' });
  }

  const newId = todos.length ? todos[todos.length - 1].id + 1 : 1;
  const newTodo = { id: newId, title, done: false };

  todos.push(newTodo);
  res.status(201).json(newTodo);
});

// Serve static frontend
app.use(express.static(path.join(__dirname, 'public')));

// Fallback for root path
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.listen(3000, () => {
  console.log('Todo app running on port 3000');
});
