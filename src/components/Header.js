import React from 'react'
import PropTypes from 'prop-types'
import './Header.css'

function Header (props) {
  let {itemCount} = props
  return <div className='Header'>
    <h1 className='Header-title'>
      Todo list
    </h1>
    <h2 className='Header-count'>
      active tasks:
      <em>
        {itemCount}
      </em>
    </h2>
  </div>
}

Header.propTypes = {
  itemCount: PropTypes.number
}

export default Header
