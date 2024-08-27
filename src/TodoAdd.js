import "../style.css";

import { TodoList } from "./todoList.js";

export class TodoAdd {
  constructor() {
    this.todoList = TodoList.fromJSON(this.loadTodos());
    this.todoInput = document.getElementById("todo-input");
    this.todoListElement = document.getElementById("todo-list");
    this.todoForm = document.getElementById("todo-form");

    this.todoForm.addEventListener("submit", (e) => this.handleFormSubmit(e));

    this.render;
  }
 
  handleFormSubmit(event) {
    event.preventDefault();
    const text = this.todoInput.value.trim();
    if (text !== "") {
      this.todoList.addTodo(text);
      this.saveAndRender();
    }
    this.todoInput.value = '';
  }
  handleToggle(index) {
    this.todoList.toggleTodoCompleted(index);
    this.saveAndRender();
  }

  handleDelete(index) {
    this.todoList.removeTodo(index);
    this.saveAndRender();
  }

  saveTodos(todos) {
    localStorage.setItem("todos", JSON.stringify(todos));
  }

  loadTodos() {
    const todosJson = localStorage.getItem("todos");
    return todosJson ? JSON.parse(todosJson) : [];
  }

  saveAndRender() {
    this.saveTodos(this.todoList.toJSON());
    this.render();
  }

  render() {
    this.todoListElement.innerHTML = "";
    this.todoList.todos.forEach((todo, index) => {
      const li = document.createElement("li");
      li.textContent = todo.text;
      if (todo.completed) {
        li.classList.add("completed");
      }

      const completeBtn = document.createElement("button");
      completeBtn.textContent = "Complete";
      completeBtn.addEventListener("click", () => this.handleToggle(index));

      const deleteBtn = document.createElement("button");
      deleteBtn.textContent = "Delete";
      deleteBtn.addEventListener("click", () => this.handleDelete(index));

      li.append(completeBtn, deleteBtn);
      this.todoListElement.appendChild(li);
    });
  }
}
