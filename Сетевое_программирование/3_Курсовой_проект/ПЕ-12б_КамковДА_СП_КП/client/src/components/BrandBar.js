import { observer } from "mobx-react-lite";
import React, { useContext } from "react";
import { Context } from "../index";
import {Dropdown, Row } from "react-bootstrap";

const BrandBar = observer( () => {
    
    const {goods} = useContext(Context)
    
    const drop = async () => {
        goods.setSelectedbrand('')
    }

    return (
        <Row className="">
            <Dropdown>
                    <Dropdown.Toggle className="heavyd" variant="secondary">
                        {goods._selectedBrand.name || "--Select Brand--"}
                    </Dropdown.Toggle>
                    <Dropdown.Menu className="">
                        <Dropdown.Item onClick={drop} className="">
                            {"--Select Brand--"}
                        </Dropdown.Item>
                        {goods.brands.map(brand =>
                            <Dropdown.Item
                                className=""
                                onClick={() => goods.setSelectedbrand(brand)}
                                key={brand.id}>
                                {brand.name}
                            </Dropdown.Item>
                        )}
                    </Dropdown.Menu>
                </Dropdown>
        </Row>
        
        
        
    );
});

export default BrandBar;