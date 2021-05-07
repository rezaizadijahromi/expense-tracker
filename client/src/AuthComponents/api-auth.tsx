import axios from "axios";

interface UserSignupApi {
  name: String;
  password: String;
  email: String;
  open?: true | false;
  error?: String;
}

const signup = async (user: UserSignupApi) => {
  try {
    let response: UserSignupApi = await axios.post("/api/users/", user);
    return response;
  } catch (error) {
    console.log("Error signup is: ", error);
  }
};

const signin = async (user: UserSignupApi) => {
  try {
    let response = await axios.post("/api/users/login", user);

    return response;
  } catch (error) {}
};

export { signup, signin };
