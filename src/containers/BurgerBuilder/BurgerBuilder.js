import React, {Component} from 'react';
import Aux from '../../hoc/Aux2';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';

const INGREDIENT_PRICES = {
    salad: 0.5,
    cheese: 0.4,
    meat: 1.3,
    bacon: 1
}


class BurgerBuilder extends Component {

    state = {
        ingredients: {
            salad: 0,
            bacon: 0,
            cheese: 0,
            meat: 1
        },
        totalPrice: 4

    }

    addIngredientHandler = (type) => {
        const oldCount = this.state.ingredients[type];
        const updatedCount = oldCount + 1;
        const updatedIngredients = {
            ...this.state.ingredients
        };
        updatedIngredients[type] = updatedCount;
        const priceAddition = INGREDIENT_PRICES[type];
        const newPrice = this.state.totalPrice + priceAddition;
        console.log ('add ', type, 'Price ', newPrice);
        this.setState ( {totalPrice: newPrice, ingredients: updatedIngredients});
    }

    removeIngredientHandler = (type) => {
        var priceReduction = 0;
        const oldCount = this.state.ingredients[type];
        var updatedCount = 0;
        if (oldCount) {
            updatedCount = oldCount -1;
            priceReduction = INGREDIENT_PRICES[type];
        }
        const updatedIngredients = {
            ...this.state.ingredients
        };
        updatedIngredients[type] = updatedCount;
        const newPrice = this.state.totalPrice - priceReduction;
        console.log ('add ', type, 'Price ', newPrice);
        this.setState ( {totalPrice: newPrice, ingredients: updatedIngredients});
        
    }

    render () {
        return (
            <Aux>
                <Burger ingredients = {this.state.ingredients }  />
                <BuildControls 
                    ingredientAdded = {this.addIngredientHandler} 
                    ingredientRemoved = {this.removeIngredientHandler} 
                    
                />
            </Aux>
        )
    }
}

export default BurgerBuilder;