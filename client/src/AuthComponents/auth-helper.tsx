const auth = {
  isAuthenticated() {
    if (typeof window == "undefined") return false;

    if (localStorage.getItem("userInfo"))
      return JSON.parse(localStorage.getItem("userInfo")!);
    else return false;
  },
  authenticate(jwt: any, cb: any) {
    if (typeof window !== "undefined")
      localStorage.setItem("jwt", JSON.stringify(jwt));
    cb();
  },
  clearJWT(cb: any) {
    if (typeof window !== "undefined") localStorage.removeItem("jwt");
    cb();
    //optional
  },
};

export default auth;
