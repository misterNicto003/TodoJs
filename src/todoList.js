import { Todo } from "./todo.js";

export class TodoList {
  constructor() {
    this.todos = [];
  }

  addTodo(text) {
    const todo = new Todo(text);
    this.todos.push(todo);
  }

  removeTodo(index) {
    this.todos.splice(index, 1);
  }

  toggleTodoCompleted(index) {
    this.todos[index].toggleCompleted();
  }

  toJSON() {
    return this.todos.map((todo) => todo.toJSON());
  }

  static fromJSON(jsonArray) {
    const todoList = new TodoList();
    todoList.todos = jsonArray.map((todoJson) => Todo.fromJSON(todoJson));
    return todoList
  }
}
