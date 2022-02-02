import Axios from 'axios'
import React, { useState, useEffect } from 'react'
import { Button, Table, Badge, Container } from 'react-bootstrap'
import Navbar from './Navbar'
import moment from 'moment'



const Report = () => {
    const [data, setData] = useState([])
    const [amount, setAmount] = useState([])
    const [profit, setProfit] = useState([])




    const setTotalProfit = () => {
        const total = data.reduce((previousValue, currentValue) => {
            if (previousValue === 0) {
                return currentValue.profit
            }
            return previousValue + currentValue.profit
        }, 0)
        setProfit(total)
    }

    const setTotalAmount = () => {
        const total = data.reduce((previousValue, currentValue) => {
            if (previousValue === 0) {
                return currentValue.amount
            }
            return previousValue + currentValue.amount
        }, 0)
        setAmount(total)
    }

    useEffect(() => {
        Axios.get('http://localhost:3001/getreport').then((response) => {
            const data = response.data
            setData(data)
            setTotalAmount()
            setTotalProfit()
        })


    }, [amount])


    return (
        <div>
            <Navbar />
            <Container>
                <h1>
                    <Button variant="info" >
                        ยอดขาย <Badge bg="secondary">{amount}</Badge>
                        <span className="visually-hidden"></span>
                    </Button>
                    {"  "}
                    <Button variant="success" >
                        กำไรรวม <Badge bg="secondary">{profit}</Badge>
                        <span className="visually-hidden"></span>
                    </Button>
                </h1>


                <Table striped bordered hover size="sm">
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>วันที่</th>
                            <th>ชื่อสินค้า</th>
                            <th>จำนวน</th>
                            <th>กำไร</th>
                        </tr>
                    </thead>
                    <tbody>
                        {data.map(item => {

                            let dateFormat = new Date(item.date);
                            let dateString = moment(dateFormat).format('YYYY-MM-DD');




                            return (
                                <tr key={item.orderID}>
                                    <td>{item.orderID}</td>
                                    <td>{dateString}</td>
                                    <td>{item.productName}</td>
                                    <td>{item.amount}</td>
                                    <td>{item.profit}</td>


                                </tr>
                            )
                        })}

                    </tbody>
                </Table>
            </Container>

        </div>
    )
}

export default Report
