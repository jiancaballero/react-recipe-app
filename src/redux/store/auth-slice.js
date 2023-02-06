const { createSlice } = require("@reduxjs/toolkit");

const initialState = {
  uid: null,
  token: null,
  firstName: "",
  lastName: "",
  email: "",
};
const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    login(state, action) {
      state.uid = action.payload.uid;
      state.token = action.payload.token;
      state.firstName = action.payload.firstName;
      state.lastName = action.payload.lastName;
      state.email = action.payload.email;
      console.log(state);
    },
    logout() {
      localStorage.removeItem("userData");
    },
  },
});
export const authActions = authSlice.actions;
export default authSlice.reducer;
