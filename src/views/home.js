import React, { Component } from "react";
import { connect } from "react-redux";
import { Actions } from "jumpstate";
import IconButton from "material-ui/IconButton";
import NavigationClose from "material-ui/svg-icons/action/power-settings-new";
import { render } from "react-dom";
import AppBar from "material-ui/AppBar";
import { getCookie, deleteCookie } from "../utils/AppUtils";
import { browserHistory } from "react-router";

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      value: ""
    };
  }
  logOut = () => {
    deleteCookie("username");
    deleteCookie("admin");
    browserHistory.push("/");
  };
  render() {
    return (
      <div>
        <AppBar
          title="TDome v2.0"
          iconElementRight={
            <IconButton tooltip="Logout" onClick={() => this.logOut()}>
              <NavigationClose />
            </IconButton>
          }
          style={{ backgroundColor: "#EA2027" }}
        />
      </div>
    );
  }
}
const mapStateToProps = state => {
  return {
    coach: state.coach
  };
};

const mapDispatchToProps = dispatch => {
  return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(Home);
