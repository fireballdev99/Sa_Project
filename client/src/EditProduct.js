import React, { useState, useEffect } from 'react'
import { Button, Form, Modal, Col, Row } from "react-bootstrap"
import axios from 'axios'
import moment from 'moment'
import ConfirmEdit from './ConfirmEdit'


const EditProduct = ({ productInfo }) => {
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const [product, setProduct] = useState([]);
    const [barcode, setBarcode] = useState("");
    const [productName, setProductName] = useState("");
    const [category, setcategory] = useState("");
    const [costprice, setCostprice] = useState(0);
    const [price, setPrice] = useState(0);
    const [img, setImg] = useState("");
    const [amount, setAmount] = useState(0);
    const [exp, setExp] = useState("");

    let dateFormat = new Date(productInfo.exp);
    let dateString = moment(dateFormat).format('YYYY-MM-DD');



    const handleSet = {
        productID: productInfo.productID,
        productName: productInfo.productName,
        price: price
    }




    return (
        <>
            <Button variant="outline-warning" onClick={handleShow}>
                แก้ไขสินค้า
            </Button>

            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>แก้ไขสินค้า</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Form.Group className="mb-3" controlId="barcode">
                            <Form.Label>Barcode</Form.Label>
                            <Form.Control name="barcode" readOnly value={productInfo.barcode} onChange={e => setBarcode(e.target.value)} />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="productName">
                            <Form.Label>ชื่อสินค้า</Form.Label>
                            <Form.Control name="productName" readOnly value={productInfo.productName} onChange={e => setProductName(e.target.value)} />
                        </Form.Group>
                        <Row className="mb-3">
                            <Form.Group as={Col} controlId="category">
                                <Form.Label>หมวดหมู่สินค้า</Form.Label>
                                <select style={{ padding: "8px", borderRadius: "4px" }} name="category" onChange={e => setcategory(e.target.value)}>
                                    <option >{productInfo.category}</option>
                                    <option value="1">ยารักษาโรค</option>
                                    <option value="2">อาหารเสริม</option>
                                    <option value="3">ความงาม</option>
                                    <option value="4">อื่นๆ</option>
                                </select>
                                {/* <Form.Control name="category" onChange={e => setcategory(e.target.value)} /> */}
                            </Form.Group>
                            <Form.Group as={Col} controlId="costprice">
                                <Form.Label>ราคาทุน</Form.Label>
                                <Form.Control name="costprice" readOnly value={productInfo.costprice} onChange={e => setCostprice(e.target.value)} />
                            </Form.Group>
                            <Form.Group as={Col} controlId="price">
                                <Form.Label>ราคาขาย</Form.Label>
                                <Form.Control name="price" placeholder={productInfo.price} onChange={e => setPrice(e.target.value)} />
                            </Form.Group>
                        </Row>
                        <Row className="mb-3">
                            <Form.Group as={Col} controlId="category">
                                <Form.Label>จำนวนสินค้า</Form.Label>
                                <Form.Control name="amount" readOnly value={productInfo.amount} onChange={e => setAmount(e.target.value)} />
                            </Form.Group>
                            <Form.Group as={Col} controlId="costprice">
                                <Form.Label>วันหมดอายุ</Form.Label>
                                <Form.Control name="exp" readOnly value={dateString} onChange={e => setExp(e.target.value)} />
                            </Form.Group>

                        </Row>
                        <Form.Group className="mb-3" controlId="barcode">
                            <Form.Label>รูปภาพ</Form.Label>
                            <Form.Control name="img" readOnly value={productInfo.img} onChange={e => setImg(e.target.value)} />
                        </Form.Group>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        ปิด
                    </Button>
                    <ConfirmEdit handleSet={handleSet} />
                </Modal.Footer>
            </Modal>
        </>
    )
}


export default EditProduct

