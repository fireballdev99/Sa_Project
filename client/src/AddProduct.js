import React, { useState } from 'react'
import { Button, Form, Modal, Col, Row } from "react-bootstrap"
import axios from 'axios'



const AddProduct = () => {
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const [barcode, setBarcode] = useState("");
    const [productName, setProductName] = useState("");
    const [category, setcategory] = useState("");
    const [costprice, setCostprice] = useState(0);
    const [price, setPrice] = useState(0);
    const [img, setImg] = useState("");
    const [amount, setAmount] = useState(0);
    const [exp, setExp] = useState("");




    const handleSet = () => {
        axios.post('http://localhost:3001/addproduct', {
            productName: productName,
            amount: amount,
            costprice: costprice,
            price: price,
            barcode: barcode,
            exp: exp,
            img: img,
            category: category,
        })
            .then(res => {
                console.log(res);
                console.log(res.data);
            })
        handleClose()
    }

    return (
        <>
            <Button variant="success" onClick={handleShow}>
                เพิ่มสินค้า
            </Button>

            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>เพิ่มสินค้า</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Form.Group className="mb-3" controlId="barcode">
                            <Form.Label>Barcode</Form.Label>
                            <Form.Control name="barcode" onChange={e => setBarcode(e.target.value)} />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="productName">
                            <Form.Label>ชื่อสินค้า</Form.Label>
                            <Form.Control name="productName" onChange={e => setProductName(e.target.value)} />
                        </Form.Group>
                        <Row className="mb-3">
                            <Form.Group as={Col} controlId="category">
                                <Form.Label>หมวดหมู่สินค้า</Form.Label>
                                <select style={{ padding: "8px", borderRadius: "4px" }} name="category" onChange={e => setcategory(e.target.value)}>
                                    <option>เลือกหมวดหมู่</option>
                                    <option value="1">ยารักษาโรค</option>
                                    <option value="2">อาหารเสริม</option>
                                    <option value="3">ความงาม</option>
                                    <option value="4">อื่นๆ</option>
                                </select>
                                {/* <Form.Control name="category" onChange={e => setcategory(e.target.value)} /> */}
                            </Form.Group>
                            <Form.Group as={Col} controlId="costprice">
                                <Form.Label>ราคาทุน</Form.Label>
                                <Form.Control name="costprice" onChange={e => setCostprice(e.target.value)} />
                            </Form.Group>
                            <Form.Group as={Col} controlId="price">
                                <Form.Label>ราคาขาย</Form.Label>
                                <Form.Control name="price" onChange={e => setPrice(e.target.value)} />
                            </Form.Group>
                        </Row>
                        <Row className="mb-3">
                            <Form.Group as={Col} controlId="category">
                                <Form.Label>จำนวนสินค้า</Form.Label>
                                <Form.Control name="amount" onChange={e => setAmount(e.target.value)} />
                            </Form.Group>
                            <Form.Group as={Col} controlId="costprice">
                                <Form.Label>วันหมดอายุ</Form.Label>
                                <Form.Control name="exp" onChange={e => setExp(e.target.value)} />
                            </Form.Group>

                        </Row>
                        <Form.Group className="mb-3" controlId="barcode">
                            <Form.Label>รูปภาพ</Form.Label>
                            <Form.Control name="img" onChange={e => setImg(e.target.value)} />
                        </Form.Group>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        ปิด
                    </Button>
                    <Button variant="primary" onClick={() => {
                        handleSet();
                        if (!alert(`เพิ่มสินค้า ${productName} สำเร็จ`)) { window.location.reload(); }
                    }}>
                        ตกลง
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    )
}


export default AddProduct
