import express from 'express';
import apiRouters from './app/routers/apiRouters';

const app = express();
const port = 3000;
app.use(express.json());

app.use('/api/v1/', apiRouters)







app.listen(port, () => console.log('listening on port 3000...'));

export default app;

