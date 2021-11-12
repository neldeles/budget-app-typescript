import axios from "axios";

const baseUrl = "http://localhost:5000/auth/is-verify";

const verify = async () => {
  const response = await axios.get(baseUrl);
  return response;
};

export { verify };
