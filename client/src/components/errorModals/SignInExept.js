import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

const SignInExept = ({show, onHide}) => {
    
    return (
    <Modal
        className='modal-brand-type'
        show={show}
        onHide={onHide}
    >
        <Modal.Header closeButton>
            <Modal.Title id="contained-modal-title-vcenter ">
                Undefind
            </Modal.Title>
        </Modal.Header>
        <Modal.Body>
            Incorrect login or password
        </Modal.Body>
        <Modal.Footer>
            <Button variant={'outline-danger'} onClick={onHide}>Ok</Button>
        </Modal.Footer>
    </Modal>
  );
};

export default SignInExept;