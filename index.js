const express = require('express')
const app = express()
const razorpay=require('razorpay')
require('dotenv').config()
const cors=require('cors')
app.use(cors())
app.use(express.json())
const cookieParser=require('cookie-parser')
app.use(cookieParser())
const connectDB=require('./database/db')


const authRoutes=require('./routes/auth')
const categoryRoutes=require('./routes/category')
const equipmentRoutes=require('./routes/equipment')
const filterRoutes=require('./routes/filter')
const contactRoutes=require('./routes/contact')
 const orderRoutes=require('./routes/order')
app.use('/api/auth',authRoutes)
app.use('/api/category',categoryRoutes)
app.use('/api/equipment', equipmentRoutes);
app.use('/uploads', express.static('uploads'));
app.use('/api/filter', filterRoutes);
app.use('/api/contact',contactRoutes);
  app.use("/api/customer",orderRoutes)

connectDB()
const port = process.env.PORT

app.get('/', (req, res) => res.send('Hello World!'))
app.listen(port, () => console.log(`Example app listening on port ${port}!`))