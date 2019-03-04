import React, { Component} from 'react';
import Button from '../../../components/UI/Button/Button';
import cssClasses from './ContactData.module.css';
import axios from '../../../axios-orders';
import Spinner from '../../../components/UI/Spinner/Spinner';



class ContactData extends Component {

    state = {
        name: '',
        email: '',
        address: {
            street: '',
            postalCode: ''
        },
        loading: false
    }

    orderHandler = async (event) => {
        event.preventDefault();

        this.setState({loading: true});
        const order = {
            ingredients: this.props.ingredients,
            price: this.props.price,
            customer: {
                name: 'Kieron McCarthy',
                address: {
                    street: 'Main Street',
                    zipCode: '123hdhd',
                    country: 'Australia'
                },
                email: 'test@test.com'
            },
            deliveryMethod: 'Air Balloon'
        }
        try {
            const res = await axios.post('/orders.json', order);
            this.setState({loading: false});
            this.props.history.push('/');
            console.log("Response: ", res);
        } catch (error) {
            console.log("Error Caught: ", error);
            this.setState({loading: false});
        }
        
    }

    render() {

        let form = (
            <form>
            <input className={cssClasses.Input} type="text" name="name" placeholder="Your Name" />
            <input className={cssClasses.Input} type="email" name="email" placeholder="Your Email" />
            <input className={cssClasses.Input} type="text" name="street" placeholder="Street" />
            <input className={cssClasses.Input} type="text" name="postal" placeholder="Postal Code" />
            <Button btnType="Success" clicked={this.orderHandler}>ORDER</Button>
        </form>
        );

        if (this.state.loading) {
            form = <Spinner/>
        }
        return (
            <div className={cssClasses.ContactData}>
                <h4>Enter your contact data</h4>
                {form}
            </div>
        );
    };
};

export default ContactData;