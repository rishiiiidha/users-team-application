const express = require('express');
const mongoose = require('mongoose');
const connection = require('./db/mongoose');
const userRouter = require('./router/users-router')
const cors = require('cors');
const app = express();
app.use(cors())

connection();
app.use(express.json())
app.use(userRouter)

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send("Something broke!");
});

app.listen(3000,()=>{
    console.log('Server is running on port 3000');
})