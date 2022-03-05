import express from 'express';
import helmet from 'helmet';
import rateLimit from 'express-rate-limit';

let count = 0;

const app = express();

// middleware to ward off hax0rs
app.use(helmet());
app.use(
  rateLimit({
    windowMs: 5 * 60 * 1000,
    max: 100,
    message: 'Too many requests, please try again after 5 minutes',
    standardHeaders: true,
    legacyHeaders: false,
  })
);

app.get('/', (req, res) => {
  res.send(`This page has been viewed ${++count} times`);
});

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => console.log(`Listening on port ${PORT}`));
