import express from 'express';

const app = express();

app.get('/', (req, res) => {
    res.send('Works')
});

app.listen(5000, () => console.log('Server is listening on http://localhost:5000...'));