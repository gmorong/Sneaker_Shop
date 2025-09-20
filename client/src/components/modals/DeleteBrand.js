import { Form } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { Dropdown } from 'react-bootstrap';
import { useContext, useEffect } from 'react';
import { Context } from '../../index';
import { deleteBrand, fetchBrands } from '../../http/goodsAPI';
import { observer } from 'mobx-react-lite';

const DeleteBrand = ({show, onHide}) => {

    const {goods} = useContext(Context)
  
    useEffect(() => {
        fetchBrands().then(data => goods.setBrand(data))
    }, [])

    const delBrand = () => {
        deleteBrand(goods._selectedBrand.name).then(data => {
            goods.setSelectedbrand('')
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
                Delete Brand
            </Modal.Title>
        </Modal.Header>
        <Modal.Body>
            <Form >
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
            </Form>
        </Modal.Body>
        <Modal.Footer>
            <Button variant={'outline-danger'} onClick={onHide}>Close</Button>
            <Button variant={'outline-success'} onClick={delBrand}>Delete</Button>
        </Modal.Footer>
    </Modal>
  );
};

export default observer (DeleteBrand);