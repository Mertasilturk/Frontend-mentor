const todoInput = document.querySelector(".todo-input");
const todoList = document.querySelector(".todo-list-select");
const todoCount = document.querySelector(".items-count");
const clearTodo = document.querySelector(".todo-tools-clear");
const allTodoBtn = document.querySelector(".todo-tools-all");
const completeTodoBtn = document.querySelector(".todo-tools-completed");
const activeTodoBtn = document.querySelector(".todo-tools-active");
const themeChange = document.querySelector(".toggle-mode");
const themeIcon = document.querySelector(".toggle-img");
const todoSection = document.querySelector(".todo-section");
const TODO_DATA_KEY = "todos";
let itemsCount;

// Todo Theme

function theme() {
  if (themeIcon.src.includes("icon-sun.svg")) {
    themeIcon.src = "./images/icon-moon.svg";
    document.body.dataset.theme = "Light";
  } else {
    themeIcon.src = "./images/icon-sun.svg";
    document.body.dataset.theme = "Dark";
  }
}

themeChange.addEventListener("click", theme);

// Todo Add

function addTodo(e) {
  const newListItem = document.createElement("li");
  newListItem.classList.add("todo-list-add");
  newListItem.innerHTML = `
  <button class="todo-circle">
  <img src="./images/icon-check.svg" alt="check image" class="icon-check hidden" /></button>
  <p class="todo-list-text">${e.target.value}</p>
  <button class="btn-delete"><img src="./images/icon-cross.svg" alt="delete cross"/></button>
`;
  todoList.appendChild(newListItem);
  e.target.value = "";
  todoCounter(1);
  saveToLocalStorage();
  if (themeIcon.src.includes("icon-moon.svg")) {
    newListItem.classList.add("light");
  }
}

// Todo updates [All - Active - Complete - Clear - Delete]

function allTodoShow() {
  const allTodo = document.querySelectorAll(".todo-list-add");
  allTodo.forEach((e) => e.classList.remove("hidden"));
  todoCount.innerHTML = allTodo.length;
}

function active() {
  const allTodo = document.querySelectorAll(".todo-list-text");
  let activeCount = 0;
  allTodo.forEach(function (e) {
    e.parentElement.classList.remove("hidden");
    if (e.classList.contains("active")) {
      e.parentElement.classList.add("hidden");
    } else {
      todoList.appendChild(e.parentElement);
      activeCount++;
    }
    todoCount.innerHTML = activeCount;
    saveToLocalStorage();
  });
}

function completedTodo() {
  const allTodo = document.querySelectorAll(".todo-list-text");
  let activeCount = 0;
  allTodo.forEach(function (e) {
    e.parentElement.classList.remove("hidden");
    if (e.classList.contains("active")) {
      todoList.appendChild(e.parentElement);
      activeCount++;
    } else {
      e.parentElement.classList.add("hidden");
    }
    todoCount.innerHTML = activeCount;
    saveToLocalStorage();
  });
}

function clearAllTodo() {
  const allTodo = document.querySelectorAll(".active");
  allTodo.forEach((e) => e.closest("li").remove());
  const remainingTodo = document.querySelectorAll(".todo-list-add");
  todoCount.innerHTML = remainingTodo.length;
  saveToLocalStorage();
}

function deleteTodo(e) {
  const btnDelete = e.target.closest(".btn-delete");
  if (btnDelete) {
    btnDelete.closest("li").remove();
    todoCounter(-1);
    saveToLocalStorage();
  }
}
// Todo Check icon and Line through

function updateTodo(e) {
  const todoCircle = e.target.closest(".todo-circle");
  if (todoCircle) {
    const checkImage = todoCircle.querySelector(".icon-check");
    const listItem = e.target.closest("li");
    const todoText = listItem.querySelector(".todo-list-text");
    todoText.classList.toggle("active");
    checkImage.classList.toggle("hidden");
    saveToLocalStorage();
  }
}

// Todo Counter

function todoCounter(value) {
  itemsCount = +todoCount.innerHTML + value;
  todoCount.innerHTML = itemsCount;
}

// Todo Local Storage
function saveToLocalStorage() {
  const allTodo = document.querySelectorAll(".todo-list-add");
  const todoData = Array.from(allTodo).map((item) => {
    const text = item.querySelector(".todo-list-text").textContent;
    const active = item
      .querySelector(".icon-check")
      .classList.contains("hidden")
      ? false
      : true;
    return { text, active, itemsCount };
  });
  localStorage.setItem(TODO_DATA_KEY, JSON.stringify(todoData));
}

function loadLocalStorage() {
  const todoItems = localStorage.getItem(TODO_DATA_KEY);
  if (todoItems) {
    const parsedData = JSON.parse(todoItems);
    parsedData.forEach((item) => {
      const newListItem = document.createElement("li");
      newListItem.classList.add("todo-list-add");
      newListItem.innerHTML = `
        <button class="todo-circle">
          <img src="./images/icon-check.svg" alt="check image" class="icon-check ${
            item.active ? "" : "hidden"
          }" />
        </button>
        <p class="todo-list-text ${item.active ? "active" : ""}">${
        item.text
      }</p>
        <button class="btn-delete"><img src="./images/icon-cross.svg" alt="delete cross"/></button>
      `;
      todoList.appendChild(newListItem);
      todoCount.innerHTML = item.itemsCount;
    });
  }
}

todoInput.addEventListener("keydown", function (e) {
  if (e.key === "Enter" && e.target.value !== "") {
    addTodo(e);
  }
});
window.addEventListener("load", loadLocalStorage);
todoList.addEventListener("click", updateTodo);
todoList.addEventListener("click", deleteTodo);
clearTodo.addEventListener("click", clearAllTodo);
allTodoBtn.addEventListener("click", allTodoShow);
completeTodoBtn.addEventListener("click", completedTodo);
activeTodoBtn.addEventListener("click", active);
