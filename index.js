import express from 'express';
import swagger from 'swagger-ui-express';
import apiRouters from './app/routers/apiRouters';
import dotenv from 'dotenv';
import swaggerDoc from './swagger.json';



dotenv.config();


const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());

app.use('/api/v1/', apiRouters)
app.use('/docs', swagger.serve, swagger.setup(swaggerDoc));



app.all('/*', (req, res) => {
  res.status(404).json({
    status_code: 404,
    error: 'this route does not exist'
  });
});


app.use((req, res, next) => {
  const error = new Error('method used is not allowed');
  error.status = 405;
  next(error);
});

app.use((error, req, res, next) => {
  res.status(error.status || 500).send({ error: error.status || 500, message: error.message });
  next();
});


app.listen(port, () => console.log(`listening on port ${port}...`));

export default app;

