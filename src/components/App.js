import React, { Component } from 'react'
import connect from 'react-redux-classconnect'
import PropTypes from 'prop-types'
import { bindActionCreators } from 'redux'
import * as TodosActions from '../actions/todos'
import Add from './Add'
import Todo from './Todo'
import Header from './Header'
import Menu, { actions as menuActions } from './Menu'
import './App.css'

const LS_KEY = 'react-todo'

// I don't want to eject for decorator support (https://github.com/facebookincubator/create-react-app/issues/107)
class App extends Component {
  // redux connectors {{{
  static propTypes = {
    todos: PropTypes.array.isRequired,
    actions: PropTypes.object.isRequired
  };

  static stateProps = (state)=>({
    todos: state.todos
  })

  static dispatchProps = (dispatch)=>({
    actions: bindActionCreators(TodosActions, dispatch)
  })
  // }}}

  constructor () {
    super()
    this.state = JSON.parse(localStorage.getItem(LS_KEY) || 0) || {
      addComponentVisible: false // TODO move to ui store?
    }

    this.onAdd = this.onAdd.bind(this)
    this.onFinish = this.onFinish.bind(this)
    this.onMenuAction = this.onMenuAction.bind(this)
  }

  saveState () {
    localStorage.setItem(LS_KEY, JSON.stringify(this.state))
  }

  onAdd (item) {
    this.props.actions.add(item.text, item.priority)
  }

  onFinish (id) {
    this.props.actions.finish(id)
  }

  // oh boy, do I need an event bus... or shall we store the ui state in redux?
  onMenuAction (action) {
    if (action === menuActions.FLUSH) {
      this.props.actions.flushFinished()
    }

    if (action === menuActions.ADD) {
      this.setState(prevState => ({
        addComponentVisible: !prevState.addComponentVisible
      }), this.saveState)
    }
  }

  render () {
    const {onAdd, onFinish, onMenuAction} = this
    const {addComponentVisible} = this.state
    const {todos} = this.props
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
            { sortedTodos.map((item, i) => <Todo item={item} onFinish={onFinish} key={i} />) }
          </ul>
        </div>
      </div>
    )
  }
}

export default connect(App)
