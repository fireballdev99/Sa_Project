import React from 'react'
import AddProduct from './AddProduct'
import { Link } from 'react-router-dom'
import { Button } from "react-bootstrap"
function Navbar() {
    return (
        <div>
            <div
                style={{
                    backgroundColor: "#fccb58",
                    height: "90px",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                }}
            >
                <h2>Wachirawit Rx</h2>
            </div>
            <div style={{ backgroundColor: "#fccb58", height: "5px" }}></div>
            <br />
            <div
                style={{
                    backgroundColor: "#e5e6e7",
                    height: "90px",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                }}
            >
                {/* Add Button Here */}
                <div>
                    <Link to="/">
                        <Button variant="primary">หน้าแรก</Button>
                    </Link>
                    {' '}
                    <Link to="/productlist">
                        <Button variant="info">รายการสินค้า</Button>
                    </Link>
                    {' '}
                    <AddProduct />
                    {' '}
                    <Link to="/report">
                        <Button variant="warning">รายงานการขาย</Button>
                    </Link>
                    {' '}
                </div>
            </div>
            <br />
        </div>
    )
}

export default Navbar
