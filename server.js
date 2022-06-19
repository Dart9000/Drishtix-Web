require("dotenv").config();
const express = require('express');
const { notFound, errorHandler } = require("./middleware/errorMiddleware");
const userRoutes =require("./routes/userRoutes");
const app = express()
const cors=require("cors");
const mongoose=require("mongoose");


app.use(express.json());
app.use(cors());


// database connection 

mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
        console.log("CONNECTION OPEN!!!")
    })
    .catch(err => {
        console.log("OH NO ERROR!!!!")
        console.log(err)
    }) 



app.use("/api/user", userRoutes);

app.get('/', (req, res) => res.send('Hello World!'))


app.use(notFound);
app.use(errorHandler);
const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Example app listening on port ${port}!`))

// register 