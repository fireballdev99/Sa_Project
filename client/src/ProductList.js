import React, { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import Form from "react-bootstrap/Form";
import Card from "react-bootstrap/Card";
import Columns from "react-columns";
import Navbar from './Navbar'
import Axios from "axios";
import { Button } from "react-bootstrap";
import EditProduct from "./EditProduct";
import DeleteProduct from "./DeleteProduct";
import moment from "moment"

const ProductList = () => {
    const [results, setResults] = useState([]);
    const [searchBarcode, setSearchBarcode] = useState("");



    useEffect(() => {
        Axios.get('http://localhost:3001/data').then((response) => {
            setResults(response.data);
        })
    }, []);

    const filterBarcode = results.filter((item) => {
        return searchBarcode !== "" ? item.barcode === searchBarcode : item;
    });

    const searchResults = filterBarcode.map((data, i) => {
        let dateFormat = new Date(data.exp);
        let dateString = moment(dateFormat).format('YYYY-MM-DD');

        return (

            <Card
                key={i}
                bg="light"
                text="dark"
                className="text-center"
                style={{ margin: "10px" }}
            >
                <Card.Img variant="top" src={data.img} />
                <Card.Body>
                    <Card.Text>ชื่อสินค้า: {data.productName}</Card.Text>
                    <Card.Text>ราคา: ฿{data.price}</Card.Text>
                    <Card.Text>หมวดหมู่สินค้า: {data.category}</Card.Text>
                    <Card.Text>วันหมดอายุ: {dateString}</Card.Text>
                    <Card.Text>จำนวนคงเหลือ: {data.amount}</Card.Text>
                    <EditProduct productInfo={data} />{' '}
                    <DeleteProduct productInfo={data} />{' '}

                </Card.Body>
            </Card>
        );
    });

    return (
        <div>
            <Navbar />
            <Form>
                <Form.Group controlId="formGroupSearch">
                    <Form.Control
                        autoFocus
                        type="text"
                        placeholder="Search barcode"
                        onChange={(e) => setSearchBarcode(e.target.value)}
                    />
                </Form.Group>
            </Form>
            <br />
            <Columns columns="4">{searchResults}</Columns>
        </div>
    );
}

export default ProductList
