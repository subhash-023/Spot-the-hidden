const express = require('express');
require('dotenv').config()
const cors = require('cors')
const PORT = process.env.EXPRESS_PORT
const app = express()
const prisma = require('./config/prismaConfig')
const apiRouter = require('./routes/apiRouter')

app.use(express.urlencoded({extended: true}));
app.use(express.json())
app.use(
    cors({
      origin: ["https://findit-hek.netlify.app", "http://localhost:5173"],
    })
);

app.use('/level', apiRouter)

app.listen(PORT, () => {
    console.log(`Server started listening on port ${PORT}`)
})
