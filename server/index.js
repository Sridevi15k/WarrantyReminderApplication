const express = require("express");
const app = express();
const mongoose = require("mongoose");
mongoose.connect("mongodb://localhost/test");
const db = mongoose.connection;
const cors = require("cors");
// const pool = require("./db");
app.use(cors()); //implements the cors package middleware
app.use(express.json()); //You have to use this to get the body through your requests, otherwise it won't be available
const firebase = require("firebase").firestore;
console.log("Firebase module:", firebase);
const port = 3000;
let db_status = "MongoDB connection not successful.";

db.on("error", console.error.bind(console, "connection error:"));
db.once("open", () => (db_status = "Successfully opened connection to Mongo!"));

app.get("/", (req, res) => {
  res.send(db_status);
});

app.listen(port, () => console.log(`Example app listening on port ${port}!`));


app.route("/api/getfirebase").get((req, res) => {
  // // select a collection
  const coll = firebase.collection("Users");
  // coll
  //   .doc("VGEcuxD9XYmO1m7EbZmD")
  //   .get()
  //   .then(documentSnapshot => console.log(documentSnapshot.data()));
  res.status(200).send("In Firebase");
});

// app.route("/api/getPosts").get((req, res) => {
//   pool.query("SELECT * FROM posts", (err, posts) => {
//     if (err) {
//       console.log(err);
//       //send the SQL error if something goes wrong
//       res.status(500).json({ err });
//     } else {
//       res.status(200).send({ posts: posts.rows });
//     }
//   });
// });
// app.listen(8675, () => console.log("Listening on port 8675")); //starts the server so you can hit your API's

//const morgan = require("morgan");
//const bodyParser = require("body-parser");
//const posts = require("./routers/posts");
//const authors = require("./routers/authors");

//app.listen(4040, () => console.log("Listening on port 4040"));

// app
//   .route("/")
//   .get((request, response) => {
//     response.json({ message: "HELLO WORLD" });
//   })
//   .post((request, response) => {
//     response.json(request.body);
//   });
// const logging = (request, response, next) => {
//   console.log(`${request.method} ${request.url} ${Date.now()}`);
//   next();
// };

// app
//   .use(bodyParser.json())
//   .use(morgan("dev"))
//   .use("posts", posts)
//   .use("/authors", authors);
