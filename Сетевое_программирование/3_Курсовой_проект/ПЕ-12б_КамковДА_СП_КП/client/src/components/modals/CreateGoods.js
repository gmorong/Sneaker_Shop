import React, { useContext, useEffect, useState } from 'react'; 
import { Col, Dropdown, Form, Row } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import {Context} from '../../index'
import { createGoods, fetchBrands, fetchTypes } from '../../http/goodsAPI';
import { observer } from 'mobx-react-lite';

const CreateGoods = ({show, onHide}) => {
  
    const {goods} = useContext(Context)
    const [name, setName] = useState('')
    const [price, setPrice] = useState('')
    const [balance, setBalance] = useState('')
    const [wholesale, setWholesale] = useState('')
    const [file, setFile] = useState(null)
    const [info, setInfo] = useState([])

    useEffect(() => {
        fetchTypes().then(data => goods.setTypes(data))
        fetchBrands().then(data => goods.setBrand(data))
    }, [])

    const addInfo = () => {
        console.log(goods.goodId)
        setInfo([...info, {title: '', description: '', number: Date.now(), goodId: goods.goodId}])
        console.log(info)
    }
    const removeInfo = (number) => {
        setInfo(info.filter(i => i.number !== number))
    }
    const swapInfo = (key, value, number) => {
        setInfo(info.map(i => i.number === number ? {...i, [key]: value} : i))
    }
    const selectFile = e => {
        setFile(e.target.files[0])
    }
    

    const addGoods = () => {
        const formData = new FormData()
        formData.append('name', name)
        formData.append('price', `${price}`)
        formData.append('rem_stock', `${balance}`)
        formData.append('min_amount', `${wholesale}`)
        formData.append('img', file)
        formData.append('brandId', goods._selectedBrand.id)
        formData.append('typeId', goods._selectedType.id)
        formData.append('info', JSON.stringify(info))
        createGoods(formData).then(data => onHide())
        
    }   

    return (
    <Modal
        show={show}
        onHide={onHide}
        className='modal-goods'
    >
        <Modal.Header closeButton>
            <Modal.Title id="contained-modal-title-vcenter">
                Create New Goods
            </Modal.Title>
        </Modal.Header>
        <Modal.Body>
            <Form>
                <Dropdown className='mt-2 mb-2'>
                    <Dropdown.Toggle>{goods._selectedType.name || "Select Type"}</Dropdown.Toggle>
                    <Dropdown.Menu>
                        {goods.types.map(type =>
                            <Dropdown.Item 
                                onClick={() => goods.setSelectedtype(type)}
                                key={type.id}
                                >
                                {type.name}
                            </Dropdown.Item>
                        )}
                    </Dropdown.Menu>
                </Dropdown>
                <Dropdown className='mt-2 mb-2'>
                    <Dropdown.Toggle>{goods._selectedBrand.name || "Select Brand"}</Dropdown.Toggle>
                    <Dropdown.Menu>
                        {goods.brands.map(brand =>
                            <Dropdown.Item
                                onClick={() => goods.setSelectedbrand(brand)}
                                key={brand.id}>
                                {brand.name}
                            </Dropdown.Item>
                        )}
                    </Dropdown.Menu>
                </Dropdown>
                <Form.Control
                    value={name}
                    onChange={e => setName(e.target.value)}
                    className='mt-3'
                    placeholder='Name'
                />
                <Form.Control
                    value={price}
                    onChange={e => setPrice(Number(e.target.value))}
                    className='mt-3'
                    placeholder='Price'
                    type='number'
                />
                <Form.Control
                    value={balance}
                    onChange={e => setBalance(Number(e.target.value))}
                    className='mt-3'
                    placeholder='Balance in Stock'
                    type='number'
                />
                <Form.Control
                    value={wholesale}
                    onChange={e => setWholesale(Number(e.target.value))}
                    className='mt-3'
                    placeholder='Minimal Wholesale to sale'
                    type='number'
                />
                <Form.Control
                    className='mt-3'
                    type='file'
                    onChange={selectFile}
                />
                <hr/>
                <Button 
                    variant='outline-dark'
                    onClick={addInfo}
                >
                    Add new description
                </Button>
                {info.map(i => 
                    <Row className='mt-3' key={i.number}>
                        <Col md={4}>
                            <Form.Control
                                value={i.title}
                                onChange={(e) => swapInfo('title', e.target.value, i.number)}
                                placeholder='Enter title'
                            />
                        </Col>
                        <Col md={5}>
                            <Form.Control
                                value={i.description}
                                onChange={(e) => swapInfo('description', e.target.value, i.number)}
                                placeholder='Enter description'
                            />
                        </Col>
                        <Col>
                            <Button 
                                variant='outline-danger'
                                onClick={() => removeInfo(i.number)}>
                                Delete
                            </Button>
                        </Col>
                    </Row>
                )}
            </Form>
        </Modal.Body>
        <Modal.Footer>
            <Button variant={'outline-danger'} onClick={onHide}>Close</Button>
            <Button variant={'outline-success'} onClick={addGoods}>Add</Button>
        </Modal.Footer>
    </Modal>
  );
};

export default observer (CreateGoods) ;