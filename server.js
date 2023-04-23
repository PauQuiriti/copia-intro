const express = require('express')
const cookieParser = require('cookie-parser');
const cors = require('cors')
const mongoose = require('mongoose')
const routes = require('./routes')
const app = express()
const port = process.env.PORT || 5000
const uri = 'mongodb+srv://paula:ErvAOHTvdSMx4J7B@techtalk.yxwdryb.mongodb.net/?retryWrites=true&w=majority'

const corsOptions = {
  origin: ['https://copia-intro.vercel.app', 'http://localhost:5000'], 
}

app.use(express.static('public'))
app.use(cors(corsOptions));
app.use(express.json());
app.use(cookieParser());
app.use('/api', routes)

mongoose.connect(uri).
then(() => {
  app.listen(port, () => {
    console.log(`Alive and listening on port ${port}`)
  })
})
.catch(error => console.log(error));

