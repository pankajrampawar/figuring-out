const express = require('express');
const connectDB = require('./db')
const cors = require('cors');
const userRoute = require('./routes/UserRoutes');
const dropRoute = require('./routes/DropRoutes');
const responseRoute = require('./routes/ResponseRoutes');
const tagRoute = require('./routes/TagRoutes');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser')
const port = 3000

const app = express();

const corsOption = {
    origin: ['https://whiseve.com', 'https://www.whiseve.com', 'http://localhost:3001'],

    credentials: true
}
app.use(cors(corsOption)); 

app.use(bodyParser.json())

app.use(cookieParser())

app.get('/', (req, res) => {
    res.send("started")
});

connectDB();

app.use('/drop', dropRoute)
app.use('/response', responseRoute)
app.use('/user', userRoute)
app.use('/tag',tagRoute)

app.listen(port, ()=>{
    console.log(`Listening on port ${port}`);
})