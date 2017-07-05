import React from 'react'
import PropTypes from 'prop-types'
import className from 'class-name'
import './Todo.css'

function Todo (props) {
  let {onFinish, item} = props
  let {id, text, priority, done} = item

  let itemClassName = className({
    Todo: true,
    'Todo-done': done,
    'Todo-priority': ['high', 'normal', 'low'][priority]
  })

  return <li className={itemClassName} onClick={() => onFinish(id)}>
    <span className='Todo-checkbox'>{ done ? '☑' : '☐' }</span>
    {text}
  </li>
}

Todo.propTypes = {
  onFinish: PropTypes.func,
  item: PropTypes.shape({
    id: PropTypes.number,
    text: PropTypes.string,
    priority: PropTypes.number,
    done: PropTypes.bool
  })
}

export default Todo
