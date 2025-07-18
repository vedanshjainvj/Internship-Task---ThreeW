// -------------------- PACKAGE IMPORT FILES -------------------- //
import axios from "axios";

const BackendUrl = import.meta.env.VITE_BASE_URL || "http://localhost:4000";

const instance = axios.create({
  baseURL: BackendUrl,
  withCredentials: true,
});

export default instance;
