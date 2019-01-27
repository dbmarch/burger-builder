import React, { Component } from 'react'
import { connect } from 'react-redux'
import CheckoutSummary from '../../components/Order/CheckoutSummary/CheckoutSummary'
import { Route } from 'react-router-dom'
import ContactData from '../Checkout/ContactData/ContactData'

class Checkout extends Component {
	checkoutCancelledHandler = () => {
		console.log('cancel')
		this.props.history.goBack()
	}

	checkoutContinuedHandler = () => {
		console.log('continue')
		this.props.history.replace('/checkout/contact-data')
	}

	render() {
		return (
			<div>
				<CheckoutSummary
					ingredients={this.props.ingredients}
					checkoutCancelled={this.checkoutCancelledHandler}
					checkoutContinued={this.checkoutContinuedHandler}
				/>
				<Route path={this.props.match.path + '/contact-data'} component={ContactData} />
			</div>
		)
	}
}

const mapStateToProps = state => {
	return {
		ingredients: state.ingredients,
	}
}

export default connect(mapStateToProps)(Checkout)
