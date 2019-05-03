import { configure, shallow } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
import React from 'react'

import NavigationItems from './NaivigationItems'
import NavigationItem from './NavigationItem/NavigationItem'

// shallow renders a component decoupled from other React application dependencies
// Eg for NavigationItems - NavigationITEM children are only rendered
// as place holders. So restricting the DOM tree.

// Connect Enzyme - a library for instantiating
// individual React components for unit testing
configure({adapter: new Adapter()})

describe('<NavigationItems />', () => {

    let wrapper
    beforeEach(() => {
        wrapper = shallow(<NavigationItems />)
    }) 

    it('should render two <NavigationItem /> elements if NOT authenticated', () => {
        expect(wrapper.find(NavigationItem)).toHaveLength(2)
    })

    it('should render three <NavigationItem /> elements if authenticated', () => {
        wrapper.setProps({isAuthenticated: true})
        expect(wrapper.find(NavigationItem)).toHaveLength(3)
    })

    it('should render a Logout <NavigationItem /> element if authenticated', () => {
        wrapper.setProps({isAuthenticated: true})
        expect(wrapper.contains(<NavigationItem link="/logout">Logout</NavigationItem>)).toEqual(true)
    })
})
