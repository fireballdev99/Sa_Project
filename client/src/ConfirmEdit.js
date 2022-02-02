import Axios from 'axios';
import React, { useState } from 'react'
import { Button, Modal } from "react-bootstrap"

const ConfirmEdit = ({ handleSet }) => {
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const updateDb = () => {
        Axios.put("http://localhost:3001/updateprice", { price: handleSet.price, productID: handleSet.productID })
        handleClose()
        if (!alert(`แก้ไข ${handleSet.productName} สำเร็จ`)) { window.location.reload(); }
    }

    return (
        <>
            <Button variant="primary" onClick={handleShow}>
                ตกลง
            </Button>

            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>ยืนยันที่จะแก้ไข?</Modal.Title>
                </Modal.Header>
                <Modal.Body>ยืนยันที่จะแก้ไขสินค้า {handleSet.productName}  หรือไม่?</Modal.Body>
                <Modal.Footer>
                    <Button variant="danger" onClick={handleClose}>
                        ยกเลิก
                    </Button>
                    <Button variant="success" onClick={updateDb}>
                        ยืนยัน
                    </Button>

                </Modal.Footer>
            </Modal>
        </>
    )
}

export default ConfirmEdit
