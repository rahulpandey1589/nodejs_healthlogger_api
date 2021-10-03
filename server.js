const express = require("express");
const dotenv = require('dotenv');
const morgan = require("morgan");
const connectDB = require("./config/db");
const cors  = require('cors');

dotenv.config({ path: "./config/config.env" });

connectDB();

const auth_route = require('./routes/auth-route');
const user_route = require('./routes/user-route');
const category_route = require('./routes/category-route');

const errorHandler = require("./middleware/error");

// USING express
const app = express();
app.use(express.json());

// configuring CORS options
var corsOptions ={
  origin:'http://localhost:3000',
  optionsSuccessStatus:200
}

app.use(cors(corsOptions));

if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}

app.use("/api/v1/auth",auth_route);
app.use("/api/v1/users",user_route);
app.use("/api/v1/masters/category",category_route);


app.use(errorHandler);

const PORT = process.env.PORT || 5000;

const server = app.listen(
  PORT,
  console.log(`server is running on port ${PORT}`)
);

// handle unhandled rejection

process.on("unhandledRejection", (err, promise) => {
  console.log(`Unhandled rejection: ${err.message}`);
  //close server and exit process
  server.close(() => process.exit(1));
});