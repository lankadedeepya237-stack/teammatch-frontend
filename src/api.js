
import axios from "axios";

const api = axios.create({
  baseURL: "https://teammatch-backend-6alh.onrender.com/api"
});

export default api;
