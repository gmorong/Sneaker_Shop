import { observer } from "mobx-react-lite";
import React, { useContext } from "react";
import { Context } from "../index";
import { Dropdown } from "react-bootstrap";

const BrandBar = observer( () => {
    
    const {goods} = useContext(Context)
    
    const drop = async () => {
        goods.setSelectedtype('')
    }

    return (
        <Dropdown>
            <Dropdown.Toggle className="heavyd" variant="secondary">
                {goods._selectedType.name || "--Select Type--"}
            </Dropdown.Toggle>
            <Dropdown.Menu className="">
                <Dropdown.Item onClick={drop} className="">
                    {"--Select Type--"}
                </Dropdown.Item>
                {goods.types.map(type =>
                    <Dropdown.Item
                        className=""
                        onClick={() => goods.setSelectedtype(type)}
                        key={type.id}>
                        {type.name}
                    </Dropdown.Item>
                )}
            </Dropdown.Menu>
        </Dropdown> 
    );
});

export default BrandBar;