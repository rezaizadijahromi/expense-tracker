import axios from "axios";

interface UserSignupApi {
  name: "";
  password: "";
  email: "";
  open: true | false;
  error: "";
}

const signup = async (user) => {
  try {
    let response: UserSignupApi = await axios.post("/api/users/", user);
    return response;
  } catch (error) {
    console.log("Error signup is: ", error);
  }
};

const signin = async (user) => {
  try {
    let response = await axios.post("/api/users/login", user);

    return response;
  } catch (error) {}
};

export { signup, signin };
