import React, { Component } from "react";
import { connect } from "react-redux";
import Container from "@material-ui/core/Container";

import "./home.css";

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    return (
      <>
        <Container>
          <div>
            <div className="welcome">Welcome to System Parkir Berbasis Web</div>
            <div>By Cahya93</div>
          </div>
          <div>
            <p>System ini dibangun menggunakan:</p>
            <ul>
              <li>React Js</li>
              <li>Firebase</li>
            </ul>
          </div>
        </Container>
      </>
    );
  }
}
const mapStateToProps = (state) => ({
  product: state.Product,
});
const mapDispatchToProps = (dispatch) => ({
  buttonBuy: () => dispatch({ type: "btn-buy" }),
  listPenjualan: (newPenjualan) =>
    dispatch({ type: "buy-item", payload: { newPenjualan } }),
});
export default connect(mapStateToProps, mapDispatchToProps)(Home);
// export default Home;
