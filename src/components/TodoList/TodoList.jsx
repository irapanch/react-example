import { StyledButton } from "../Counter/Counter.styled";
import { StyledInput, StyledTodo, StyledTodoList } from "./TodoList.styled";
import todosData from "./../../assets/todos.json";
import { Flex } from "../../styles/GlobalStyles";
import React from "react";

export class TodoList extends React.Component {
  state = {
    todos: todosData,
    currentText: "",
  };

  inputRef = React.createRef(null); //шлях до компонента

  componentDidMount() {
    const items = JSON.parse(window.localStorage.getItem("Todos"));
    if (items.length) {
      this.setState({ todos: items });
    }
    this.inputRef.current.focus(); // фокус на компонент
  }
  componentDidUpdate(_, prevState) {
    const { todos } = this.state;
    if (prevState.todos.length !== todos.length) {
      window.localStorage.setItem("Todos", JSON.stringify(todos));
    }
  }

  handleDelete = (id) => {
    // const newTodos = this.state.todos.filter((item) => item.id !== id);
    // this.setState((prev) => ({ todos: newTodos }));
    this.setState((prev) => ({
      todos: prev.todos.filter((item) => item.id !== id),
    }));
  };

  handleAdd = () => {
    const item = {
      id: crypto.randomUUID(),
      todo: this.state.currentText,
      completed: false,
    };
    this.setState((prev) => ({
      todos: [...prev.todos, item],
      currentText: "",
    }));
  };
  handleChangeInput = (e) => {
    this.setState({ currentText: e.target.value });
  };

  handleToggleTodo = (id) => {
    this.setState((prev) => ({
      todos: prev.todos.map((item) =>
        item.id === id ? { ...item, completed: !item.completed } : item
      ),
    }));
  };
  handleClearTodo = () => {
    this.setState({ todos: [] });
  };
  handleClearComplitedTodos = () => {
    this.setState((prev) => ({
      todos: prev.todos.filter((item) => !item.completed),
    }));
  };
  render() {
    const { todos, currentText } = this.state;
    return (
      <>
        <StyledTodoList>
          <Flex $height="auto">
            <StyledInput
              ref={this.inputRef} // передача  на імпут рефа для встановлення фокуса
              type="text"
              value={currentText}
              onChange={this.handleChangeInput}
            />
            <StyledButton onClick={this.handleAdd}>Add</StyledButton>
          </Flex>
          {todos.map((item) => (
            <StyledTodo key={item.id}>
              <input
                type="checkbox"
                checked={item.completed}
                onChange={() => this.handleToggleTodo(item.id)}
              />
              <span>{item.todo}</span>
              <StyledButton
                onClick={() => this.handleDelete(item.id)}
                size="18px"
              >
                Delete
              </StyledButton>
            </StyledTodo>
          ))}
          <StyledButton $border={4} onClick={this.handleClearComplitedTodos}>
            Clear selected todos
          </StyledButton>
          <StyledButton $border={4} onClick={this.handleClearTodo}>
            Clear all todos
          </StyledButton>
        </StyledTodoList>
      </>
    );
  }
}
