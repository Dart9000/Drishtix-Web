require("dotenv").config();
const express = require('express');
const { notFound, errorHandler } = require("./middleware/errorMiddleware");
const app = express()
const cors=require("cors");
const mongoose=require("mongoose");
const cookieParser = require("cookie-parser");
const {protect} = require("./middleware/authMiddleware");
const criminalRoutes =require("./routes/criminalRoutes");

const port = process.env.PORT || 3002;

const userRoutes =require("./routes/userRoutes");

app.use(express.json());
app.use(cors({
    origin: 'http://localhost:3000',
    optionsSuccessStatus: 200,
    credentials: true
  }
));
app.use(cookieParser());


// database connection

mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
        console.log("CONNECTION OPEN!!!")
    })
    .catch(err => {
        console.log("OH NO ERROR!!!!")
        console.log(err)
    })



app.use("/", userRoutes);
app.use("/criminal",criminalRoutes);

// app.get('/', protect, (req, res) => res.send('Hello World!'))


app.use(notFound);
app.use(errorHandler);

app.listen(port, () => console.log(`Example app listening on port ${port}!`))

// register
