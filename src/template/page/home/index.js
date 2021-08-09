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
            <h1>Welocme to System Parkir Berbasis Web</h1>
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
