const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');
const userRoutes = require('./Routes/userRoutes');
const authRoutes = require('./Routes/authRoutes');
const productRoutes = require('./Routes/productRoutes');
const cartRoutes = require('./Routes/cartRoutes');
const orderRoutes = require('./Routes/orderRoutes');
const paymentRoutes = require('./Routes/paymentRoutes');
const { urlencoded } = require('express');

dotenv.config({
  path: './config.env',
});

mongoose.connect("mongodb+srv://ecommerce:UdpcHExlnMRKVYWx@cluster0.f93y4ir.mongodb.net/users?retryWrites=true&w=majority", (err) => {
  if (err) console.log(err);
  else console.log('Connected to DB!');
});

const app = express();

app.use(cors());

app.use(
  express.json({
    limit: '5mb',
  })
);
app.use(urlencoded({extended:true}));

app.get('/', (req, res) => {
  res.send('Hello from GS Kart');
});

app.use('/api/users', userRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/products', productRoutes);
app.use('/api/carts', cartRoutes);
app.use('/api/orders', orderRoutes);
app.use('/api/checkout', paymentRoutes);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`listening on PORT ${PORT}`);
});
