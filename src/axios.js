import axios from "axios";

const instance = axios.create({
  baseURL: "https://purplespace.herokuapp.com/api/",
});

export default instance;
