import React, { Component } from 'react'
import { connect } from 'react-redux'
import Aux from '../../hoc/Aux2'
import Burger from '../../components/Burger/Burger'
import BuildControls from '../../components/Burger/BuildControls/BuildControls'
import Modal from '../../components/UI/Modal/Modal'
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary'
import axios from '../../axios-orders'
import Spinner from '../../components/UI/Spinner/Spinner'
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler'
import * as actionTypes from '../../store/actions'

class BurgerBuilder extends Component {
	state = {
		purchasing: false,
		loading: false,
		error: false,
	}
	componentDidMount() {
		//        console.log (this.props);
		// axios
		// 	.get('https://react-my-burger-7c36f.firebaseio.com/ingredients.json')
		// 	.then(rsp => {
		// 		console.log(rsp)
		// 		this.setState({ ingredients: rsp.data })
		// 	})
		// 	.catch(error => {
		// 		this.setState({ error: true })
		// 	})
	}

	updatePurchaseState() {
		const sum = Object.keys(this.props.ingredients)
			.map(igKey => {
				return this.props.ingredients[igKey]
			})
			.reduce((sum, el) => sum + el, 0)
		return sum > 0
	}

	purchaseHandler = () => {
		console.log('purchase handler')
		this.setState({ purchasing: true })
	}

	purchaseCancelHandler = () => {
		this.setState({ purchasing: false })
	}

	purchaseContinueHandler = () => {
		this.props.history.push('/checkout')
	}

	render() {
		if (this.props.error === true) {
			return <h1>Ingredients can't be loaded</h1>
		}
		if (this.props.ingredients === null) return <Spinner />

		const disabledInfo = {
			...this.props.ingredients,
		}
		for (let key in disabledInfo) {
			disabledInfo[key] = disabledInfo[key] <= 0
		}

		let orderSummary = (
			<OrderSummary
				ingredients={this.props.ingredients}
				price={this.props.totalPrice}
				purchaseCancelled={this.purchaseCancelHandler}
				purchaseContinued={this.purchaseContinueHandler}
			/>
		)

		if (this.props.loading) {
			orderSummary = <Spinner />
		}
		return (
			<Aux>
				<Modal show={this.state.purchasing} modalClosed={this.purchaseCancelHandler}>
					{orderSummary}
				</Modal>
				<Burger ingredients={this.props.ingredients} />
				<BuildControls
					ingredientAdded={this.props.onIngredientAdded}
					ingredientRemoved={this.props.onIngredientRemoved}
					disabledInfo={disabledInfo}
					purchasable={this.updatePurchaseState()}
					price={this.props.totalPrice}
					orderNow={this.purchaseHandler}
				/>
			</Aux>
		)
	}
}

const mapStateToProps = state => {
	return {
		ingredients: state.ingredients,
		totalPrice: state.totalPrice,
		loading: state.loading,
		error: state.error,
	}
}

const mapDispatchToProps = dispatch => {
	return {
		onIngredientAdded: ingredientName => dispatch({ type: actionTypes.ADD_INGREDIENT, ingredientName }),
		onIngredientRemoved: ingredientName => dispatch({ type: actionTypes.REMOVE_INGREDIENT, ingredientName }),
	}
}

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(withErrorHandler(BurgerBuilder, axios))
