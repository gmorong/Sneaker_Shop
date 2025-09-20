import React, { useContext, useState } from "react";
import { Container, Card, Form, Button } from "react-bootstrap";
import { NavLink, useNavigate } from "react-router-dom";
import { REGISTRATION_ROUTE } from "../utils/consts";
import { Context } from "../../src/index";
import { login } from "../http/userAPI";
import { observer } from "mobx-react-lite";
import SignInExept from "../components/errorModals/SignInExept";


const Auth = () => {
    
    const {user} = useContext(Context)

    const [errorVivible, setErrorVisible] = useState(false)
    const navigate = useNavigate()

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const signIn = async () => {
        try{
            let data;
            data = await login(email, password)
            user.setUser(data)
            user.setIsAuth(true)
            console.log(user.role)
            navigate('/home')
        } catch (e) {
            setErrorVisible(true)
        }
    }


    return (
        <Container 
            className="d-flex justify-content-center align-items-center"
            style={{height: window.innerHeight - 54}}
        >
            <Card bg="ligh" style={{width: 600}} className="p-5">
                <h2 className="ms-auto me-auto">Authorization</h2>
                <Form className="d-flex flex-column">
                    <Form.Control
                        className="formsEnter mt-5"
                        placeholder="Enter your login..."
                        value={email}
                        onChange={e => setEmail(e.target.value)}
                    />
                    <Form.Control
                        className="formsEnter mt-4"
                        placeholder="Enter your password..."
                        type="password"
                        value={password}
                        onChange={e => setPassword(e.target.value)}
                    />
                    
                    <div className="d-flex justify-content-between mt-3">
                        <NavLink 
                            to={REGISTRATION_ROUTE}>
                            Registration
                        </NavLink>
                        <Button
                            className="heavy align-self-end"
                            variant="secondary"
                            style={{width: 120}}
                            onClick={signIn}>
                            Sign In
                        </Button>
                    </div>
                    
                </Form>
            </Card>
            <SignInExept  show={errorVivible} onHide={() => setErrorVisible(false)}/>
        </Container>
    );
};

export default observer(Auth);