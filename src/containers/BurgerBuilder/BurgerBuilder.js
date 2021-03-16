import { Component } from 'react';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Burger from '../../components/Burger/Burger';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';
import Modal from '../../components/UI/Modal/Modal';
import Aux from '../../hoc/Aux/Aux';
import axios from '../../axios-orders';
import Spinner from '../../components/UI/Spinner/Spinner';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';
import { connect } from 'react-redux';
import * as actionTypes from '../../store/actions';

const INGREDIENT_PRICES = {
  salad: 0.5,
  cheese: 0.4,
  meat: 1.3,
  bacon: 0.7
}

class BurgerBuilder extends Component {

  state = {
    totalPrice: 4,
    purchasable: false,
    purchasing: false,
    loading: false,
    error: false
  }

  componentDidMount() {
    // axios.get('/ingredients.json')
    //   .then(resp => {
    //     this.setState({
    //       ingredients: resp.data
    //     })
    //   })
    //   .catch(error => {
    //     this.setState({
    //       error: error
    //     });
    //   });
  }

  updatePurchaseState(ingredients) {
    const sum = Object.keys(ingredients)
      .map(igKey => {
        return ingredients[igKey];
      })
      .reduce((sum, el) => {
        return sum + el;
      }, 0);
    this.setState({
      purchasable: sum > 0
    });
  }

  // addIngredientHandler = (type) => {
  //   const oldCount = this.state.ingredients[type];
  //   const updatedCount = oldCount + 1;
  //   const updatedIngredients = {
  //     ...this.state.ingredients
  //   };
  //   updatedIngredients[type] = updatedCount;
  //   const updatedPrice = this.state.totalPrice + INGREDIENT_PRICES[type];
  //   this.setState({
  //     ingredients: updatedIngredients,
  //     totalPrice: updatedPrice
  //   });
  //   this.updatePurchaseState(updatedIngredients);
  // }

  // removeIngredientHandler = (type) => {
  //   const oldCount = this.state.ingredients[type];
  //   if (oldCount <= 0) {
  //     return;
  //   }
  //   const updatedCount = oldCount - 1;
  //   const updatedIngredients = {
  //     ...this.state.ingredients
  //   };
  //   updatedIngredients[type] = updatedCount;
  //   const updatedPrice = this.state.totalPrice - INGREDIENT_PRICES[type];
  //   this.setState({
  //     ingredients: updatedIngredients,
  //     totalPrice: updatedPrice
  //   });
  //   this.updatePurchaseState(updatedIngredients);
  // }

  purchaseHandler = () => {
    this.setState({purchasing: true});
  }

  purchaseCancelHandler = () => {
    this.setState({purchasing: false});
  }

  purchaseContinueHandler = () => {
    const queryParams = [];
    for (let i in this.props.ingredients){
      queryParams.push(encodeURIComponent(i) + '=' 
        + encodeURIComponent(this.props.ingredients[i]));
    }
    queryParams.push('price=' + this.state.totalPrice);
    const queryString = queryParams.join('&')
    this.props.history.push({
      pathname: '/checkout',
      search: '?' + queryString
    });
  }

  errorConfirmedHandler = () => {
    // this.setState({
    //   error: null
    // });
  }

  render() {
    const disabledInfo = {
      ...this.props.ingredients
    };
    for (let key in disabledInfo) {
      disabledInfo[key] = disabledInfo[key] <= 0;
    }
    
    let orderSummary = null;
    let burgerControl = this.state.error ? <Modal 
            show={this.state.error}
            modalClosed={this.errorConfirmedHandler}>
            <p>Critical server error!</p>
            {this.state.error.message}
          </Modal> : <Spinner />;
    if (this.props.ingredients) {
      orderSummary = <Spinner />;
      if (!this.state.loading) {
        orderSummary = <OrderSummary 
          ingredients={this.props.ingredients}
          price={this.state.totalPrice}
          purchaseCancelled={this.purchaseCancelHandler}
          purchaseContinued={this.purchaseContinueHandler} />;
      }

      burgerControl = (
        <Aux>
          <Burger ingredients={this.props.ingredients}/>
          <BuildControls 
            ingredientAdded={this.props.onIngredientAdded}
            ingredientRemoved={this.props.onIngredientRemoved}
            disabled={disabledInfo}
            price={this.state.totalPrice}
            purchasable={this.state.purchasable}
            ordered={this.purchaseHandler}/>
        </Aux>
      );
    }
    return (
      <Aux>
        <Modal 
          show={this.state.purchasing}
          modalClosed={this.purchaseCancelHandler}>
          {orderSummary}
        </Modal>
        {burgerControl}
      </Aux>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    ingredients: state.ingredients
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onIngredientAdded: (ingredientName) => dispatch({
      type: actionTypes.ADD_INGREDIENT,
      ingredientName: ingredientName
    }),
    onIngredientRemoved: (ingredientName) => dispatch({
      type: actionTypes.REMOVE_INGREDIENT,
      ingredientName: ingredientName
    })
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(BurgerBuilder, axios));
