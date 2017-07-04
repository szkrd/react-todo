import React, { Component } from 'react'
import PropTypes from 'prop-types'

const priorities = ['high', 'normal', 'low']

class Add extends Component {
  static propTypes = {
    onSubmit: PropTypes.func.isRequired
  }

  constructor () {
    super()
    this.state = {
      text: '',
      priority: 1
    }
    this.onChange = this.onChange.bind(this)
    this.onSubmit = this.onSubmit.bind(this)
  }

  onChange (e) {
    let {name, value} = e.target
    let type = e.target.getAttribute('typeof') || 'string' // RDFa
    value = {
      string: () => value.trim(),
      number: () => ~~value
    }[type]()
    this.setState({
      [name]: value
    })
  }

  onSubmit (e) {
    e.preventDefault()
    this.props.onSubmit(this.state)
  }

  render () {
    let {onSubmit, onChange} = this
    let {text, priority} = this.state

    return (
      <div>
        <form onSubmit={onSubmit}>
          <input type="text" value={text} name="text" typeof="string" onChange={onChange}/>
          <label>
            Priority:
            <select name="priority" value={priority} typeof="number" onChange={onChange}>
              {priorities.map((name, i) => <option value={i} key={i}>{name}</option>)}
            </select>
          </label>
          <button>Add</button>
        </form>
      </div>
    )
  }
}

export default Add
