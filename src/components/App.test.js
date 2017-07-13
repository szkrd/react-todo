import React from 'react'
import ReactDOM from 'react-dom'
import { shallow } from 'enzyme';
import App from './App'
import { actions as menuActions } from './Menu'

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

  describe('saveState', () => {
    it('should save the current state into localstorage', () => {
      const app = shallow(<App/>)
      const instance = app.instance()
      const state = { foo: 'bar' }
      instance.state = state
      instance.saveState()

      expect(localStorage.setItem).toHaveBeenCalledWith('react-todo', JSON.stringify(state))
    })
  })

  describe('onAdd', () => {
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

  describe('onFinish', () => {
    it('should mark an item as done', () => {
      const app = shallow(<App/>)
      const instance = app.instance();
      instance.saveState = jest.fn() // jest is already available
      instance.state = {
        addComponentVisible: false,
        todos: [ { text: 'foo', priority: 1, id: 1 } ]
      }
      instance.onFinish(1)

      expect(instance.state).toEqual({
        addComponentVisible: false,
        todos: [
          {
            text: 'foo',
            priority: 1,
            id: 1,
            done: true
          }
        ]
      })
      expect(instance.saveState).toHaveBeenCalled()
    })
  })

  describe('onMenuAction', () => {
    it('should handle actions for the "flush" menu action', () => {
      const app = shallow(<App/>)
      const instance = app.instance();
      instance.flushDoneItems = jest.fn()
      instance.onMenuAction(menuActions.FLUSH)

      expect(instance.flushDoneItems).toHaveBeenCalled()
    })

    it('should show the add component when the "add" action is invoked', () => {
      const app = shallow(<App/>)
      const instance = app.instance();
      instance.onMenuAction(menuActions.ADD)

      expect(instance.state).toEqual({ addComponentVisible: true, todos: [] })
    })
  })

  describe('flushDoneItems', () => {
    it('should delete items marked with the done flag', () => {
      const app = shallow(<App/>)
      const instance = app.instance()
      instance.saveState = jest.fn()
      instance.state = {
        addComponentVisible: false,
        todos: [
          { text: 'foo', priority: 1, id: 1, done: true },
          { text: 'bar', priority: 1, id: 2, done: false }
        ]
      }
      instance.flushDoneItems()

      expect(instance.state).toEqual({
        addComponentVisible: false,
        todos: [
          { text: 'bar', priority: 1, id: 2, done: false }
        ]
      })
      expect(instance.saveState).toHaveBeenCalled()
    })
  })

  describe('render', () => {
    it('should always render a menu component', () => {
      const wrapper = shallow(<App/>)
      const instance = wrapper.instance()
      expect(wrapper.find('Menu')).toHaveLength(1)
      expect(wrapper.find('Menu').node.props.onAction).toBe(instance.onMenuAction)
      expect(wrapper.find('Menu').node.props.showFlushButton).toBe(false);
    })

    it('should let the menu know if the flush button needs to be shown', () => {
      const wrapper = shallow(<App/>)
      const instance = wrapper.instance()
      wrapper.setState({
        todos: [
          { text: 'foo', priority: 1, id: 1, done: true },
          { text: 'bar', priority: 1, id: 2, done: true }
        ]
      })
      expect(wrapper.find('Menu').node.props.showFlushButton).toBe(true);
    })

    it('should always render a header component', () => {
      const wrapper = shallow(<App/>)
      const instance = wrapper.instance()
      expect(wrapper.find('Header')).toHaveLength(1)
      expect(wrapper.find('Header').node.props.itemCount).toEqual(0)
    })

    it('should let the header component know the still active item count', () => {
      const wrapper = shallow(<App/>)
      const instance = wrapper.instance()
      wrapper.setState({
        todos: [
          { text: 'foo', priority: 1, id: 1, done: true }, // active
          { text: 'bar', priority: 1, id: 2, done: false } // inactive
        ]
      })
      expect(wrapper.find('Header').node.props.itemCount).toEqual(1)
    })

    it.skip('should render an add section if needed', () => {
      // TODO
    });

    it.skip('should render multiple todo items', () => {
      // TODO
    });
  })
})

