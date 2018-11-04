import axios from "axios";

export default {
  name: "api",
  props: {
    customer: String, //db
    user: String, //_id
    server: String //address
  },
  login(username, password) {
    return axios
      .post(this.props.server + "login", {
        username: username,
        password: password
      })
      .then(response => {
        return response;
      })
      .catch(err => {
        return JSON.parse('{error:"' + err + '"}')
      });
  },
  logout() {
    return axios
      .get(this.props.server + 'logout')
      .then(response => {
        return response;
      })
      .catch(err => {
        return JSON.parse('{error:"' + err + '"}')
      });
  },
  getAssets() {
    return axios
      .get(this.props.server + "assets/" + this.props.user)
      .then(response => {
        return response;
      })
      .catch(err => {
        return JSON.parse('{error:"' + err + '"}')
      });
  }
};
