const express = require("express");
const app = express();
const mongoose = require("mongoose");
mongoose.connect("mongodb://localhost/test");
const bodyParser = require("body-parser");
const db = mongoose.connection;
const cors = require("cors");
// const pool = require("./db");
app.use(cors()); //implements the cors package middleware
app.use(express.json()); //You have to use this to get the body through your requests, otherwise it won't be available
app.use(bodyParser.json());
const port = process.env.PORT || 3000;

let db_status = "MongoDB connection not successful.";

db.on("error", console.error.bind(console, "connection error:"));
db.once("open", () => (db_status = "Successfully opened connection to Mongo!"));

const productSchema = new mongoose.Schema({
  uid: String,
  manufacturer: String,
  productName: String,
  modelNo: String,
  dateOfPurchase: Date,
  expiryDate: Date,
  photo: String,
  createDateTime: { type: Date, default: Date.now() }
});

const Product = mongoose.model("Product", productSchema);

app.get("/", (req, res) => {
  res.send(db_status);
});

// Code for adding new product to warranty catalog
app.post("/products", (req, res) => {
  const newProduct = new Product(req.body);
  newProduct.save((err, product) => {
    return err ? res.sendStatus(500).json(err) : res.json(product);
  });
});

// Code for adding new product to warranty catalog
app.get("/products/:uid", (req, res) => {
  var query = Product.find({ uid: req.params.uid });
  query.exec(function(err, products) {
    return err ? res.sendStatus(500).json(err) : res.json(products);
  });
});

var nodemailer = require('nodemailer');

var transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: '',
    pass: ''
  }
});

var mailOptions = {
  from: '',
  to: '',
  subject: 'Sending Email using Node.js',
  text: 'That was easy!'
};

function checkAndSendMail() {
  transporter.sendMail(mailOptions, function(error, info){
    if (error) {
      console.log(error);
    } else {
      console.log('Email sent: ' + info.response);
    }
  });
}


var cron = require('node-cron');

cron.schedule('* * * * *', () => {
  console.log('running a task every minute');
  // checkAndSendMail();
});

app.listen(port, () => console.log(`Example app listening on port ${port}!`));

