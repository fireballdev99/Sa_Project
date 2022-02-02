import React, { useEffect, useState } from "react";
import { Row, Container, Col, Table, Button, Card, Form } from 'react-bootstrap'
import Columns from "react-columns";
import Axios from 'axios'
import Navbar from './Navbar'
import moment from 'moment'

const SalePage = () => {
    //State for Items
    const [items, setItems] = useState([]);
    const [searchBarcode, setSearchBarcode] = useState("");
    const [totalPrice, setTotalPrice] = useState(0)
    const [money, setMoney] = useState(0);
    const [change, setChange] = useState(0)
    const [message, setMessage] = useState("")
    const [ifError, setIfError] = useState(false);

    //State for Report
    const [report, setReport] = useState([]);

    const date = new Date();
    let dateString = moment(date).format('YYYY-MM-DD');


    const updateStock = () => {
        items.map((item) => {
            Axios.put("http://localhost:3001/update", { amount: item.amount, productID: item.productID })
            const newReport = [{
                productID: item.productID,
                productName: item.productName,
                amount: item.qty,
                date: dateString,
                profit: (item.price * item.qty) - (item.costprice * item.qty)
            }]
            setReport(...report, newReport)
        })

    }



    const createReport = () => {
        items.map((item) => {
            Axios.post('http://localhost:3001/createreport', {
                productID: item.productID,
                productName: item.productName,
                date: dateString,
                amount: item.qty,
                profit: item.profit
            }).then(res => {
                console.log(res);
                console.log(res.data);
            })
        })

    }



    const getData = () => {
        Axios.post('http://localhost:3001/products', { barcode: searchBarcode }).then((response) => {
            setItems([...items, { ...response.data, qty: 1, profit: 0, date: dateString }])

        })
    }

    const handleKeyPress = (e) => {
        if (e.key === 'Enter') {
            getData()
            const foundItem = items.includes(searchBarcode)
            setSearchBarcode("")
            if (foundItem) return
        }
    }

    const handleChange = (e) => {
        if (e.key === "Enter") {
            if (money < totalPrice) {
                setIfError(false)
                setMessage("รับเงินไม่เพียงพอ")
            } else {
                setIfError(true)
                setChange(money - totalPrice)
            }
        }
    }

    const deleteItem = (id) => {
        const newItems = items.filter(value => {
            return value.productID !== id
        })
        setItems([...newItems])
        setChange(0)
        setIfError(false)
    }

    useEffect(() => {
        const totalPrice = items.reduce((previousValue, currentValue) => {
            if (previousValue === 0) {
                return currentValue.qty * currentValue.price
            }
            return previousValue + (currentValue.qty * currentValue.price)

        }, 0)
        setTotalPrice(totalPrice);
    });
    return (
        <div>
            <Navbar />
            <Container>
                <Row>
                    <Col sm={8}>
                        <input
                            type="text"
                            placeholder="Search barcode"
                            value={searchBarcode}
                            onChange={(e) => setSearchBarcode(e.target.value)}
                            onKeyDown={handleKeyPress}
                        />
                        <Table striped bordered hover>
                            <thead>
                                <tr>
                                    <th>#</th>
                                    <th>ชื่อสินค้า</th>
                                    <th>จำนวน</th>
                                    <th>ราคา</th>
                                </tr>
                            </thead>
                            <tbody>
                                {items.map(item => {
                                    return (
                                        <tr key={item.productID}>
                                            <td>  <Button onClick={() => { deleteItem(item.productID) }} variant="outline-danger">x</Button></td>
                                            <td>{item.productName}</td>
                                            <td><input onChange={(e) => {
                                                const newItems = items.map(newItem => {
                                                    if (newItem.productID === item.productID) {
                                                        newItem.qty = e.target.value
                                                        newItem.amount = newItem.amount - newItem.qty
                                                        newItem.profit = (newItem.price * newItem.qty) - (newItem.costprice * newItem.qty)
                                                        return newItem
                                                    }
                                                    return newItem
                                                })
                                                setItems([...newItems])
                                            }} type="text" value={item.qty} /></td>
                                            <td>{item.price}</td>
                                        </tr>
                                    )
                                })}
                            </tbody>
                        </Table>
                    </Col>
                    <Col sm={4}>
                        <div>ราคาสุทธิ : {totalPrice}</div>
                        <div>
                            รับเงิน
                            <input onChange={e => setMoney(e.target.value)} onKeyPress={handleChange} />
                        </div>
                        {ifError ? <div><div>เงินทอน : {change}</div><Button onClick={() => {
                            updateStock();
                            createReport();
                            if (!alert(`ทำรายการเสร็จสิ้น!`)) {
                                window.location.reload();
                            }
                        }} variant="outline-success">เสร็จสิ้น</Button></div> : <div>{message}</div>}
                    </Col>
                </Row>
            </Container>

        </div >
    )
}

export default SalePage
