const express = require('express');
const morgan = require('morgan');

const tourRouters = require('./routes/tourRoutes');
const userRouters = require('./routes/userRoutes');

// Middleware

const app = express();
app.use(express.json()); // middleware to get body data from server

if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

app.use(express.static(`${__dirname}/public`));

app.use((req, res, next) => {
  console.log('Hello from the middleware');
  next();
});
app.use((req, res, next) => {
  req.requestTime = new Date().toISOString();
  next();
});

// app.get('/', (req, res) => {
//   res.status(200).json({ message: 'Hello from the server', app: 'Natoure' });
// });

// app.post('/', (req, res) => {
//   res.send('You can post to this endpoint');
// });

// app.get('/api/v1/tours', getAllTours);
// app.post('/api/v1/tours', addNewTour);
// app.get('/api/v1/tours/:id', getTour);
// app.patch('/api/v1/tours/:id', updateTour);
// app.delete('/api/v1/tours/:id', deleteTour);

app.use('/api/v1/tours', tourRouters);
app.use('/api/v1/users', userRouters);

module.exports = app;
