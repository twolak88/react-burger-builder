import classes from './Order.module.css';

const Order = (props) => (
  <div className={classes.Order}>
    <p>Ingredients: </p>
    <p>Price: <strong></strong></p>
  </div>
);

export default Order;