import axios from "axios";

export default {
  name: "api",
  props: {
    customer: String,
    user: String,
    server: String
  },
  getUserProps() {
    return axios
      .get(this.props.server + "user/" + this.props.user)
      .then(response => {
        return response.data;
      });
  },
  getAssets() {
    return axios
      .get(self.props.server + "users/" + self.props.customer + "/assets")
      .then(response => {
        return response.data;
      });
  }
};
