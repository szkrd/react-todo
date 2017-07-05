import React from 'react'
import PropTypes from 'prop-types'

function Header (props) {
  let {itemCount} = props
  return <div>
    todo count:
    {itemCount}
  </div>
}

Header.propTypes = {
  itemCount: PropTypes.number
}

export default Header
