import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

const ChangeExept = ({show, onHide}) => {
    
    return (
    <Modal
        className='modal-brand-type'
        show={show}
        onHide={onHide}
    >
        <Modal.Header closeButton>
            <Modal.Title id="contained-modal-title-vcenter ">
                Login not exist
            </Modal.Title>
        </Modal.Header>
        <Modal.Body>
            Enter correct login
        </Modal.Body>
        <Modal.Footer>
            <Button variant={'outline-danger'} onClick={onHide}>Ok</Button>
        </Modal.Footer>
    </Modal>
  );
};

export default ChangeExept;