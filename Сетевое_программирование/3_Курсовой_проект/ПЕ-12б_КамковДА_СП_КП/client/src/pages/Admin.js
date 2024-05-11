import React, { useState } from "react";
import { Button, Card, Col, Container, Row } from "react-bootstrap";
import CreateBrand from "../components/modals/CreateBrand";
import CreateType from "../components/modals/CreateType";
import CreateGoods from "../components/modals/CreateGoods";
import { observer } from "mobx-react-lite";
import DeleteBrand from "../components/modals/DeleteBrand";
import DeleteType from "../components/modals/DeleteType";
import DeleteGoods from "../components/modals/DeleteGoods";
import TakeAdmin from "../components/modals/TakeAdmin";
import TakeAdminAdmin from "../components/modals/TakeAdminAdmin";
import TakeAdminUser from "../components/modals/TakeAdminUser";


const Admin = () => {
    
    const [brandVisible, setBrandVisible] = useState(false)
    const [typeVisible, setTypeVisible] = useState(false)
    const [goodsVisible, setGoodsVisible] = useState(false)

    const[brandDel, setBrandDel] = useState(false)
    const [typeDel, setTypeDel] = useState(false)
    const [goodsDel, setGoodsDel] = useState(false)

    const [userChange, setUserChange] = useState(false)
    const [userChangeUser, setUserChangeUser] = useState(false)
    const [userChangeAdmin, setUserChangeAdmin] = useState(false)

    
    
    return (
        <Container className="">
            <Row className="rowsmall">
            <Col className="margincolomn ms-10">
                <Card style={{width: 200}}>
                    <Card.Title className="m-auto">Type</Card.Title>
                    <Button 
                        style={{height: 50, width: 190}}
                        variant={"secondary"}
                        className="heavy mt-2 mb-2 m-auto"
                        onClick={() => setTypeVisible(true)}>
                        Add New Type
                    </Button>
                    <Button 
                        style={{height: 50, width: 190}}
                        variant={"secondary"}
                        className="heavy mt-2 mb-2 m-auto"
                        onClick={() => setTypeDel(true)}>
                        Delete Type
                    </Button>
                </Card>
            </Col>

            <Col className="margincolomn">
                <Card style={{width: 200}}>
                    <Card.Title className="m-auto">Brand</Card.Title>
                    <Button 
                        style={{height: 50, width: 190}}
                        variant={"secondary"}
                        className="heavy mt-2 mb-2 m-auto"
                        onClick={() => setBrandVisible(true)}>
                        Add New Brand
                    </Button>
                    <Button 
                        style={{height: 50, width: 190}}
                        variant={"secondary"}
                        className="heavy mt-2 mb-2 m-auto"
                        onClick={() => setBrandDel(true)}>
                        Delete Brand
                    </Button>
                </Card>
            </Col>

            <Col className="margincolomn me-10">
                <Card style={{width: 200}}>
                    <Card.Title className="m-auto">Goods</Card.Title>
                    <Button
                        style={{height: 50, width: 190}}
                        variant={"secondary"}
                        className="heavy mt-2 mb-2 m-auto"
                        onClick={() => setGoodsVisible(true)}>
                        Add New Goods
                    </Button>
                    <Button 
                        style={{height: 50, width: 190}}
                        variant={"secondary"}
                        className="heavy mt-2 mb-2 m-auto"
                        onClick={() => setGoodsDel(true)}>
                        Delete Goods
                    </Button>
                </Card >
            </Col>
            
            </Row>
            <Row className="rowsmall">
            <Card className="cardtop" style={{width: 400}}>
                    <Card.Title className="m-auto">Users</Card.Title>
                    <Button 
                        style={{height: 50, width: 250}}
                        variant={"secondary"}
                        className="heavy mt-2 mb-2 m-auto"
                        onClick={() => setUserChange(true)}>
                        Take role WORKER
                    </Button>
                    <Button 
                        style={{height: 50, width: 250}}
                        variant={"secondary"}
                        className="heavy mt-2 mb-2 m-auto"
                        onClick={() => setUserChangeAdmin(true)}>
                        Take role ADMIN
                    </Button>
                    <Button 
                        style={{height: 50, width: 250}}
                        variant={"secondary"}
                        className="heavy mt-2 mb-2 m-auto"
                        onClick={() => setUserChangeUser(true)}>
                        Take role USER
                    </Button>
                </Card>
            </Row>
            
            <CreateBrand show={brandVisible} onHide={() => setBrandVisible(false)}/>
            <CreateType show={typeVisible} onHide={() => setTypeVisible(false)}/>
            <CreateGoods show={goodsVisible} onHide={() => setGoodsVisible(false)}/>
            <DeleteBrand show={brandDel} onHide={() => setBrandDel(false)}/>
            <DeleteType show={typeDel} onHide={() => setTypeDel(false)}/>
            <DeleteGoods show={goodsDel} onHide={() => setGoodsDel(false)}/>
            <TakeAdmin show={userChange} onHide={() => setUserChange(false)}/>
            <TakeAdminAdmin show={userChangeAdmin} onHide={() => setUserChangeAdmin(false)}/>
            <TakeAdminUser show={userChangeUser} onHide={() => setUserChangeUser(false)}/>
        </Container>
    );
};

export default observer (Admin);