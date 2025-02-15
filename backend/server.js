const express = require('express')
const app = express()
const port = 3000
const dotenv = require('dotenv')
const connectDB = require('./db/database')
const cors = require('cors');
const flashcardRoutes = require('./routes/flashcardRoutes.route')

dotenv.config()
app.use(cors());
app.use(express.json());
connectDB()

app.use('/flashcards', flashcardRoutes);

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.listen(process.env.PORT, () => {
  console.log(`Example app listening on port ${port}`)
})