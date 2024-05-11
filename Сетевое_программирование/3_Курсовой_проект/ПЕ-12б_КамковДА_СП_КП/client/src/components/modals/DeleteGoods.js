import { Form } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { useState } from 'react';
import {  deleteGoods } from '../../http/goodsAPI';
import { observer } from 'mobx-react-lite';

const DeleteGoods = ({show, onHide}) => {

  
    const [name, setName] = useState('')


    const delGoods = () => {
        deleteGoods(name).then(data => {
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
                <Form.Control
                value={name}
                onChange={e => setName(e.target.value)}
                className='mt-3'
                placeholder='Name'/>
            </Form>
        </Modal.Body>
        <Modal.Footer>
            <Button variant={'outline-danger'} onClick={onHide}>Close</Button>
            <Button variant={'outline-success'} onClick={delGoods}>Delete</Button>
        </Modal.Footer>
    </Modal>
  );
};

export default observer (DeleteGoods);