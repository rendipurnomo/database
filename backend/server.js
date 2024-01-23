import express from 'express';
import fileUpload from 'express-fileupload';
import session from 'express-session';
import cors from 'cors';
import "dotenv/config";
import ProductRoute from './routes/ProductRoute.js';
import CategoryRoute from './routes/CategoryRoute.js';
import CustomerRoute from './routes/CustomerRoute.js';
import OrderRoute from './routes/OrderRoute.js';
import PaymentRoute from './routes/PaymentRoute.js';
import WishListRoute from './routes/WishlistRoute.js';
import ShipmentRoute from './routes/ShipmentRoute.js';
import OrderItemRoute from './routes/OrderItemRoute.js';
import AuthRoute from './routes/Auth.js';
import SequelizeStore from 'connect-session-sequelize';
import db from './config/database.js';

const app = express();

const sessionStore = SequelizeStore(session.Store);

const store = new sessionStore({
  db: db,
});

app.use(
  session({
    secret: process.env.SESS_SECRET,
    resave: false,
    saveUninitialized: false,
    store: store,
    cookie: {
      secure: 'auto',
    },
  })
);

app.use(
  cors({
    origin: 'http://localhost:5173',
    credentials: true,
  })
);
app.use(express.json());
app.use(fileUpload());
app.use(express.static('public'));
app.use(ProductRoute);
app.use(CategoryRoute);
app.use(CustomerRoute);
app.use(OrderRoute);
app.use(PaymentRoute);
app.use(WishListRoute);
app.use(ShipmentRoute);
app.use(OrderItemRoute);
app.use(AuthRoute);

// (async () => {
//   await db.sync();
// })();

// store.sync();

const port = process.env.PORT;
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
