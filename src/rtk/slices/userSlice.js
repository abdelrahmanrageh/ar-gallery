import { createSlice } from "@reduxjs/toolkit";

export const userSlice = createSlice({
  initialState: {
    user: JSON.parse(localStorage.getItem("user")) || {},
    loggedIn: JSON.parse(localStorage.getItem("loggedIn")) || false,
    country: JSON.parse(localStorage.getItem("country")) || "EG",
  },
  name: "user",
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload;
      localStorage.setItem("user", JSON.stringify(action.payload));
    },
    clearUser: (state) => {
      state.user = {};
      window.localStorage.setItem("user", JSON.stringify({}));
    },
    setLoggedIn: (state, action) => {
      state.loggedIn = action.payload;
      if (action.payload === false) {
        state.user = {};
        window.localStorage.setItem("user", JSON.stringify({}));
      }
      localStorage.setItem("loggedIn", action.payload);
    }
  }
});

// check if user is logged in
export const authLogin = () => {
  return async (dispatch) => {
    try {
      const res = await fetch("https://ar-backend-0833.onrender.com/users/auth", {
        method: "GET",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (res.ok) {
        const user = await res.json();
        dispatch(setUser(user.user));
        if (user.exp < Date.now() / 1000) {
          dispatch(setLoggedIn(false)); 
        } else {
          dispatch(setLoggedIn(true)); 
        }
      } else {
        dispatch(setLoggedIn(false)); 
      }
    } catch (error) {
      dispatch(setLoggedIn(false)); 
    }
  };
};

export const { setUser, setLoggedIn  ,clearUser } = userSlice.actions;
export default userSlice.reducer;