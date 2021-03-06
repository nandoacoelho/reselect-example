import React from "react";
import { connect } from "react-redux";
import { toggleTodo } from "../actions";
import PropTypes from "prop-types";
import Todo from "../components/Todo";

const TodoList = ({ todos, onTodoClick }) => (
  <ul>
    {todos.map(todo => (
      <Todo key={todo.id} {...todo} onClick={() => onTodoClick(todo.id)} />
    ))}
  </ul>
);

TodoList.propTypes = {
  todos: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      completed: PropTypes.bool.isRequired,
      text: PropTypes.string.isRequired
    }).isRequired
  ).isRequired,
  onTodoClick: PropTypes.func.isRequired
};

const mapStateToProps = state => {
  const getVisibleTodos = (todos, filter) => {
    switch (filter) {
      case "SHOW_COMPLETED":
        return todos.filter(t => t.completed);

      case "SHOW_ACTIVE":
        return todos.filter(t => !t.completed);

      case "SHOW_ALL":
      default:
        return todos;
    }
  };
  return {
    todos: getVisibleTodos(state.todos, state.visibilityFilter)
  };
};

const mapDispatchToProps = dispatch => ({
  onTodoClick: id => dispatch(toggleTodo(id))
});

export default connect(mapStateToProps, mapDispatchToProps)(TodoList);
