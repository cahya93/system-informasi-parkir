import React, { Component } from "react";
import { BrowserRouter as Router } from "react-router-dom";
import { connect } from "react-redux";
import "./App.css";
// import UserService from "./service/users/user";
// import ProductService from "./service/product/product";
import { Navbar, Body, Footer } from "./template";
class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loginStatus: false,
    };
  }

  changeStatus = (status, page) => {
    this.setState({
      currentPage: page,
      loginStatus: status,
    });
  };
  render() {
    return (
      <>
        <Router>
          <Navbar
            loginStatus={this.state.loginStatus}
            changeStatus={this.changeStatus}
          />
          <Body
            changeStatus={this.changeStatus}
            loginStatus={this.state.loginStatus}
          />
          <Footer />
        </Router>
      </>
    );
  }
}
const mapDispatchToProps = (dispatch) => ({
  registrasi: (newUser) =>
    dispatch({ type: "registrasi", payload: { newUser } }),
  product: (product) => dispatch({ type: "product", payload: { product } }),
});
export default connect(null, mapDispatchToProps)(App);
// export default App;
