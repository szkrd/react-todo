import React, { Component } from 'react'
import PropTypes from 'prop-types'
import './Add.css'

const priorities = ['urgent', 'normal', 'not important']

class Add extends Component {
  static propTypes = {
    onSubmit: PropTypes.func.isRequired
  }

  constructor () {
    super()
    this.state = this.getDefaultState()
    this.onChange = this.onChange.bind(this)
    this.onSubmit = this.onSubmit.bind(this)
  }

  getDefaultState () {
    return {
      text: '',
      priority: 1
    }
  }

  onChange (e) {
    let {name, value} = e.target
    let type = e.target.getAttribute('typeof') || 'string' // RDFa
    if (type === 'number') {
      value = ~~value;
    }
    this.setState({
      [name]: value
    })
  }

  onSubmit (e) {
    e.preventDefault()
    let { state } = this;
    this.props.onSubmit(Object.assign({...state}, {
      text: state.text.trim()
    }))
    this.setState(this.getDefaultState())
  }

  render () {
    let {onSubmit, onChange} = this
    let {text, priority} = this.state

    return (
      <div className="Add">
        <form onSubmit={onSubmit}>
          <input type="text" value={text} name="text" typeof="string" onChange={onChange}/>
          <select name="priority" value={priority} typeof="number" onChange={onChange}>
            {priorities.map((name, i) => <option value={i} key={i}>{name}</option>)}
          </select>
          <button>+</button>
        </form>
      </div>
    )
  }
}

export default Add
