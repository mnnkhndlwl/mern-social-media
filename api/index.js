const express = require("express"); // adding express library
const app = express();
const mongoose = require("mongoose"); // adding mongoose library
const dotenv = require("dotenv"); // adding dotenv library
const helmet = require("helmet"); // adding helmet library
const morgan = require("morgan"); // adding morgan library
const userRoute = require("./routes/users");
const authRoute = require("./routes/auth");
const postRoute = require("./routes/posts");

dotenv.config();

mongoose.connect(  //to connect to our mongodb server
    process.env.MONGO_URL,
    { useNewUrlParser: true, useUnifiedTopology: true },
    () => {
      console.log("Connected to MongoDB");
    }
  );

  //middleware
app.use(express.json()); //express. json() is a method inbuilt in express to recognize the incoming Request Object as a JSON Object.
app.use(helmet());
app.use(morgan("common"));

app.use("/api/auth", authRoute);
app.use("/api/users", userRoute);
app.use("/api/posts", postRoute);

app.listen(8800,()=>{
    console.log("Backend is running");
})