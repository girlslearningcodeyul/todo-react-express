import React, { Component } from 'react';
import './App.css';
import TodoList from './Todolist.js'


class App extends Component {
  render() {
    return (
      <div>
        <TodoList which="first"/>
        <TodoList which="second"/>
        <TodoList which="third"/>
      </div>
    )
  }
}

export default App;
