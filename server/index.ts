import express from 'express';
import authRoutes from './routes/auth';
import merchandiseRoutes from './routes/merchandise';
import { authenticateToken } from './middlewares/authentication.middleware'
import bodyParser from 'body-parser'
import cors from 'cors';

const app = express()
const jsonParser = bodyParser.json();

app.use(cors())
app.use(jsonParser);

app.use('/api/auth', authRoutes);
app.use('/api/merchandise', authenticateToken, merchandiseRoutes);

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

