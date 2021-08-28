import express from 'express';
import morgan from 'morgan';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import cors from 'cors';
import config from './config';

// require apis
import authRoutes from './routes/auth';
import productRoutes from './routes/product';
import categoryRoutes from './routes/category';
import ownerRoutes from './routes/owner';
import reviewRoutes from './routes/review';
import addressRoutes from './routes/address';
import paymentRoutes from './routes/payment';
import orderRoutes from './routes/order';

// new express app
const app = express();

const PORT = 3000;

// connect to cloud mongo db user and pass, 2nd param warnings inserted
mongoose.connect(
  config.dataBase,
  { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true },
  (err) => {
    if (err) {
      console.log(err);
    } else {
      console.log('Connected to the database');
    }
  }
);

// Middlewares
app.use(cors());
app.use(morgan('dev'));
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use('/api/auth', authRoutes);
app.use('/api', productRoutes);
app.use('/api', categoryRoutes);
app.use('/api', ownerRoutes);
app.use('/api', reviewRoutes);
app.use('/api', addressRoutes);
app.use('/api', paymentRoutes);
app.use('/api', orderRoutes);

app.listen(PORT, () => {
  console.log(`Express with Typescript! http://localhost:${PORT}`);
});
