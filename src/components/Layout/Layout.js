import { Component } from 'react';

import Aux from '../../hoc/Aux';
import Toolbar from '../Navigation/Toolbar/Toolbar';
import classes from './Layout.module.css';
import SideDrawer from '../Navigation/SideDrawer/SideDrawer';

class Layout extends Component {
  
  state = {
    showSideDrawer: true
  }

  sideDrawerClosedHandler = () => {
    this.setState({
      showSideDrawer: false
    });
  }

  render() {
    return (
      <Aux>
        <Toolbar />
        <SideDrawer 
          opened={this.state.showSideDrawer}
          closed={this.sideDrawerClosedHandler}/>
        <main className={classes.Content}>
          {this.props.children}
        </main>
      </Aux>
    );
  }
}

export default Layout
