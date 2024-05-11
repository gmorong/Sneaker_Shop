import React, { useContext } from "react";
import { Col, Container, Row } from "react-bootstrap";
import { Context } from "../index";
import { observer } from "mobx-react-lite";
import BasketList from "../components/BasketList";

const Basket = () => {
    
    const {goods} = useContext(Context)
    goods._goods=[]
    
    return (
        <Container>
            <Row>
                <Col>

                </Col>
                <Col md={9}>
                    <Row className="d-flex">
                        <BasketList goods={goods}/>
                    </Row>
                </Col>
            </Row>
        </Container>
    );
};

export default observer(Basket);