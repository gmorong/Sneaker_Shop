import React from "react";
import { Context } from "../index";
import { Container, Row } from "react-bootstrap";
import GoodsItem from "./GoodsItem"
import { observer } from "mobx-react-lite";

const BasketList = ({goods}) => {

    return (
        <Container>
            <Row>
                {goods.goodses.map(goods => 
                    <GoodsItem goods={goods}/>)}
            </Row>
        </Container>
    );
};

export default observer(BasketList);