export const fakeAuth = {
  login(email, role) {
    localStorage.setItem("user", JSON.stringify({ email, role }));
  },
  logout() {
    localStorage.removeItem("user");
  },
  getUser() {
    return JSON.parse(localStorage.getItem("user"));
  },
};
