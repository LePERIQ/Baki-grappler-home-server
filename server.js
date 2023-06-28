const express = require('express');
const morgan = require('morgan');
const videoApiRoute = require('./routers/videoApiRoute');


require('dotenv').config();

// const PORT = process.env.SERVER_PORT || 3001
const PORT = process.env.SERVER_PORT
const app = express();

app.use(express.json());

app.use(morgan('dev'))


app.use('/api/player' ,videoApiRoute)

app.listen(PORT, () => {
    console.log(`Server running on ${PORT}` )
})