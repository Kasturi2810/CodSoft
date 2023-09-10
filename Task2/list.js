const taskInput = document.getElementById("input");
const addButton = document.getElementById("addBtn");
const taskList = document.getElementById("taskList");

const tasks = JSON.parse(localStorage.getItem("tasks")) || [];

function updateLocalStorage() {
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

function renderTasks() {
  taskList.innerHTML = "";
  tasks.forEach((task, index) => {
    const li = document.createElement("li");
    li.innerHTML = `
      ${task}
      <button onclick="editTask(${index})">Edit</button>
      <button onclick="deleteTask(${index})">Delete</button>
    `;
    taskList.appendChild(li);
  });
  updateLocalStorage();
}

function addTask() {
  const newTask = taskInput.value.trim();
  if (newTask !== "") {
    tasks.push(newTask);
    taskInput.value = "";
    renderTasks();
  }
}

function editTask(index) {
  const updatedTask = prompt("Edit task:", tasks[index]);
  if (updatedTask !== null) {
    tasks[index] = updatedTask.trim();
    renderTasks();
  }
}

function deleteTask(index) {
  if (confirm("Are you sure you want to delete this task?")) {
    tasks.splice(index, 1);
    renderTasks();
  }
}

addButton.addEventListener("click", addTask);
renderTasks();