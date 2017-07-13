import React from 'react'
import ReactDOM from 'react-dom'
import { shallow } from 'enzyme'
import Header from './Header'

describe('Header', () => {
  it('should render the header', () => {
    const div = document.createElement('div')
    ReactDOM.render(<Header itemCount={42} />, div)
  })

  it('should show the active todo count', () => {
    const wrapper = shallow(<Header itemCount={42} />)
    expect(wrapper.find('em').text()).toBe('42')
  })
})
