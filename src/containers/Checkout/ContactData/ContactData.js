import React, { Component } from 'react'
import Button from '../../../components/UI/Button/Button'
import Spinner from '../../../components/UI/Spinner/Spinner'
import classes from './ContactData.css'
import axios from '../../../axios-orders'
import Input from '../../../components/UI/Input/Input'

class ContactData extends Component {
	state = {
		orderForm: {
			name: {
				elementType: 'input',
				elementConfig: {
					type: 'text',
					placeholder: 'Your Name',
				},
				value: '',
				validation: {
					required: true,
				},
				valid: false,
				touched: false,
			},
			street: {
				elementType: 'input',
				elementConfig: {
					type: 'text',
					placeholder: 'Street',
				},
				value: '',
				validation: {
					required: true,
				},
				valid: false,
				touched: false,
			},
			zipCode: {
				elementType: 'input',
				elementConfig: {
					type: 'text',
					placeholder: 'ZIP',
				},
				value: '',
				validation: {
					required: true,
					minLength: 5,
					maxLength: 5,
				},
				valid: false,
				touched: false,
			},
			country: {
				elementType: 'input',
				elementConfig: {
					type: 'text',
					placeholder: 'Country',
				},
				value: '',
				validation: {
					required: true,
				},
				valid: false,
				touched: false,
			},
			email: {
				elementType: 'input',
				elementConfig: {
					type: 'email',
					placeholder: 'Your E-Mail',
				},
				value: '',
				validation: {
					required: true,
				},
				valid: false,
				touched: false,
			},
			deliveryMethod: {
				elementType: 'select',
				elementConfig: {
					options: [
						{ value: 'fastest', displayValue: 'Fastest' },
						{ value: 'cheapest', displayValue: 'Least Expensive' },
					],
				},
				valid: true,
				validation: {},
				value: 'fastest',
			},
		},
		formIsValid: false,
		loading: false,
	}

	orderHandler = e => {
		console.log('orderHandler')
		e.preventDefault()
		console.log(this.props.ingredients)
		const formData = {}
		for (let formElementIdentifier in this.state.orderForm) {
			formData[formElementIdentifier] = this.state.orderForm[formElementIdentifier].value
		}

		const order = {
			ingredients: this.props.ingredients,
			price: this.props.price,
			orderData: formData,
		}

		this.setState({ loading: true })

		axios
			.post('/orders.json', order)
			.then(response => {
				this.setState({ loading: false })
				this.props.history.push('/')
			})
			.catch(error => {
				this.setState({ loading: false })
			})
	}

	checkValidity = (value, rules) => {
		let isValid = true
		if (rules === undefined) return isValid
		if (rules.required) {
			isValid = value.trim() !== '' && isValid
		}
		if (rules.minLength) {
			isValid = value.length >= rules.minLength && isValid
		}
		if (rules.maxLength) {
			isValid = value.length <= rules.maxLength && isValid
		}
		return isValid
	}

	inputChangedHandler = (event, id) => {
		console.log(event.target.value, id)
		const updatedOrderForm = {
			...this.state.orderForm,
		}
		const updatedFormElement = {
			...updatedOrderForm[id],
		}

		updatedFormElement.value = event.target.value
		updatedFormElement.valid = this.checkValidity(updatedFormElement.value, updatedFormElement.validation)
		updatedFormElement.touched = true
		updatedOrderForm[id] = updatedFormElement

		let formIsValid = true
		for (let inputIdentifier in updatedOrderForm) {
			formIsValid = updatedOrderForm[inputIdentifier].valid && formIsValid
		}

		console.log('New Form: ', JSON.stringify(updatedFormElement, null, 2))
		this.setState({ orderForm: updatedOrderForm, formIsValid: formIsValid })
	}

	render() {
		const formElementsArray = []
		for (let key in this.state.orderForm) {
			formElementsArray.push({
				id: key,
				config: this.state.orderForm[key],
			})
		}
		let form = (
			<div className={classes.ContactData}>
				<h4> Enter your contact data</h4>
				<form
					onSubmit={e => {
						this.orderHandler(e)
					}}
				>
					{formElementsArray.map(formElement => (
						<Input
							key={formElement.id}
							elementType={formElement.config.elementType}
							elementConfig={formElement.config.elementConfig}
							value={formElement.value}
							invalid={!formElement.config.valid}
							shouldValidate={formElement.config.validation}
							touched={formElement.config.touched}
							changed={event => this.inputChangedHandler(event, formElement.id)}
						/>
					))}
					<Button btnType="Success" disabled={!this.state.formIsValid}>
						{' '}
						ORDER{' '}
					</Button>
				</form>
			</div>
		)
		if (this.state.loading) {
			form = <Spinner />
		}
		return form
	}
}

export default ContactData