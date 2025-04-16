const express = require('express');
require('dotenv').config()
const PORT = process.env.EXPRESS_PORT
const app = express()
const prisma = require('./config/prismaConfig')
const apiRouter = require('./routes/apiRouter')

app.use(express.urlencoded({extended: true}));
app.use(express.json())

app.get('/',async (req, res) => {
    const level = await prisma.leaderboard.findMany()
    console.log(level)
    res.send("Success", level)
})

app.use('/level', apiRouter)

app.listen(PORT, () => {
    console.log(`Server started listening on port ${PORT}`)
})
