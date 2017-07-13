import React, { Component } from 'react'
// import logo from './logo.svg'
import './App.css'
import Add from './Add'
import Todo from './Todo'
import Header from './Header'
import Menu, { actions as menuActions } from './Menu'

const LS_KEY = 'react-todo'

// I don't want to eject for decorator support (https://github.com/facebookincubator/create-react-app/issues/107)
class App extends Component {
  constructor () {
    super()
    this.state = JSON.parse(localStorage.getItem(LS_KEY) || 0) || {
      addComponentVisible: false,
      todos: []
    }
    this.lastId = this.state.todos.length

    // or: mixins, decorators, whatnot
    this.onAdd = this.onAdd.bind(this)
    this.onFinish = this.onFinish.bind(this)
    this.onMenuAction = this.onMenuAction.bind(this)
  }

  saveState () {
    localStorage.setItem(LS_KEY, JSON.stringify(this.state))
  }

  onAdd (todo) {
    this.setState(prevState => ({
      todos: [{
        ...todo,
        id: ++this.lastId
      }, ...prevState.todos],
      addComponentVisible: false
    }), this.saveState)
  }

  onFinish (id) {
    this.setState(prevState => ({
      todos: (() =>
        prevState.todos.map(item => item.id === id ? Object.assign(item, {done: true}) : item))()
    }), this.saveState)
  }

  // oh boy, do I need an event bus... or shall we store the ui state in redux?
  onMenuAction (action) {
    if (action === menuActions.FLUSH) {
      this.flushDoneItems()
    }

    if (action === menuActions.ADD) {
      this.setState(prevState => ({
        addComponentVisible: !prevState.addComponentVisible
      }), this.saveState)
    }
  }

  flushDoneItems () {
    this.setState(prevState => ({
      todos: (() => prevState.todos.filter(item => !item.done))()
    }), this.saveState)
  }

  render () {
    const {onAdd, onFinish, onMenuAction} = this
    const {todos, addComponentVisible} = this.state
    const activeItemCount = todos.filter(item => !item.done).length

    let sortedTodos = todos.concat().sort((a, b) => {
      let pA = a.done ? 99 : a.priority
      let pB = b.done ? 99 : b.priority
      return pA === pB ? 0 : (pA > pB ? 1 : -1)
    })

    let doneCount = todos.filter(item => item.done).length

    return (
      <div className='App'>
        <Header itemCount={activeItemCount} />
        <div className='App-content'>
          <Menu onAction={onMenuAction} showFlushButton={doneCount > 0} />
          {addComponentVisible && <Add onSubmit={onAdd} />}
          <ul className='App-todos'>
            { sortedTodos.map(item => <Todo item={item} onFinish={onFinish} key={item.id} />) }
          </ul>
        </div>
      </div>
    )
  }
}

export default App
