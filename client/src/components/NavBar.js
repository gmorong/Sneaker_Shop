import React, { useContext } from "react";
import { Context } from "../index";
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Button from 'react-bootstrap/Button';
import { observer } from "mobx-react-lite";
import { useNavigate } from "react-router-dom";
import { fetchBrands, fetchGoods, fetchTypes } from "../http/goodsAPI";

const NavBar = observer( () => {
    
    const {user} = useContext(Context)
    const {goods} = useContext(Context)
    
    const navigate = useNavigate()

    const navAdmin = () => {
        
        if(user._user.role === "ADMIN"){
            try{
                navigate('/admin/')
            } catch (e) {
                alert(e.response.data.message)
            }
        }
    }



    const navHome = () => {
        goods._goods=[]
        fetchTypes().then(data => goods.setTypes(data))
        fetchBrands().then(data => goods.setBrand(data))
        fetchGoods(null, null, 1, 8, null).then(data => {
            goods.setGoods(data.rows)
            goods.setTotalCount(data.count)
        })
        try{
            navigate('/home/')
        } catch (e) {
            alert(e.response.data.message)
        }
    }


    async function logOut(){

        user._isAuth = false
        localStorage.removeItem('token')
        try{
            navigate('/')
        } catch (e) {
            alert(e.response.data.message)
        }
    }

    return (
        <Navbar expand="lg" className="bg-body-tertiary">
            <Container>
                <Navbar.Brand>OPT Store</Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="me-auto">
                        <Nav.Link className="mt-1" onClick={navHome}>Home</Nav.Link>
                    </Nav>
                    <Nav>
                        {user._user.role === "ADMIN" && user._isAuth &&
                            <>
                                <Button 
                                    className="heavy me-2" 
                                    variant="secondary"
                                    onClick={navAdmin}>
                                    Admin
                                </Button>
                                <Button 
                                    className="heavy me-2" 
                                    variant="secondary"
                                    onClick={logOut}>
                                    Log Out
                                </Button>
                            </>
                        }
                        {user._user.role === "WORKER" && user._isAuth &&
                            <>
                                <Button 
                                    className="heavy me-2" 
                                    variant="secondary"
                                    onClick={logOut}>
                                    Log Out
                                </Button>
                            </>
                        }
                        {user._user.role === "USER" && user._isAuth &&
                            <>
                                <Button 
                                    className="heavy me-2" 
                                    variant="secondary"
                                    onClick={logOut}>
                                    Log Out
                                </Button>
                            </>
                        }
                        {!user._isAuth &&
                            <>
                                <Button 
                                    className="heavy me-2" 
                                    variant="secondary"
                                    onClick={logOut}>
                                    Sign Up
                                </Button>
                            </>
                        }
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
});

export default NavBar;