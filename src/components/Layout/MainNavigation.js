import { useContext } from 'react';
import { Link } from 'react-router-dom';
import AuthContext from '../../store/auth-context';

import classes from './MainNavigation.module.css';

const MainNavigation = () => {
  const authctx = useContext(AuthContext);

  const isLoggedIn = authctx.isLoggedIn;
  const logoutHandler = ()=>{
    authctx.logout();
  }
  return (
    <header className={classes.header}>
      <Link to='/'>
        <div className={classes.logo}>Post Management</div>
      </Link>
      <nav>
        <ul>
          {!isLoggedIn && (
            <li>
            <Link to='/auth'>Sign In / Sign Up</Link>
          </li>
          )}
          {isLoggedIn && (
            <li>
            <Link to='/profile'>Profile</Link>
          </li>
          )}
          {isLoggedIn && (
            <li>
            <Link to='/add-post'>Add Post</Link>
          </li>
          )}
          {isLoggedIn && (
            <li>
            <button onClick={logoutHandler}>Logout</button>
          </li>
          )}
          
          
        </ul>
      </nav>
    </header>
  );
};

export default MainNavigation;
