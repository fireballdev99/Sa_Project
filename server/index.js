const express = require('express');
const mysql = require('mysql');
const cors = require('cors');

const bcrypt = require('bcrypt');
const e = require('express');
const slatRounds = 10


const app = express();
app.use(express.json())
app.use(cors())

//Connect DB
const db = mysql.createConnection({
    user: "root",
    host: "localhost",
    password: "",
    database: "pos"
}, console.log("connect to db pos!"))


//Get Data
app.get('/data', (req, res) => {
    db.query("SELECT * FROM product", (err, result) => {
        if (err) {
            console.log(err);
        } else {
            res.send(result)
        }
    })
})
//INSERT DATA
app.post('/addproduct', (req, res) => {
    const productName = req.body.productName;
    const amount = req.body.amount;
    const costprice = req.body.costprice;
    const price = req.body.price;
    const exp = req.body.exp;
    const barcode = req.body.barcode;
    const img = req.body.img;
    const category = req.body.category;

    db.query("INSERT INTO product (productName,amount,costprice,price,exp,barcode,img,category) VALUES (?,?,?,?,?,?,?,?) ",
        [productName, amount, costprice, price, exp, barcode, img, category],
        (err, result) => {
            if (err) {
                console.log(err);
            } else {
                res.send("Product Added")
                console.log("Product Added");
            }
        }
    )
})

//Search Barcode
app.post('/products', (req, res) => {
    const barcode = req.body.barcode;

    db.query("SELECT * FROM product WHERE barcode=?", barcode, (err, result) => {
        if (err) {
            console.log("cannot find products");
        } else {
            res.json(JSON.parse(JSON.stringify(result[0])))
            console.log(JSON.parse(JSON.stringify(result[0])));
        }
    })
})

//Delete Product
app.delete('/delete/:productID', (req, res) => {
    const productID = req.params.productID;
    db.query("DELETE FROM product WHERE productID=?", productID, (err, result) => {
        if (err) {
            console.log(err);
        } else {
            res.send(result)
        }
    })
})

//Update
app.put('/update', (req, res) => {
    const productID = req.body.productID
    const amount = req.body.amount

    db.query("UPDATE product SET amount = ? WHERE productID=?", [amount, productID], (err, result) => {
        if (err) {
            console.log(err);
        } else {
            console.log(result);
        }
    })
})

//Update price
app.put('/updateprice', (req, res) => {
    const productID = req.body.productID
    const price = req.body.price

    db.query("UPDATE product SET price = ? WHERE productID=?", [price, productID], (err, result) => {
        if (err) {
            console.log(err);
        } else {
            console.log(result);
        }
    })
})


//Create Report
app.post('/createreport', (req, res) => {
    const productID = req.body.productID
    const productName = req.body.productName;
    const date = req.body.date
    const amount = req.body.amount;
    const profit = req.body.profit;




    db.query("INSERT INTO report (productID,productName,date,amount,profit) VALUES (?,?,?,?,?) ",
        [productID, productName, date, amount, profit],
        (err, result) => {
            if (err) {
                console.log(err);
            } else {
                res.send("Report Created")
                console.log("Report Created");
            }
        }
    )
})

//Get Data from report
app.get('/getreport', (req, res) => {
    db.query("SELECT * FROM report", (err, result) => {
        if (err) {
            console.log(err);
        } else {
            res.send(result)
        }
    })
})


//TEST PUT
// app.put('/update', (req, res) => {
//     const id = req.body.id;
//     const tid = req.body.tid;
//     db.query("UPDATE students SET tid = ? WHERE id = ? ", [tid, id], (err, result) => {
//         if (err) {
//             console.log(err);
//         } else {
//             res.send(result)
//         }
//     })
// })


// TEST GET
// app.get('/students', (req, res) => {
//     db.query("SELECT s.id,s.stuid,s.title AS stitle,s.name AS sname,s.email AS semail,s.faculty,s.subject,s.degree,t.tid,t.title AS ttitle,t.name AS tname FROM students s LEFT JOIN teachers t USING (tid);", (err, result) => {
//         if (err) {
//             console.log(err);
//         } else {
//             res.send(result);
//         }
//     })
// });

//Login
// app.post('/login', (req, res) => {
//     const username = req.body.username
//     const password = req.body.password

//     db.query(
//         "SELECT * FROM userdata WHERE username=?",
//         [username, password],
//         (err, result) => {
//             if (err) {
//                 console.log(err);
//             }
//             if (result.length > 0) {
//                 bcrypt.compare(password, result[0].password, (err, response) => {
//                     if (response) {
//                         res.send(result);
//                         console.log(result);

//                     } else {
//                         res.send({ message: "Wrong username or password" })
//                     }
//                 })
//             } else {
//                 res.send({ message: "User does not exist" })
//             }
//         }
//     );
// });


//GET Student Infomation
// app.post('/student_info', (req, res) => {
//     const stuid = req.body.stuid
//     db.query("SELECT s.stuid AS stuid , s.title AS title, s.firstname AS firstname , s.lastname AS lastname,s.gender AS gender, s.faculty AS faculty , s.major AS major , s.degree AS degree , s.email AS email ,t.title AS ttitle , t.firstname AS tfirstname , t.lastname AS tlastname,t.gender AS tgender ,t.faculty AS tfaculty , t.major AS tmajor , t.degree AS tdegree , t.email AS temail FROM studentinfo s LEFT JOIN teacherinfo t USING (tid) WHERE stuid=?",
//         [stuid],
//         (err, result) => {
//             if (err) {
//                 console.log(err);
//             }
//             if (result) {
//                 res.send(result)
//                 console.log(result);
//             } else {
//                 res.send({ message: "Error cannot get data" })
//             }

//         })
// })

//GET Teacher Infomation
// app.post('/teacher', (req, res) => {
//     const tid = req.body.tid
//     db.query("SELECT  * FROM teacherinfo WHERE tid=?",
//         [tid],
//         (err, result) => {
//             if (err) {
//                 console.log(err);
//             } else {
//                 res.send(result)
//                 console.log(result);
//             }
//         })
// })
















//TESTget Teacher
// app.get('/teachers', (req, res) => {
//     db.query("SELECT tid,title,name FROM teachers", (err, result) => {
//         if (err) {
//             console.log(err);
//         } else {
//             res.send(result);
//         }
//     })
// });


// Port
app.listen(3001, () => console.log('Running on 3001'))
