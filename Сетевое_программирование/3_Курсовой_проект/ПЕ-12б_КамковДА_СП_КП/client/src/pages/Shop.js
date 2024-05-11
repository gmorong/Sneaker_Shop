import React, { useContext, useEffect } from "react";
import { Button, Card, Col, Container, Row } from "react-bootstrap";
import TypeBar from "../components/TypeBar";
import BrandBar from "../components/BrandBar";
import GoodsList from "../components/GoodsList";
import { Context } from "../index";
import { fetchBrands, fetchGoods, fetchOneDevice, fetchTypes } from "../http/goodsAPI";
import Pages from "../components/Pages";
import { observer } from "mobx-react-lite";
import { useNavigate } from "react-router-dom";
import { basketGet } from "../http/userAPI";

const Shop = () => {
    
    const {user} = useContext(Context)
    const {goods} = useContext(Context)
    const array = []
    const array2 = []
    const array3 = []
    var i = 0
    const navigate = useNavigate()

    useEffect(() => {
        fetchTypes().then(data => goods.setTypes(data))
        fetchBrands().then(data => goods.setBrand(data))
        fetchGoods(null, null, 1, 8, null).then(data => {
            goods.setGoods(data.rows)
            goods.setTotalCount(data.count)
        })
    }, [])

    useEffect(() => {
        fetchGoods(goods.SelectedType.id, goods.SelectedBrand.id, goods.page, 8).then(data => {
            goods.setGoods(data.rows)
            goods.setTotalCount(data.count)
        })
    }, [goods.page, goods.SelectedType, goods.SelectedBrand])

    const navUser = () => {
        
        if(user._user.role === "USER"){
            try{
                navigate('/basket/')
            } catch (e) {
                alert(e.response.data.message)
            }
        }
    }

    const retry = async () => {
        console.log(goods.goodses)
        

        await basketGet(user._user.id).then(data => {
            array[i] = data
            i++
        })

        for (let i = 0; i < array.length; i++) {
            array2[i] = array[i].map(Object.values)
        }

        console.log(array2[0])

        for (let i = 0; i < array2[0].length; i++) {
            array3[i] = array2[0][i][4]
        }

        

        for (let i = 0; i < array3.length; i++) {
            await fetchOneDevice(array3[i]).then(data => {
                goods._goods[i] = data
                console.log(data)
            })
        }

        console.log(goods.goodses)
    }



    
    return (
        <Container>
            <Row>
                <Col md={3}>
                    <Card className="mt-3 text-center">
                        <Card.Title className="mt-3">
                            Navigation
                        </Card.Title>
                        <TypeBar/>
                        <BrandBar/>
                        
                        <Pages/>

                        {user._user.role === "USER" && user._isAuth &&
                            <>
                                <Button 
                                    className="heavyd m-auto mb-3" 
                                    variant="secondary"
                                    onClick={e => {
                                        retry()
                                        navUser()
                                    }}>
                                    Bascet
                                </Button>
                            </>
                        }
                    </Card>
                </Col>
            
                <Col md={9}>
                    <GoodsList/>

                </Col>
            </Row>
        </Container>
    );
};

export default observer(Shop);