import React, { useContext, useEffect, useState } from "react";
import { Button, Card, Col, Container, Form, Image, Row } from "react-bootstrap";
import { useParams} from 'react-router-dom'
import { changeMin, changeRem, fetchOneDevice } from "../http/goodsAPI";
import { observer } from "mobx-react-lite";
import { Context } from "../index";
import { basketAdd } from "../http/userAPI";

const GoodsPage = () => {
    
    const {user} = useContext(Context)
    const [goods, setGoods] = useState({info: []})
    const {id} = useParams()
    const [quantyStock, setQuantyStock] = useState(0)
    const [quantyFrom, setQuantyFrom] = useState(0)
    
    useEffect(() => {
        fetchOneDevice(id).then(data => {
            setGoods(data)
        })
    }, [])

    const changemin = async (set, idd, quantyFrom) => {
        if (set===1) {
            const quantyFroms = parseInt(quantyFrom)
            changeMin(idd, quantyFroms)
            setTimeout(() => {
                fetchOneDevice(idd).then(data => {
                    setGoods(data)
                })
            },500)
        }else {
            const size = quantyFrom - 2 * quantyFrom
            changeMin(idd, size)
            setTimeout(() => {
                fetchOneDevice(idd).then(data => {
                    setGoods(data)
                })
            },500)
        }
    }

    const changerem = async (set, idd, quantyFrom) => {
        if (set===1) {
            const quantyFroms = parseInt(quantyFrom)
            changeRem(idd, quantyFroms)
            setTimeout(() => {
                fetchOneDevice(idd).then(data => {
                    setGoods(data)
                })
            },500)
        }else {
            const size = quantyFrom - 2 * quantyFrom
            changeRem(idd, size)
            setTimeout(() => {
                fetchOneDevice(idd).then(data => {
                    setGoods(data)
                })
            },500)
        }
    }

    const addgood = async (userId, goodId) => {
        basketAdd(userId, goodId)
    }

    return (
        <Container className="mt-3">
            <Row>
                <Col md={3}>
                    <Card className="gooditemss" style={{width: 300}}> 
                        <Card.Body>
                            <h2>{goods.name}</h2>
                        </Card.Body>
                        <Image className="gooditemss" width={300} height={300} src={"http://localhost:4000/" + goods.img}/>
                    </Card>
                </Col>
                <Col md={4}>
                    <Row>
                        <Card 
                            className="d-flex flex-column align-items-center"
                            style={{width: 400, height:380, border: '2px solid lightgray'}}>
                            <Row 
                                style={{width: 400, height:126, fontSize: 18, border: '1px solid lightgray'}}>
                                <Col className="m-auto">
                                    Цена:
                                </Col>
                                <Col className="m-auto">
                                    {goods.price} руб.
                                </Col>
                            </Row>
                            <Row 
                                style={{width: 400, height: 126, fontSize: 18, border: '1px solid lightgray'}}>
                                <Col className="m-auto">
                                    Остаток на складе:
                                </Col>
                                <Col className="m-auto">
                                    {goods.rem_stock} шт.
                                </Col>
                            </Row>
                            <Row 
                                style={{width: 400, height: 128, fontSize: 18, border: '1px solid lightgray'}}>
                                <Col className="m-auto">
                                    Продажа от:
                                </Col>
                                <Col className="m-auto">
                                    {goods.min_amount} шт.
                                </Col>
                            </Row>
                        </Card>
                    </Row>
                </Col>
                <Col md={3}>
                    <Row>
                        {user._user.role === "WORKER" &&
                            <Card 
                            className="d-flex flex-column align-items-center"
                            style={{border: '2px solid lightgray'}}>
                            <Row 
                                style={{height:126, fontSize: 24}}>
                                <div className="mt-5">Worker panel</div>
                            </Row>
                            <Row 
                                style={{width: 327, height: 126, fontSize: 18, border: '1px solid lightgray'}}>
                                <Row>
                                    <Form>
                                        <Form.Control
                                            className="mt-2"
                                            placeholder="quanty..."
                                            type="number"
                                            value={quantyStock}
                                            onChange={e => setQuantyStock(e.target.value)}/>
                                    </Form>
                                </Row>
                                <Row className="d-flex justify-content-between">
                                    <Button onClick={e => changerem(1, goods.id.toString(), quantyStock)} className="ms-3 mb-3" variant={"outline-dark"} style={{height: 50, width: 100, fontSize: 25}}>+</Button>
                                    <Button onClick={e => changerem(2, goods.id.toString(), quantyStock)} className="me-3 mb-3" variant={"outline-dark"} style={{height: 50, width: 100, fontSize: 25}}>-</Button>
                                </Row>
                            </Row>
                            <Row 
                                style={{width: 327, height: 127, fontSize: 18, border: '1px solid lightgray'}}>
                                <Row>
                                    <Form>
                                        <Form.Control
                                            className="mt-2"
                                            placeholder="quanty..."
                                            type='number'
                                            value={quantyFrom}
                                            onChange={e => setQuantyFrom(e.target.value)}/>
                                    </Form>
                                </Row>
                                <Row className="d-flex justify-content-between">
                                    <Button onClick={e => changemin(1, goods.id.toString(), quantyFrom)} className="ms-3 mb-3" variant={"outline-dark"} style={{height: 50, width: 100, fontSize: 25}}>+</Button>
                                    <Button onClick={e => changemin(2, goods.id.toString(), quantyFrom)} className="me-3 mb-3" variant={"outline-dark"} style={{height: 50, width: 100, fontSize: 25}}>-</Button>
                                </Row>
                            </Row>
                        </Card>
                        }
                        {user._user.role === "USER" &&
                        <Card 
                            className="d-flex flex-column align-items-center"
                            style={{border: '2px solid lightgray'}}>
                            <Card.Title className="mt-3">Добавить в корзину?</Card.Title>
                            <Button
                                className="heavyd mb-3"
                                variant="secondary"
                                onClick={e => addgood(user._user.id, goods.id)}>
                                Добавить
                            </Button>
                        </Card>
                        }
                    </Row>
                </Col>
            </Row>
            <Row className="d-flex flex-column m-3">
                <h1 style={{fontSize: 30}}>Характеристики</h1>
                {goods.info.map((info, index) =>
                    <Row 
                        key={info.id} 
                        style={{background: index % 2 === 0 ? 'white' : '#F7EFD4',
                            padding: 10,
                            border: '2px solid lightgray'}}>
                        {info.title}: {info.description}
                        {console.log(info)}
                    </Row>
                )}
            </Row>
        </Container>
    );
};

export default observer(GoodsPage);