import React, { useEffect, useState } from 'react'
import { Button, Modal } from "react-bootstrap"
import axios from 'axios'

const DeleteProduct = ({ productInfo }) => {
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const deleteProduct = (productID) => {
        axios.delete(`http://localhost:3001/delete/${productID}`)
    }

    return (
        <>
            <Button variant="outline-danger" onClick={handleShow}>
                ลบสินค้า
            </Button>

            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>คุณยืนยันที่จะลบสินค้า?</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div>คุณต้องการที่จะลบสินค้า</div>
                    <div style={{ fontWeight: "bold" }}>{productInfo.productName}</div>
                    <div>หรือไม่?</div>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="success" onClick={handleClose}>
                        ยกเลิก
                    </Button>
                    <Button variant="danger" onClick={() => {
                        console.log("กำลังจะลบแล้วนะ");
                        deleteProduct(productInfo.productID)
                        if (!alert(`ลบสินค้า ${productInfo.productName} สำเร็จ`)) {
                            window.location.reload();
                            handleClose();
                        }
                    }
                    }>
                        ลบ
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    )
}

export default DeleteProduct
