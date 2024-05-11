import { useState } from 'react';
import { Form } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { createType } from '../../http/goodsAPI';
import { observer } from 'mobx-react-lite';

const CreateType = ({show, onHide}) => {
  
    const [value, setValue] = useState('')

    const addType = () => {
        createType({name: value}).then(data => {
            setValue('')
            onHide()
        })
    }
  
    return (
    <Modal
        show={show}
        onHide={onHide}
        className='modal-brand-type'
    >
        <Modal.Header closeButton>
            <Modal.Title id="contained-modal-title-vcenter">
                Create New Type
            </Modal.Title>
        </Modal.Header>
        <Modal.Body>
            <Form>
                <Form.Control
                    value={value}
                    onChange={e => setValue(e.target.value)}
                    placeholder={'Input type-name'}
                />
            </Form>
        </Modal.Body>
        <Modal.Footer>
            <Button variant={'outline-danger'} onClick={onHide}>Close</Button>
            <Button variant={'outline-success'} onClick={addType}>Add</Button>
        </Modal.Footer>
    </Modal>
  );
};

export default observer (CreateType);