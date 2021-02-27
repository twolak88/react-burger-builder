import Logo from '../../Logo/Logo';
import NavigationItems from '../NavigationItems/NavigationItems';
import classes from './SideDrawer.module.css';
import Backdrop from '../../UI/Backdrop/Backdrop';
import Aux from '../../../hoc/Aux/Aux';

const SideDrawer = (props) => {
  let attaachedClasses = [classes.SideDrawer];
  if (props.opened) {
    attaachedClasses.push(classes.Open);
  } else {
    attaachedClasses.push(classes.Close);
  }
  return(
    <Aux>
      <Backdrop 
        show={props.opened} 
        clicked={props.closed}/>
      <div className={attaachedClasses.join(' ')}>
        <div className={classes.Logo}>
          <Logo />
        </div>
        <nav>
          <NavigationItems />
        </nav> 
      </div>
    </Aux>
  );
};

export default SideDrawer;