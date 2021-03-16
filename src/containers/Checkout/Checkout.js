import { Component } from 'react';
import { connect } from 'react-redux';
import { Route } from 'react-router';
import CheckoutSummary from '../../components/Order/CheckoutSummary/CheckoutSummary';
import ContactData from './ContactData/ContactData';

class Checkout extends Component {

  checkoutCancelledHandler = () => {
    this.props.history.goBack();
  }

  checkoutContinueHandler = () => {
    this.props.history.replace('checkout/contact-data');
  }

  render() {
    return(
      <div>
        <CheckoutSummary 
          ingredients={this.props.ingredients}
          checkoutCancelled={this.checkoutCancelledHandler}
          checkoutContinued={this.checkoutContinueHandler}/>
        <Route 
          path={this.props.match.path + '/contact-data'} 
          component={ContactData} />
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    ingredients: state.ingredients
  };
};

export default connect(mapStateToProps)(Checkout);