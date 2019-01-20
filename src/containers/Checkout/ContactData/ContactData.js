import React, { Component } from 'react';
import Button from '../../../components/UI/Button/Button';
import Spinner from '../../../components/UI/Spinner/Spinner';
import classes from './ContactData.css';
import axios from '../../../axios-orders';

class ContactData extends Component {
	state = {
		name: '',
		email: '',
		address: {
			street: '',
			postalCode: '',
		},
		loading: false,
	};

	orderHandler = e => {
		e.preventDefault();
		console.log(this.props.ingredients);
		const order = {
			ingredients: this.props.ingredients,
			price: this.props.price,
			customer: {
				name: 'Dave',
				address: {
					street: '333 SomeWhere Rd',
					zipCode: '60342',
					country: 'USA',
				},
				email: 'dbmarch@gmail.com',
			},
			deliveryMethod: 'fastest',
		};

		this.setState({ loading: true });

		axios
			.post('/orders.json', order)
			.then(response => {
				this.setState({ loading: false });
				this.props.history.push('/');
			})
			.catch(error => {
				this.setState({ loading: false });
			});
	};

	render() {
		let form = (
			<div className={classes.ContactData}>
				<h4> Enter your contact data</h4>
				<form>
					<input className={classes.Input} type="text" name="name" placeholder="Your name" />
					<input className={classes.Input} type="email" name="email" placeholder="Your email" />
					<input className={classes.Input} type="text" name="street" placeholder="Your address" />
					<input className={classes.Input} type="text" name="postal" placeholder="Your Zipcode" />
					<Button btnType="Success" clicked={this.orderHandler}>
						{' '}
						ORDER{' '}
					</Button>
				</form>
			</div>
		);
		if (this.state.loading) {
			form = <Spinner />;
		}
		return form;
	}
}

export default ContactData;
