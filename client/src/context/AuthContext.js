import { createContext, useEffect, useReducer } from "react";
import AuthReducer from "./AuthReducer";

const INITIAL_STATE = {
  user:JSON.parse(localStorage.getItem("user")) || null, //initially our user is null
  isFetching: false,  //initially we are not fetching any data
  error: false,
};


export const AuthContext = createContext(INITIAL_STATE); //creating our context

export const AuthContextProvider = ({ children }) => {  //this childern is our index.js
  const [state, dispatch] = useReducer(AuthReducer, INITIAL_STATE);
  
  useEffect(()=>{
    localStorage.setItem("user", JSON.stringify(state.user))
  },[state.user])
  
  return (
    <AuthContext.Provider
      value={{
        user: state.user, // we are sharing all these values with our app component in index.js so in this way we can use these values anywhere in our app
        isFetching: state.isFetching,
        error: state.error,
        dispatch,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}