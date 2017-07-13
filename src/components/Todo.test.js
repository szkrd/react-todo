import React from 'react'
import ReactDOM from 'react-dom'
import { shallow } from 'enzyme'
import Todo from './Todo'

describe('Todo', () => {
  let anItem

  beforeEach(() => {
    anItem = {
      id: 1,
      text: 'buy milk',
      priority: 1,
      done: false
    }
  })

  it('should render the item', () => {
    const div = document.createElement('div')
    ReactDOM.render(<Todo onFinish={() => {}} item={anItem} />, div)
  })

  it('should signal the parent if an item has been clicked', () => {
    const cb = jest.fn()
    const wrapper = shallow(<Todo onFinish={cb} item={anItem} />)
    wrapper.find('li').simulate('click')
    expect(cb).toHaveBeenCalledWith(1)
  })

  it('should visually mark a finished item (with an utf checkbox sign)', () => {
    const wrapper = shallow(<Todo onFinish={() => {}} item={anItem} />)
    expect(wrapper.find('.Todo-checkbox').text()).toBe('☐')
    wrapper.setProps({ item: Object.assign({}, anItem, { done: true }) })
    expect(wrapper.find('.Todo-checkbox').text()).toBe('☑')
  })

  it('should visually mark items by their priority and whether they are finished or not', () => {
    const wrapper = shallow(<Todo onFinish={() => {}} item={anItem} />)
    const getRootClassName = () => wrapper.find('li').node.props.className + ''

    expect(getRootClassName()).toBe('Todo Todo-priority-normal')

    wrapper.setProps({ item: Object.assign({}, anItem, { done: true }) })
    expect(getRootClassName()).toBe('Todo Todo-done Todo-priority-normal')

    wrapper.setProps({ item: Object.assign({}, anItem, { done: false, priority: 0 }) })
    expect(getRootClassName()).toBe('Todo Todo-priority-high')

    wrapper.setProps({ item: Object.assign({}, anItem, { done: false, priority: 2 }) })
    expect(getRootClassName()).toBe('Todo Todo-priority-low')
  })
})
