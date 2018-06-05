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
        totalPrice: 4, 
        purchaseable: true

    }

    updatePurchaseState (ingredients) {

        const sum = Object.keys(ingredients)
        .map(igKey => {
            return ingredients[igKey];
        })
        .reduce((sum,el) => (sum + el), 0);
        this.setState ({purchasable: sum > 0});
        console.log ('purchasable:' , sum );
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
        this.updatePurchaseState(updatedIngredients);
    }

    removeIngredientHandler = (type) => {
        const oldCount = this.state.ingredients[type];
        if (oldCount <= 0) {
            return;
        }
        if (type === 'meat' && oldCount<= 1)
            return;
        var updatedCount = oldCount -1;
        const priceReduction = INGREDIENT_PRICES[type];
        const updatedIngredients = {
            ...this.state.ingredients
        };
        updatedIngredients[type] = updatedCount;
        const newPrice = this.state.totalPrice - priceReduction;
        console.log ('add ', type, 'Price ', newPrice);
        this.setState ( {totalPrice: newPrice, ingredients: updatedIngredients});
        this.updatePurchaseState(updatedIngredients);
    }

    render () {
        const disabledInfo = {
            ...this.state.ingredients
        };
        for (let key in disabledInfo) {
            disabledInfo[key]  = disabledInfo[key] <= (key === "meat" ? 1 : 0);
        }
        
        console.log (disabledInfo);
        console.log ('purchasable ', this.state.purchasable);
        return (
            <Aux>
                <Burger ingredients = {this.state.ingredients }  />
                <BuildControls 
                    ingredientAdded = {this.addIngredientHandler} 
                    ingredientRemoved = {this.removeIngredientHandler} 
                    disabledInfo = {disabledInfo}
                    purchasable = {this.state.purchaseable}
                    price = {this.state.totalPrice}
                />
            </Aux>
        )
    }
}

export default BurgerBuilder;