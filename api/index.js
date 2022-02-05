const express = require("express"); // adding express library
const app = express();
const mongoose = require("mongoose"); // adding mongoose library
const dotenv = require("dotenv"); // adding dotenv library
const helmet = require("helmet"); // adding helmet library
const morgan = require("morgan"); // adding morgan library
const userRoute = require("./routes/users");
const authRoute = require("./routes/auth");
const postRoute = require("./routes/posts");
const multer = require("multer");
const conversationRoute = require("./routes/conversations");
const messageRoute = require("./routes/messages");
const path = require("path");


dotenv.config();

mongoose.connect(  //to connect to our mongodb server
    process.env.MONGO_URL,
    { useNewUrlParser: true, useUnifiedTopology: true },
    () => {
      console.log("Connected to MongoDB");
    }
  );

  app.use("/images", express.static(path.join(__dirname, "public/images")));  // "/images" - indicating path and part after that indicates our folder

  const storage = multer.diskStorage({  //storage
    destination: (req, file, cb) => {
      cb(null, "public/images");  
    },
    filename: (req, file, cb) => {
      cb(null, req.body.name);
    },
  });
  
  const upload = multer({ storage: storage });
  app.post("/api/upload", upload.single("file"), (req, res) => { //to upload our file it's gonna takea single file
    try {
      return res.status(200).json("File uploded successfully"); // this will automatically upload our file so we don't have to type any logic in try
    } catch (error) {
      console.error(error);
    }
  });

  //middleware
app.use(express.json()); //express. json() is a method inbuilt in express to recognize the incoming Request Object as a JSON Object.
app.use(helmet());
app.use(morgan("common"));

app.use("/api/auth", authRoute);
app.use("/api/users", userRoute);
app.use("/api/posts", postRoute);
app.use("/api/conversations", conversationRoute);
app.use("/api/messages", messageRoute);

app.listen(8800,()=>{
    console.log("Backend is running");
})