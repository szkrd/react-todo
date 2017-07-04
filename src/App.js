import React, { Component } from 'react'
// import logo from './logo.svg'
import './App.css'
import Add from './Add'
import Todo from './Todo'

const LS_KEY = 'react-todo'

class App extends Component {
  constructor () {
    super()
    this.state = JSON.parse(localStorage.getItem(LS_KEY) || 0) || {todos: []}
    this.lastId = this.state.todos.length
    this.onAdd = this.onAdd.bind(this)
    this.onFinish = this.onFinish.bind(this)
  }

  saveState () {
    localStorage.setItem(LS_KEY, JSON.stringify(this.state))
  }

  onAdd (todo) {
    this.setState(prevState => ({
      todos: [...prevState.todos, {
        ...todo,
        id: ++this.lastId
      }]
    }), this.saveState)
  }

  onFinish (id) {
    this.setState(prevState => ({
      todos: (() =>
        prevState.todos.map(item => item.id === id ? Object.assign(item, {done: true}) : item))()
    }), this.saveState)
  }

  render () {
    const {onAdd, onFinish} = this
    const {todos} = this.state
    return (
      <div>
        <Add onSubmit={onAdd}/>
        <ul>
          { todos.map((item, i) => <Todo item={item} onFinish={onFinish} key={i}/>) }
        </ul>
      </div>
    )
  }
}

export default App
