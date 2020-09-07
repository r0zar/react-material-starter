import React from "react";
import { merge } from "lodash";
import Cookie from "js-cookie";
import axios from "axios";

let reducer = (data, newData) => {
  return { ...merge(data, newData) };
};

const initialState = {};

const AuthContext = React.createContext();

const AuthProvider = (props) => {
  const [auth, setAuth] = React.useReducer(reducer, initialState);

  const initialize = async () => {
    let jwt = Cookie.get("jwt");
    let refresh_token = Cookie.get("refresh");
    if (auth.jwt) {
      // Link from active session
    } else if (jwt) {
      // Refresh from active session
    } else if (refresh_token) {
      // JWT has expired
      jwt = await refreshJWT({ refresh_token });
    } else {
      // No active session
      throw new Error("No active session");
    }
    setAuth({ jwt, refresh_token });
  };

  const refreshJWT = async (input) => {
    console.log(input);
  };

  const signIn = async (input) => {
    console.log(input);
  };

  const signOut = async (input) => {
    console.log(input);
  };

  const signUp = async (input) => {
    console.log(input);
  };

  return (
    <AuthContext.Provider
      value={{ auth, setAuth, initialize, signIn, signOut, signUp }}
    >
      {props.children}
    </AuthContext.Provider>
  );
};

export { AuthContext, AuthProvider };
