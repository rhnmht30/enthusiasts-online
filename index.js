const path = require("path");
const expressEdge = require("express-edge");
const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const fileUpload = require("express-fileupload");
const expressSession = require("express-session");
const connectMongo = require("connect-mongo");
const connectFlash = require("connect-flash");
const edge = require("edge.js");

//MVC
const createPostController = require("./controllers/createPost");
const homePageController = require("./controllers/homePage");
const storePostController = require("./controllers/storePost");
const getPostController = require("./controllers/getPost");
const createUserController = require("./controllers/createUser");
const storeUserController = require("./controllers/storeUser");
const loginController = require("./controllers/login");
const loginUserController = require("./controllers/loginUser");
const logoutController = require("./controllers/logout");
const redirectController = require("./controllers/redirect");

require("dotenv").config();

const port = process.env.PORT || 5000;
const app = new express();

// mongodb://<dbuser>:<dbpassword>@ds213705.mlab.com:13705/node-blog
// "mongodb://localhost:27017/node-blog"

//database connect
var url = process.env.MONGO_URL;
mongoose
  .connect(
    url,
    {
      useNewUrlParser: true
    }
  )
  .then(() => "You are now connected to Mongo!")
  .catch(err => console.error("Something went wrong", err));

const mongoStore = connectMongo(expressSession);
app.use(
  expressSession({
    secret: "secret",
    store: new mongoStore({
      mongooseConnection: mongoose.connection
    })
  })
);

// setting up public directory
// /vendor/bootstrap/css/bootstrap.min.css
app.use(express.static(__dirname + "/public"));
// app.use(express.static("public"));
// app.use("/public", express.static(__dirname + "/public"));
app.use(expressEdge);
// `${__dirname}/views`
app.set("views", __dirname + "/views");

app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: true
  })
);

app.use(fileUpload());

app.use(connectFlash());

// to show app.egde if user is loggedIn
app.use("*", (req, res, next) => {
  edge.global("auth", req.session.userId);
  next();
});
//Middlewares for validations
const storePost = require("./middleware/storePost");
app.use("/posts/store", storePost);
const auth = require("./middleware/auth");
const redirectIfAuthenticated = require("./middleware/redirectIfAuthenticated");

//ROUTES
//homepage
// app.get("/", (req, res) => {
//   res.sendFile(path.resolve(__dirname, "public/index.html"));
// });

app.get("/", homePageController);
app.get("/post/new", auth, createPostController);
app.get("/post/:id", getPostController);
app.get("/auth/register", auth, createUserController);
app.get("/auth/login", redirectIfAuthenticated, loginController);
app.get("/auth/logout", logoutController);
app.get("/redirect", redirectController);
app.post("/posts/store", storePostController);
app.post("/users/register", auth, storeUserController);
app.post("/users/login", redirectIfAuthenticated, loginUserController);

// //aboutPage
// app.get("/about", (req, res) => {x
//   res.sendFile(path.resolve(__dirname, "public/about.html"));
// });

// //contactPage
// app.get("/contact", (req, res) => {
//   res.sendFile(path.resolve(__dirname, "public/contact.html"));
// });

// //postPage
// app.get("/post", (req, res) => {
//   res.sendFile(path.resolve(__dirname, "public/post.html"));
// });

//setting up PORT and HOST
app.listen(port, () => {
  //   console.log(app.use(express.static(__dirname + "/public")));
  console.log("App listening at PORT " + port);
});
