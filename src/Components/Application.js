import React, { useContext } from "react";
import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";
import SignIn from "./SignIn";
import SignUp from "./SignUp";
import ProfilePage from "./ProfilePage";
import Posts from "./Posts";
import PostItem from "./PostItem";
import PasswordReset from "./PasswordReset";
import { UserContext } from "../providers/UserProvider";

function Application() {
  const user = useContext(UserContext);
  return (
    <>
      <BrowserRouter>
        <Switch>
          {user && <Route path="/profilePage" component={ProfilePage} />}
          {user && <Route path="/postItem" component={PostItem} />}
          {!user && <Route path="/signUp" component={SignUp} />}
          {!user && <Route path="/signin" component={SignIn} />}
          {!user && <Route path="/passwordReset" component={PasswordReset} />}
          {user && <Route path="/posts" component={Posts} />}
          <Route exact path="/">
            {user ? <Redirect to="/posts" /> : <Posts />}
          </Route>
          {!user && <Route path="/posts" component={Posts} />}
        </Switch>
      </BrowserRouter>
    </>
  );
}
export default Application;
