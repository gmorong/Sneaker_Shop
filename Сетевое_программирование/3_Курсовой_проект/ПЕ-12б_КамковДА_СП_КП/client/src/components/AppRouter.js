import React, { useContext } from "react";
import {Route, Routes} from "react-router-dom";
import { authRoutes, publicRoutes } from "../routes";
import { Context } from "../index";
import ErrorPage from "./ErrorPage";
import {observer} from "mobx-react-lite";

const AppRouter = () => {
    const {user} = useContext(Context)
    console.log(user)
    return (
        <Routes>
            { user.isAuth && authRoutes.map(({path, element}) => //user.isAuth === true &&
                <Route 
                    key={path}
                    path={path}
                    element={element}
                    exact
                />
            )}

            {publicRoutes.map(({path, element}) =>
                <Route
                    key={path}
                    path={path}
                    element={element}
                    exact
                />
            )}

            <Route path='*' element={<ErrorPage/>}/>

        </Routes>
    );
};

export default observer(AppRouter);