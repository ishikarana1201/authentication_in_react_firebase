import { useContext } from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';

import Layout from './components/Layout/Layout';
import AuthorForm from './components/Profile/AuthorForm';

import UserProfile from './components/Profile/UserProfile';
import DisplayPost from './components/StartingPage/DisplayPost';
import DisplaySinglePost from './components/StartingPage/DisplaySinglePost';
import AddPostPage from './pages/AddPostPage';
import AuthPage from './pages/AuthPage';
import HomePage from './pages/HomePage';
import AuthContext from './store/auth-context';

function App() {
  const authctx = useContext(AuthContext);
  return (
    <>
    <Layout>
      <Switch>
        <Route path='/' exact>
          <HomePage />
        </Route>
        <Route path='/post' exact>
          <DisplaySinglePost/>
        </Route>
        <Route path='/post/:id' exact>
          <DisplayPost/>
        </Route>
        {!authctx.isLoggedIn && (

        <Route path='/auth'>
          <AuthPage />
        </Route>
        )}
        <Route path='/profile'>
          {authctx.isLoggedIn && <UserProfile />}
          {!authctx.isLoggedIn && <Redirect to="/auth" />}
          
        </Route>
        {/* Add Post Route */}
        <Route path='/add-post'>
          {authctx.isLoggedIn && <AddPostPage/>}
          {!authctx.isLoggedIn && <Redirect to="/auth" />}
        </Route>
        {/* Add author profile route */}
        <Route path='/author-detail'>
          {authctx.isLoggedIn && <AuthorForm/>}
          {!authctx.isLoggedIn && <Redirect to="/auth" />}
        </Route>
        
        <Route path="*">
          <Redirect to="/"/>
        </Route>
      </Switch>
    </Layout>
   
    </>
  );
}

export default App;
