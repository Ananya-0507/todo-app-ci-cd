const express = require('express');
const bodyParser = require('body-parser');
const app = express();
app.use(bodyParser.json());

let todos = [
  { id: 1, title: "Buy milk", done: false }
];

app.get('/todos', (req, res) => res.json(todos));
app.use(express.static("public"));

app.listen(3000, () => {
  console.log("Todo app running on port 3000");
});
