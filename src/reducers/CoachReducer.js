import { State, Effect } from "jumpstate";
import { Actions } from "jumpstate";
import { setCookie, getCookie } from "../utils/AppUtils";
import _ from "lodash";
const currentState = "TodoStateV1";
export default State(currentState, {
  // Initial State should be starts with the key 'initial': ...
  initial: {
    code: 0,
    loginMessage: "",
    loggedinUser: "",
    registerMessage: "",
    isAdmin: false
  },
  registerAPIdata(state, payload) {
    //console.log("Register API data called", payload);
    var registerMessage = payload.username + " " + payload.message;
    state.code = payload.code;
    state.registerMessage = registerMessage;
    return _.cloneDeep(state);
  },
  loginAPIdata(state, payload) {
    var loginMessage = payload.message;
    state.code = payload.code;
    state.loginMessage = loginMessage;
    state.isAdmin = false;
    if (payload.code === 200) {
      state.loggedinUser = payload.user.username;
      state.isAdmin = payload.user.admin;
      //console.log(access_token);
      setCookie("username", payload.user.username, 7);
      setCookie("admin", payload.user.admin, 7);
    }
    return _.cloneDeep(state);
  }
});
Effect("loginAPI", (requestObject = {}) => {
  fetch("/api/login", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(requestObject)
  })
    .then(response => response.json())
    .then(message => {
      Actions.TodoStateV1.loginAPIdata(message);
    })
    .catch(err => {
      alert("Error sending data to server : " + err.message);
    });
});
Effect("registerAPI", (requestObject = {}) => {
  //console.log("inside register API");
  fetch("/api/register", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(requestObject)
  })
    .then(response => response.json())
    .then(message => {
      Actions.TodoStateV1.registerAPIdata(message);
    })
    .catch(err => {
      alert("Error sending data to server : " + err.message);
    });
});
