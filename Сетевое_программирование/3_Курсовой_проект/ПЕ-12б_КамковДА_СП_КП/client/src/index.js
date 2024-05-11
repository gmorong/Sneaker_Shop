import React, { createContext } from "react";
import ReactDOM from 'react-dom/client';
import App from './App';
import UserStore from "./store/UserStore";
import GoodsStore from "./store/GoodsStore";
import "./styles/css/main.css"

export const Context = createContext(null)
console.log(process.env.REACT_APP_API_URL)

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <Context.Provider value={{
    user: new UserStore(),
    goods: new GoodsStore(),
  }}>
    <App />
  </Context.Provider>
);
