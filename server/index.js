const express = require('express');
const connectDB = require('./db')
const cors = require('cors');
const cloudinary=require('cloudinary').v2;
const dotenv=require('dotenv');
const userRoute = require('./routes/UserRoutes');
const dropRoute = require('./routes/DropRoutes');
const responseRoute = require('./routes/ResponseRoutes');
const tagRoute = require('./routes/TagRoutes');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser')
const port = 3000
dotenv.config();

const app = express();
app.use(bodyParser.json({ limit: '10mb' }));

const corsOption = {
    origin: ['https://whiseve.com', 'https://www.whiseve.com', 'http://localhost:3001'],

    credentials: true
}
app.use(cors(corsOption)); 

cloudinary.config({
    cloud_name:process.env.CLOUD_NAME,
    api_key:process.env.API_KEY,
    api_secret:process.env.API_SECRET
});

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