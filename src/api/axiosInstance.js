import axios from "axios";
import { baseUrl } from "./url";

const axiosIntance = axios.create({
    baseURL:baseUrl,
});
export default axiosIntance;


