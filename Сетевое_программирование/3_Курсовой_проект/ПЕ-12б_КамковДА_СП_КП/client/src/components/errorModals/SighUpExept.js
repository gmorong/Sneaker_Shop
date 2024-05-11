import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

const SighUpExept = ({show, onHide}) => {
    
    return (
    <Modal
        className='modal-brand-type'
        show={show}
        onHide={onHide}
    >
        <Modal.Header closeButton>
            <Modal.Title id="contained-modal-title-vcenter ">
                This login already exists
            </Modal.Title>
        </Modal.Header>
        <Modal.Body>
            Come up with a new one
        </Modal.Body>
        <Modal.Footer>
            <Button variant={'outline-danger'} onClick={onHide}>Ok</Button>
        </Modal.Footer>
    </Modal>
  );
};

export default SighUpExept;