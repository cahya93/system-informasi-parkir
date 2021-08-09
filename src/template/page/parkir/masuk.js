import React, { Component } from "react";
import Container from "@material-ui/core/Container";
import Swal from "sweetalert2";
import { FirebaseContext } from "../../../config/firebase";
import {
  Button,
  FormControl,
  FormGroup,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from "@material-ui/core";

class MasukFirebase extends Component {
  constructor(props) {
    super(props);
    this.state = {
      license: "",
      type: "Car",
      vehicles: [],
    };
    this.subscribeVehicles = "";
  }
  onSaveHandler = async () => {
    const { license, type } = this.state;
    const res = await this.props.firebase.saveFirestoreVehicle({
      license,
      type,
      dateIn: new Date().getTime(),
    });

    if (res.id) return Swal.fire("Okay", "Data is saved!", "success");

    return Swal.fire("Ops!!", "Data can't save!", "error");
  };
  setValue = (e) => this.setState({ [e.target.name]: e.target.value });

  subscribeData = () => {
    this.subscribeVehicles = this.props.firebase.getUpdateFirestoreVehicle(
      (vehicles) => {
        console.log(vehicles.docChanges());

        let vehicleList = this.state.vehicles;
        vehicles.docChanges().forEach((change) => {
          const idData = change.doc.id;
          const objData = change.doc.data();
          if (change.type === "added") {
            vehicleList.push({
              id: idData,
              price: 2000,
              ...objData,
            });
          }
          if (change.type === "modified") {
            vehicleList = vehicleList.map((vehicle) => {
              if (vehicle.id === idData)
                return {
                  ...vehicle,
                  ...objData,
                };
              return vehicle;
            });
          }
          if (change.type === "removed") {
            vehicleList = vehicleList.filter(
              (vehicle) => vehicle.id !== idData
            );
          }
        });
        this.setState({
          vehicles: vehicleList,
        });
      }
    );
  };
  componentWillUnmount() {
    this.subscribeVehicles();
  }

  componentDidMount() {
    this.subscribeData();
  }
  render() {
    const { license, type } = this.state;
    return (
      <>
        <Container>
          <div>
            <h1>Parkir Masuk</h1>
            <FormGroup>
              <FormControl>
                <TextField
                  name="license"
                  label="No. Polisi"
                  autoComplete="No. Polisi"
                  value={license}
                  onChange={this.setValue}
                />
              </FormControl>{" "}
            </FormGroup>
            <br></br>
            <FormGroup>
              <FormControl variant="outlined">
                <InputLabel id="type">Type</InputLabel>
                <Select
                  name="type"
                  labelId="type"
                  label="Type"
                  value={type}
                  onChange={this.setValue}
                >
                  <MenuItem value={"Motor"}>Motor</MenuItem>
                  <MenuItem value={"Mobil"}>Mobil</MenuItem>
                </Select>
              </FormControl>
            </FormGroup>
            <br></br>
            <Button
              variant="contained"
              color="primary"
              onClick={this.onSaveHandler}
            >
              SAVE
            </Button>
          </div>
        </Container>
      </>
    );
  }
}
class Masuk extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    return (
      <FirebaseContext.Consumer>
        {(firebase) => <MasukFirebase {...this.props} firebase={firebase} />}
      </FirebaseContext.Consumer>
    );
  }
}

export default Masuk;
