import React from 'react';
import './App.css';
import HomePage from "./screens/homePage"
import ProductScreen from "./screens/productScreen"
import CartScreen from "./screens/cartScreen"
import {BrowserRouter,Route, Link} from 'react-router-dom'
import SigninScreen from './screens/SigninScreen';
import { useSelector } from 'react-redux'
import RegisterScreen from './screens/RegisterScreen';
function App() {
    const userSignin = useSelector(state => state.userSignin)
    const userInfo = userSignin['userInfo']

    return (
    <BrowserRouter>
    <div className="grid-container div-wrapper" id="div-current-1">
      <div className="header_0 div-wrapper div-has-content" id="div-current-2">
          <div id="title" className = "div-wrapper">
            <Link to="/">Welcome to DragonShop</Link>
          </div>
      </div>
      <div id="picture" className = "div-wrapper-image">
                <Link to="/">
                   
                
          <img id="dragon-picture" src="/images/shopping-bag.png" alt="decorate-pic"/>
          </Link>
      </div>
      <header className="header">
          <div id="catergory" className="menu-items">
                <Link to="/">
                    Homepage
                </Link>
          </div>
          <div id="promotion" className="menu-items">
              <a href="">Promotion</a>
          </div>
          <div id="rewards" className="menu-items">
              <a href="">Rewards</a>
          </div>
          <div id="about" className="menu-items">
              <a href="">About us</a>
          </div>
      </header>
      <div className="utility">
          <div id="signin" className="utility-items">
            <Link to={userInfo? "/profile" : "/signin"}>{userInfo?userInfo.name:"Sign-in"}</Link>
          </div>
          <div id="search" className="utility-items">
              <a href="">Search</a>
          </div>
          <div id="cart" className="utility-items">
                <Link to="/cart">
                    Cart
                </Link>
          </div>
      </div>
      <main className="main">
          <div className="content">
            <Route path="/cart/:id?" component={CartScreen}/>
            <Route path="/product/:id" component={ProductScreen}/>
            <Route path="/" exact={true} component={HomePage}/>
            <Route path="/signin" component={SigninScreen}/>
            <Route path="/register" component={RegisterScreen}/>
          </div>
      </main>
      <footer className="footer">
      </footer>
    </div>
    </BrowserRouter>
  );
}

export default App;
