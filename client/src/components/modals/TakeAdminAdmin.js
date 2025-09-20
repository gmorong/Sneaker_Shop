import { Form } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { useState } from 'react';
import { observer } from 'mobx-react-lite';
import ChangeExept from '../errorModals/ChangeExept';
import { changeAdmin } from '../../http/userAPI';

const TakeAdminAdmin = ({show, onHide}) => {

  
    const [email, setEmail] = useState('')

    const [errorVivible, setErrorVisible] = useState(false)


    const change = async () => {
        try {
            let data;
            data = await changeAdmin(email).then(data => {
                onHide()
            })
        } catch(e){
            setErrorVisible(true)
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
                Take Admin
            </Modal.Title>
        </Modal.Header>
        <Modal.Body>
            <Form >
                <Form.Control
                value={email}
                onChange={e => setEmail(e.target.value)}
                className='mt-3'
                placeholder='login'/>
            </Form>
        </Modal.Body>
        <Modal.Footer>
            <Button variant={'outline-danger'} onClick={onHide}>Close</Button>
            <Button variant={'outline-success'} onClick={change}>Change</Button>
        </Modal.Footer>
        <ChangeExept show={errorVivible} onHide={() => setErrorVisible(false)}/>
    </Modal>
  );
};

export default observer (TakeAdminAdmin);