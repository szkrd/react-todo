import React from 'react'
import PropTypes from 'prop-types'
import './Menu.css'

export const actions = {
  FLUSH: 'flush',
  ADD: 'add'
}

function Menu (props) {
  let {onAction, showFlushButton} = props

  return <ul className='Menu'>
    { showFlushButton &&
      <li className='Menu-item'>
        <button onClick={() => onAction(actions.FLUSH)} className='Menu-button Menu-button--flush'>
          flush done
        </button>
      </li>
    }
    <li className='Menu-item'>
      <button onClick={() => onAction(actions.ADD)} className='Menu-button Menu-button--add'>
        add new
      </button>
    </li>
  </ul>
}

Menu.propTypes = {
  onAction: PropTypes.func,
  showFlushButton: PropTypes.bool
}

export default Menu
