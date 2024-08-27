
export class Todo {
  constructor(text, completed = false) {
    this.text = text;
    this.completed = completed;
  }

  toggleCompleted() {
    this.completed = !this.completed;
  }

  toJSON() {
    return {
      text: this.text,
      completed: this.completed,
    };
  }

  static fromJSON(json) {
    return new Todo(json.text, json.completed);
  }
}
