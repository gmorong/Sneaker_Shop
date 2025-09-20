import React, { useContext, useState } from "react";
import { Container, Card, Form, Button } from "react-bootstrap";
import { NavLink, useNavigate } from "react-router-dom";
import { LOGIN_ROUTE } from "../utils/consts";
import { login, registration } from "../http/userAPI";
import { observer } from "mobx-react-lite";
import { Context } from "../index";
import SighUpExept from "../components/errorModals/SighUpExept";

const Registration = () => {
    const {user} = useContext(Context)

    const [errorVivible, setErrorVisible] = useState(false)

    const navigate = useNavigate()
    
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [name, setName] = useState('')
    const [second_name, setSecondName] = useState('')
    const [surname, setSurname] = useState('')
    const [p_number, setNumber] = useState('');
    
    const signUp = async () => {
        try {
            const response = await registration(email, password, name, second_name, surname, p_number)
            console.log(response)
            let data
            data = await login(email, password)
            user.setUser(data)
            user.setIsAuth(true)
            console.log(user.role)
            navigate('/home')
        } catch{
            setErrorVisible(true)
        }
    }
    
    const checkInput = (e) => {
        const onlyDigits = e.target.value.replace(/\D/g, "");
        setNumber(onlyDigits);
      };
    
    return (
        <Container 
            className="d-flex justify-content-center align-items-center"
            style={{height: window.innerHeight - 15}}
        >
            <Card style={{width: 600}} className="p-5">
                <h2 className="ms-auto me-auto">Registration</h2>
                <Form className="d-flex flex-column">
                    <Form.Control
                        className="mt-5"
                        placeholder="Enter your eMail..."
                        value={email}
                        onChange={e => setEmail(e.target.value)}
                    />
                    <Form.Control
                        className="mt-4"
                        placeholder="Enter your password..."
                        type="password"
                        value={password}
                        onChange={e => setPassword(e.target.value)}
                    />
                    <Form.Control
                        className="mt-4"
                        placeholder="Enter your name..."
                        value={name}
                        onChange={e => setName(e.target.value)}
                    />
                    <Form.Control
                        className="mt-4"
                        placeholder="Enter your second name..."
                        value={second_name}
                        onChange={e => setSecondName(e.target.value)}
                    />
                    <Form.Control
                        className="mt-4"
                        placeholder="Enter your surname..."
                        value={surname}
                        onChange={e => setSurname(e.target.value)}
                    />
                    <Form.Control
                        className="phone mt-4"
                        placeholder="Enter your phone number..."
                        type="tel"
                        maxLength="10"
                        value={p_number}
                        onChange={(e) => checkInput(e)}
                    />
                    
                    <div className="d-flex justify-content-between mt-3">
                        <NavLink to={LOGIN_ROUTE}>Sign In</NavLink>
                        <Button 
                            className="align-self-end" 
                            variant="outline-dark" 
                            style={{width: 120}}
                            onClick={signUp}>
                            Sign Up
                        </Button>
                    </div>
                    
                </Form>
            </Card>
            <SighUpExept show={errorVivible} onHide={() => setErrorVisible(false)}/>
        </Container>     
    );
};

export default observer(Registration);