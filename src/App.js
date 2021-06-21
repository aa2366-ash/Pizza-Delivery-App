import React, { useEffect } from "react";
import LoggedInPage from "./Page/LoggedInPage";
import LoggedOutPage from "./Page/LoggedOutPage";
import { Switch, Route, Redirect } from "react-router-dom";
import Menu from './Components/Menu'
import Login from './Components/Login'
import Register from './Components/Register'
import Cart from "./Components/Cart/Cart";
import MyOrders from './Components/MyOrders'
import TrackOrderPage from './Page/TrackOrderPage'
import { useSelector, useDispatch } from "react-redux";
import { updateMenu } from "./Redux/Menu/menuAction";

function App() {
  const dispatch = useDispatch()
  useEffect(() => {
    fetch('https://pizza-planet-server.herokuapp.com/stock').then(res => res.json()).then(data => {
      dispatch(updateMenu(data))
    })

  }, [])
  const currentUser = useSelector((state) => state.user.currentUser )
  return (
    <Switch>
      <Route exact path="/">
        { currentUser !== null?  <LoggedInPage Component={Menu} />  : <Redirect to="/login"> </Redirect> }
      </Route>
      <Route exact path="/cart">
        { currentUser !== null?  <LoggedInPage Component={Cart} />  : <Redirect to="/login"> </Redirect> }
      </Route>
      <Route exact path="/track">
        { currentUser !== null?  <LoggedInPage Component={TrackOrderPage} />  : <Redirect to="/login"> </Redirect> } 
      </Route>
      <Route exact path="/myorders">
        { currentUser !== null?  <LoggedInPage Component={MyOrders} />  : <Redirect to="/login"> </Redirect> } 
      </Route>
      <Route exact path="/login" >
      { currentUser === null?  <LoggedOutPage LoginOrRegister={Login} />  : <Redirect to="/"> </Redirect> } 
      </Route>
      <Route exact path="/register" >
      { currentUser === null?  <LoggedOutPage LoginOrRegister={Register} />  : <Redirect to="/"> </Redirect> } 
      </Route>
    </Switch>
  );
}

export default App;
