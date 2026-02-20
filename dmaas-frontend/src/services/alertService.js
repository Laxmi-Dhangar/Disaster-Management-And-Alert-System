import axios from "axios";
import { getToken } from "../utils/auth";

const API_URL = "http://localhost:8080/api/responder/alerts";

export const getResponderAlerts = async () => {
  const response = await axios.get(API_URL, {
    headers: {
      Authorization: `Bearer ${getToken()}`
    }
  });
  return response.data;
};
