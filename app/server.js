const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const app = express();
app.use(bodyParser.json());

let todos = [
  { id: 1, title: "Buy milk", done: false }
];

app.get('/todos', (req, res) => res.json(todos));
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});
app.use(express.static(path.join(__dirname, 'public')))
app.listen(3000, () => {
  console.log("Todo app running on port 3000");
});
