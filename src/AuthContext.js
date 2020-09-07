import React from "react";
import { merge } from "lodash";

let reducer = (data, newData) => {
  return { ...merge(data, newData) };
};

const initialState = {};

const AuthContext = React.createContext();

const AuthProvider = (props) => {
  const [auth, setAuth] = React.useReducer(reducer, initialState);

  const initialize = async () => {
    console.log("Initializing...");
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
