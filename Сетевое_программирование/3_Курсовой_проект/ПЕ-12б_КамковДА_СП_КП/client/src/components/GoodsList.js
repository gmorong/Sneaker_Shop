import React, { useContext, useState, useMemo, useEffect } from "react";
import { Context } from "../index";
import { Container, Row, Form } from "react-bootstrap";
import GoodsItem from "./GoodsItem"
import { observer } from "mobx-react-lite";

const GoodsList = () => {
    
    const {goods} = useContext(Context)
    const [array, setArray] = useState([])
    const [name, setName] = useState('')

    useEffect(() => {
        setArray(goods._goods ? goods._goods : [])
    }, [goods._goods])
    
    const search = useMemo(() => {
        return array.filter((obj) => obj.name.toLowerCase().includes(name.toLowerCase()))
    }, [array, name])

    return (
        <Container>
            <Row>
                <Form.Control
                    className="formsSearch mt-3"
                    placeholder="Enter name..."
                    value={name}
                    onChange={e => setName(e.target.value)}
                />
            </Row>
            <Row>
                {search.length > 0 && search.map(item => 
                    <GoodsItem key={item.id} goods={item}/>)}
            </Row>
        </Container>
    );
};

export default observer(GoodsList);