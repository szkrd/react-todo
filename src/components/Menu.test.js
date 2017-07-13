import React from 'react'
import ReactDOM from 'react-dom'
import { shallow } from 'enzyme'
import Menu, { actions } from './Menu'

describe('Menu', () => {
  it('should render the menu', () => {
    const div = document.createElement('div')
    ReactDOM.render(<Menu onAction={() => {}} showFlushButton={false} />, div)
  })

  it('should show the flush button if needed', () => {
    const wrapper = shallow(<Menu onAction={() => {}} showFlushButton={false} />)
    expect(wrapper.find('.Menu-button--flush')).toHaveLength(0)
    wrapper.setProps({ showFlushButton: true })
    expect(wrapper.find('.Menu-button--flush')).toHaveLength(1)
  })

  it('should always show the add button', () => {
    const wrapper = shallow(<Menu onAction={() => {}} showFlushButton={false} />)
    expect(wrapper.find('.Menu-button--add')).toHaveLength(1)
  })

  it('should handle clicks for the flush button', () => {
    const cb = jest.fn()
    const wrapper = shallow(<Menu onAction={cb} showFlushButton />)
    wrapper.find('.Menu-button--flush').simulate('click')
    expect(cb).toHaveBeenCalledWith(actions.FLUSH)
  })

  it('should handle clicks for the add button', () => {
    const cb = jest.fn()
    const wrapper = shallow(<Menu onAction={cb} showFlushButton />)
    wrapper.find('.Menu-button--add').simulate('click')
    expect(cb).toHaveBeenCalledWith(actions.ADD)
  })
})
