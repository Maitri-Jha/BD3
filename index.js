const express = require('express');
const { resolve } = require('path');
let cors = require('cors');

const app = express();
const port = 3010;

app.use(express.static('static'));
app.use(cors());
app.get('/', (req, res) => {
  res.sendFile(resolve(__dirname, 'pages/index.html'));
});

let tasks = [
  { taskId: 1, text: 'Fix bug #101', priority: 2 },
  { taskId: 2, text: 'Implement feature #202', priority: 1 },
  { taskId: 3, text: 'Write documentation', priority: 3 },
];

//end point 1

function addTask(taskId, priority, text) {
  //let n = tasks.length + 1;
  tasks.push({ taskId: taskId, text: text, priority: priority });
  //return tasks;
}

app.get('/tasks/add', (req, res) => {
  let taskId = parseInt(req.query.taskId);
  let priority = parseInt(req.query.priority);
  let text = req.query.text;
  let result = addTask(taskId, priority, text);
  res.json(result);
});

//end point 2

function allTask(tasks) {
  for (let i = 0; i < tasks.length; i++) {
    return tasks;
  }
}

app.get('/tasks', (req, res) => {
  let result = allTask(tasks);

  res.json(result);
});

//endpoint3
function sortAsc(obj1, obj2) {
  return obj1.priority - obj2.priority;
}

app.get('/tasks/sort-by-priority', (req, res) => {
  let result = tasks.sort(sortAsc);
  res.json(result);
});

//endpoint4

function updateArr(tasks, taskId, priority) {
  for (let i = 0; i < tasks.length; i++) {
    if (tasks[i].taskId === taskId) {
      tasks[i].priority = priority;
    }
  }
  return tasks;
}

app.get('/tasks/edit-priority', (req, res) => {
  let taskId = parseInt(req.query.taskId);
  let priority = parseInt(req.query.priority);

  let result = updateArr(tasks, taskId, priority);
  res.json(result);
});

//endpoint5

function updateText(tasks, taskId, text) {
  for (let i = 0; i < tasks.length; i++) {
    if (tasks[i].taskId === taskId) {
      tasks[i].text = text;
    }
  }
  return tasks;
}

app.get('/tasks/edit-text', (req, res) => {
  let taskId = parseInt(req.query.taskId);
  let text = req.query.text;

  let result = updateText(tasks, taskId, text);
  res.json(result);
});

function deleteTask(tasks, taskId) {
  return tasks.taskId != taskId;
}

//endpoint6
app.get('/tasks/delete', (req, res) => {
  let taskId = parseInt(req.query.taskId);

  let result = tasks.filter((tasks) => deleteTask(tasks, taskId));

  res.json(result);
});

//endpoint 7

function updateP(tasks, priority) {
  return tasks.priority === priority;
}

app.get('/tasks/filter-by-priority', (req, res) => {
  let priority = parseInt(req.query.priority);
  let text = req.query.text;

  let result = tasks.filter((tasks) => updateP(tasks, priority));

  res.json(result);
});
app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
