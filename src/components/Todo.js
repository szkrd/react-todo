import React from 'react'
import PropTypes from 'prop-types'

function Todo (props) {
  let {onFinish, item} = props
  let {id, text, priority, done} = item
  return <li>
    [{id}] {text} {priority}
    {done && 'done'}
    <button onClick={() => onFinish(id)}>
      done
    </button>
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
