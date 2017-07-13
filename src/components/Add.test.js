import React from 'react'
import ReactDOM from 'react-dom'
import { shallow } from 'enzyme'
import Add from './Add'

describe('Add', () => {
  it('should render without crashing', () => {
    const div = document.createElement('div')
    ReactDOM.render(<Add onSubmit={() => {}} />, div)
  })

  describe('render', () => {
    it('should render a form for adding new todo items', () => {
      const wrapper = shallow(<Add onSubmit={() => {}} />)
      wrapper.setState({
        text: 'return parrot',
        priority: 0
      })

      expect(wrapper.find('[data-test="text"]').node.props.value).toBe('return parrot')
      expect(wrapper.find('[data-test="priority"]').node.props.value).toBe(0)
    })

    // it('should store the desired todo\'s text value', () => {
    //   doing input changes with enzyme is still a major pain in the back,
    //   so instead of injecting keypresses via the fake dom subsystem (jsdom, that is),
    //   I'm going to skip this and just walk away (https://github.com/airbnb/enzyme/issues/76)
    // })

    it('should handle todo text changes', () => {
      const wrapper = shallow(<Add onSubmit={() => {}} />)
      const instance = wrapper.instance()
      expect(wrapper.find('[data-test="text"]').node.props.onChange).toBe(instance.onChange)
    })

    it('should handle todo priority changes', () => {
      const wrapper = shallow(<Add onSubmit={() => {}} />)
      const instance = wrapper.instance()
      expect(wrapper.find('[data-test="priority"]').node.props.onChange).toBe(instance.onChange)
    })

    it('should handle form submission', () => {
      const wrapper = shallow(<Add onSubmit={() => {}} />)
      const instance = wrapper.instance()
      expect(wrapper.find('form').node.props.onSubmit).toBe(instance.onSubmit)
    })
  })

  describe('onChange', () => {
    it('should handle input changes (input type text and select)', () => {
      const wrapper = shallow(<Add onSubmit={() => {}} />)
      const instance = wrapper.instance()
      instance.onChange({ target: {
        name: 'text',
        value: 'buy spam',
        getAttribute: () => 'string' // such mock, very unsinon
      } })
      expect(instance.state).toEqual({ text: 'buy spam', priority: 1 })

      instance.onChange({ target: {
        name: 'priority',
        value: 2,
        getAttribute: () => 'number'
      } })
      expect(instance.state).toEqual({ text: 'buy spam', priority: 2 })
    })
  })

  describe('onSubmit', () => {
    it('should submit the new todo upstream (with text trimmed)', () => {
      const cb = jest.fn()
      const wrapper = shallow(<Add onSubmit={cb} />)
      wrapper.setState({
        text: ' much space, very trim ',
        priority: 0
      })
      const instance = wrapper.instance()

      instance.onSubmit({ preventDefault: () => {} })
      expect(cb).toHaveBeenCalledWith({
        text: 'much space, very trim',
        priority: 0
      })
    })

    it('should reset the component\'s internal state after submission', () => {
      const wrapper = shallow(<Add onSubmit={() => {}} />)
      const instance = wrapper.instance()
      instance.onSubmit({ preventDefault: () => {} })
      expect(instance.state).toEqual({ text: '', priority: 1 })
    })
  })
})
