import React, { Component} from 'react';
import { connect } from 'react-redux';
import Button from '../../../components/UI/Button/Button';
import cssClasses from './ContactData.module.css';
import axios from '../../../axios-orders';
import Spinner from '../../../components/UI/Spinner/Spinner';
import Input from '../../../components/UI/Forms/Input/Input';



class ContactData extends Component {

    state = {
        orderForm: {
            name: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Your Name'
                },
                value: '',
                validation: {
                    required: true
                },
                valid: false,
                touched: false
            },
            street: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Street'
                },
                value: '',
                validation: {
                    required: true
                },
                valid: false,
                touched: false
            },
            zipCode: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Zip Code'
                },
                value: '',
                validation: {
                    required: true,
                    minLength: 3,
                    maxLength: 7
                },
                valid: false,
                touched: false
            },
            country: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Country'
                },
                value: '',
                validation: {
                    required: true
                },
                valid: false,
                touched: false
            },
            email: {
                elementType: 'input',
                elementConfig: {
                    type: 'email',
                    placeholder: 'Your Email'
                },
                value: '',
                validation: {
                    required: true
                },
                valid: false,
                touched: false
            },
            deliveryMethod: {
                elementType: 'select',
                elementConfig: {
                    options: [
                        {value: 'fastest', displayValue: 'Fastest'},
                        {value: 'cheapest', displayValue: 'Cheapest'}
                    ]
                },
                value: 'fastest',
                validation: {},
                valid: true
            }
        },
        loading: false,
        formIsValid: false

    }

    orderHandler = async (event) => {
        event.preventDefault();
        const formData ={};
        for (let formElementId in this.state.orderForm) {
            formData[formElementId] = this.state.orderForm[formElementId].value;
        }
        this.setState({loading: true});
        const order = {
            ingredients: this.props.ingredients,
            price: this.props.price,
            orderData: formData
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

    inputChangedHandler = (event, inputIdentifier) => {
        const updatedOrderForm = {
            ...this.state.orderForm // Only creates a shallow copy. Contained objects will be refs
        };
        // to get a deepER copy...to get just the value as a copy
        const updatedFormElement = {
            ...updatedOrderForm[inputIdentifier]
        };
        // SO now using the copies (since we should never update state directly)
        updatedFormElement.value = event.target.value;
        updatedFormElement.valid = this.checkValidity(updatedFormElement.value, updatedFormElement.validation);
        updatedFormElement.touched = true;
        updatedOrderForm[inputIdentifier] = updatedFormElement;

        let formIsValid = true;
        for (let inputIdentifier in updatedOrderForm ) {
                formIsValid = updatedOrderForm[inputIdentifier].valid && formIsValid;
        }
        this.setState({formIsValid: formIsValid});

        this.setState({orderForm: updatedOrderForm});
        //console.log('Id:',inputIdentifier,'validity: ',updatedOrderForm[inputIdentifier].valid, 'Value: ', updatedOrderForm[inputIdentifier].value);
    }

    // Alternate way to write this using setState() functional form 
    // inputChangedHandler = (event, inputIdentifier) => {
    //     const {value} = event.target; // Object destructuring
    //    // console.log('inputchangeHandler: ', value, this.checkValidity(value,this.state.orderForm[inputIdentifier].validation));
    //     this.setState( (prevState) => (
    //         {
    //             orderForm: {
    //                 ...prevState.orderForm,
    //                 [inputIdentifier]: {
    //                     ...prevState.orderForm[inputIdentifier],
    //                     value, // i.e. value: value
    //                     valid: this.checkValidity(value, prevState.orderForm[inputIdentifier].validation),
    //                     touched: true
    //                 },
    //             }
    //         })
    //     );
    // 
    //     let formIsValid = true;
    //     for (let inputIdentifier in this.state.orderForm ) {
    //         console.log(inputIdentifier,this.state.orderForm[inputIdentifier].valid);
    //         formIsValid = this.state.orderForm[inputIdentifier].valid && formIsValid;
    //     }
    //     this.setState({formIsValid: formIsValid});
    //     console.log('inputChangeHandler.formIsValid: ', this.state.formIsValid);
    // }

    checkValidity(value, rules) {
        let isValid = true;
        if (rules.required) {
            isValid = value.trim() !== '';
        }
        if (rules.minLength) {
            isValid = value.length >= rules.minLength && isValid;
        } 
        if (rules.maxLength) {
            isValid = value.length <= rules.maxLength && isValid;
        }

        return isValid;
    }

    render() {
        const formElementsArray =[];
        for (let key in this.state.orderForm) {
            formElementsArray.push({
                id: key,
                body: this.state.orderForm[key]
            });
        }

        let form = (
            <form onSubmit={this.orderHandler}>
            {formElementsArray.map(formElement => (
                <Input 
                    key={formElement.id}
                    valueType={formElement.id}
                    elementType={formElement.body.elementType}
                    elementConfig={formElement.body.elementConfig}
                    value={formElement.body.value}
                    isvalid={!formElement.body.valid}
                    shouldValidate={formElement.body.validation}
                    touched={formElement.body.touched}
                    changed={(event) => this.inputChangedHandler(event, formElement.id)}
                    />    
            ))}
            <Button btnType="Success" disabled={!this.state.formIsValid}>ORDER</Button>
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

const mapStateToProps = state => {
    return {
        ingredients: state.ingredients,
        price: state.totalPrice
    }
}

export default connect(mapStateToProps)(ContactData);