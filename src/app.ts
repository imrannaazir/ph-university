import express, { Application } from 'express';
import cors from 'cors';
// import globalErrorHandler from './app/middleware/globalErrorHandler';
const app: Application = express();

//parser
app.use(express.json());
app.use(cors());

app.get('/', (req, res) => {
  res.send('Hello World!');
});

//global error handler
// app.use(globalErrorHandler)

// not found route handler

export default app;
