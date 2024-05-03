import React, { createContext, useEffect, useState } from "react";
import { fetchUserInfo } from "../redux-tookit/actions/userActions";
import { checkLoginStatus } from "../redux-tookit/actions/authActions";
import { useDispatch, useSelector } from "react-redux";
import { counterSelector } from "../redux-tookit/selector";
export const UserContext = createContext({});

export function UserContextProvider({ children }) {
  const dispatch = useDispatch();
  const [user, setUser] = useState();
  const [isAuthenticated, setIsAuthenticated] = useState();
  const [ready,setReady] = useState(false);

  const counter = useSelector(counterSelector);
  
  useEffect(() => {
    fetchUserInfo(setUser, setIsAuthenticated, dispatch);
  }, [counter]);


  return (
    <UserContext.Provider value={{ user, setUser, isAuthenticated, setIsAuthenticated, ready }}>
      {children}
    </UserContext.Provider>
  );
}