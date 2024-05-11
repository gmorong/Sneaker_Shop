import { Form } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { Dropdown } from 'react-bootstrap';
import { useContext, useEffect } from 'react';
import { Context } from '../../index';
import {  deleteType, fetchTypes } from '../../http/goodsAPI';
import { observer } from 'mobx-react-lite';

const DeleteType = ({show, onHide}) => {

    const {goods} = useContext(Context)
  
    useEffect(() => {
        fetchTypes().then(data => goods.setTypes(data))
    }, [])

    const delType = () => {
        deleteType(goods._selectedType.name).then(data => {
            goods.setSelectedtype('')
            onHide()
        })
    }

    return (
    <Modal
        className='modal-brand-type'
        show={show}
        onHide={onHide}
    >
        <Modal.Header closeButton>
            <Modal.Title id="contained-modal-title-vcenter ">
                Delete Type
            </Modal.Title>
        </Modal.Header>
        <Modal.Body>
            <Form >
                <Dropdown className='mt-2 mb-2'>
                    <Dropdown.Toggle>{goods._selectedType.name || "Select Type"}</Dropdown.Toggle>
                    <Dropdown.Menu>
                        {goods.types.map(type =>
                            <Dropdown.Item
                                onClick={() => goods.setSelectedtype(type)}
                                key={type.id}>
                                {type.name}
                            </Dropdown.Item>
                        )}
                    </Dropdown.Menu>
                </Dropdown>
            </Form>
        </Modal.Body>
        <Modal.Footer>
            <Button variant={'outline-danger'} onClick={onHide}>Close</Button>
            <Button variant={'outline-success'} onClick={delType}>Delete</Button>
        </Modal.Footer>
    </Modal>
  );
};

export default observer (DeleteType);