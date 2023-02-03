const { createSlice } = require("@reduxjs/toolkit");

const initialState = {
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
      console.log(action.payload.token);
      state.token = action.payload.token;
      state.firstName = action.payload.firstName;
      state.lastName = action.payload.lastName;
      state.email = action.payload.email;
    },
    logout(state) {
      state.token = null;
    },
  },
});
export const authActions = authSlice.actions;
export default authSlice.reducer;
