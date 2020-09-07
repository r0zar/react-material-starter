import React from "react";
import { merge } from "lodash";

let reducer = (data, newData) => {
  return { ...merge(data, newData) };
};

const initialState = {};

const DataContext = React.createContext();

const DataProvider = (props) => {
  const [data, setData] = React.useReducer(reducer, initialState);

  const getMe = async (input) => {
    console.log(input);
  };

  const createIdea = async (input) => {
    console.log(input);
  };

  const deleteIdea = async (input) => {
    console.log(input);
  };

  const getIdeas = async (input) => {
    console.log(input);
  };

  const updateIdea = async (input) => {
    console.log(input);
  };

  return (
    <DataContext.Provider
      value={{
        data,
        setData,
        getMe,
        createIdea,
        deleteIdea,
        getIdeas,
        updateIdea,
      }}
    >
      {props.children}
    </DataContext.Provider>
  );
};

export { DataContext, DataProvider };
