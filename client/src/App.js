import React, { useContext, useEffect, useState } from "react";
import AppRouter from "./components/AppRouter";
import { BrowserRouter } from "react-router-dom";
import NavBar from "./components/NavBar";
import { Context } from "./index";
import { check } from "./http/userAPI";
import { observer } from "mobx-react-lite";


const App = () => {
    
    const {user} = useContext(Context)
    const [loading, setLoading] = useState(true)

    useEffect(() => {
      if (localStorage.getItem('token')){
        check().then(data => {
          user.setUser(true)
          user.setIsAuth(true)
        }).finally(() => setLoading(false))
      } else {
        user.setUser({})
        user.setIsAuth(false)
      }
    }, [])
  
    return (
        <BrowserRouter>
          <NavBar/>
          <AppRouter/>
        </BrowserRouter>
    );
};

export default observer(App);