import express from 'express';
import apiRouters from './app/routers/apiRouters';

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());

app.use('/api/v1/', apiRouters)



// app.all('/*', (req, res) => {
//     res.status(404).json({
//         status: 404,
//         error: 'this  does not exist'
//     });
// });


// app.use((err, req, res, next) => {
//     res.status(500).json({
//         status: '500',
//         error: 'oops! something went wrong'
//     });
// });



app.listen(port, () => console.log(`listening on port ${port}...`));

export default app;

