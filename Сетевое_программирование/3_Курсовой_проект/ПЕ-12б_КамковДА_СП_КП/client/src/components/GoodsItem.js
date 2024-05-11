import React from "react";
import { Card, Col, Image } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

const GoodsItem = ({goods}) => {

    const navigate = useNavigate()

    const navto = async () => {
        try{
            navigate('/goods/' + goods.id)
        } catch (e) {
            alert(e.response.data.message)
        }
    }

    return (
                <Col md={3} onClick={navto}>
                    <div>
                        <Card className="outlinei mt-3" style={{width:150, cursor: 'pointer'}} border={"light"}>
                            <Image className="gooditemss mt-1" width={142} height={142} src={"http://localhost:4000/" + goods.img}/>
                            <div className="text-black-50 mt-1 d-flex justify-content-between align-items-center">
                                <div>{goods.brand}</div>
                            </div>
                            <div>{goods.name}</div>
                        </Card>
                    </div>
                </Col>
    )
};

export default GoodsItem;