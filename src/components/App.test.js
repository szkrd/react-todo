import React from 'react'
import ReactDOM from 'react-dom'
import { shallow } from 'enzyme';
import App from './App'

describe('App', () => {
  beforeEach(() => {
    global.localStorage = {
      getItem: jest.fn(), // sinon not really needed, jest has a builtin mock
      setItem: jest.fn()
    }
  })

  afterEach(() => {
    delete global.localStorage
  })

  it('renders without crashing', () => {
    const div = document.createElement('div')
    ReactDOM.render(<App />, div)
  })

  describe.only('onAdd', () => {
    it('should add a todo item', () => {
      const app = shallow(<App/>)
      const instance = app.instance();
      instance.saveState = jest.fn() // jest is already available
      instance.onAdd({
        text: 'foo',
        priority: 1
      })
      expect(instance.state).toEqual({
        addComponentVisible: false,
        todos: [ { text: 'foo', priority: 1, id: 1 } ]
      })
      expect(instance.saveState).toHaveBeenCalled()
    })
  })
})

