import { useState } from 'react';
import { Form } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { createBrand } from '../../http/goodsAPI';
import { observer } from 'mobx-react-lite';
import NameError from '../errorModals/NameError';

const CreateBrand = ({show, onHide}) => {
    
    const [value, setValue] = useState('')

    const [nameError, setNameError] = useState(false)

    const addBrand = async () => {
        try{
            createBrand({name: value}).then(data => {
                setValue('')
                onHide()
            })
        }catch(e){
            setNameError(true)
        }
    }

    return (
    <Modal
        className='modal-brand-type'
        show={show}
        onHide={onHide}
    >
        <Modal.Header closeButton>
            <Modal.Title id="contained-modal-title-vcenter ">
                Create New Brand
            </Modal.Title>
        </Modal.Header>
        <Modal.Body>
            <Form >
                <Form.Control 
                    value={value}
                    onChange={e => setValue(e.target.value)}
                    placeholder={'Input brand-name'}
                />
            </Form>
        </Modal.Body>
        <Modal.Footer>
            <Button variant={'outline-danger'} onClick={onHide}>Close</Button>
            <Button variant={'outline-success'} onClick={addBrand}>Add</Button>
        </Modal.Footer>
        <NameError show ={nameError} onHide={() => setNameError(false)}/>
    </Modal>
  );
};

export default observer (CreateBrand);