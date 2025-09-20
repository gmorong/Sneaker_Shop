import React, {useContext} from 'react';
import {Context} from "../index";

const ErrorPage = () => {
    const {user} = useContext(Context)

    return (
        <div className="d-flex justify-content-center align-items-center" style={{height: 500}}>
            {user._isAuth ?
                "Такой страницы нет :("
                :
                "Авторизируйтесь, чтобы продолжить"
            }
        </div>
    );
};

export default ErrorPage;