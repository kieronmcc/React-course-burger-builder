import { configure, shallow } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
import React from 'react'

// Import just the component class like this
// strips out the connection to the Redux Store
// so that we unit test just the component in isolation
import { BurgerBuilder } from './BurgerBuilder'

import BuildControls from '../../components/Burger/BuildControls/BuildControls'

// Connect Enzyme - a library for instantiating
// idividual React components for unit testing
configure({adapter: new Adapter()})

describe('<BurgerBuilder />', () => {

    let wrapper
    beforeEach(() => {
        wrapper = shallow(<BurgerBuilder onInitIngredients={() => {}}/>)
    })    

    it('should render BuildControls when receiving ingredients', () => {
        wrapper.setProps({ingredients: {salad: 0}})
        expect(wrapper.find(BuildControls)).toHaveLength(1)
    })
    it('should NOT render BuildControls when receiving NO ingredients', () => {
        expect(wrapper.find(BuildControls)).toHaveLength(0)
    })
})