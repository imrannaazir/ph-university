import { jwtDecode } from "jwt-decode";

const decodeToken = (token: string) => {
  return jwtDecode(token);
};
export default decodeToken;
