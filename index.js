if(process.env.NODE_ENV !== 'production'){
    require('dotenv').config();
}
const express = require('express');
const app = express();
const ConfigurationRoutes = require('./routes/Configuration');
const session = require('express-session');
const MongoStore = require('connect-mongo');
const keys = require('./configs/keys');
const mongoose = require('mongoose');
const ExpressError = require('./utils/ExpressError');

const DB = `mongodb+srv://seinde4:${keys.PASSWORD}@cluster0.pp8yv.mongodb.net/verido?retryWrites=true&w=majority` || 'mongodb://localhost:27017/flutterwave';

mongoose.connect(DB, 
    {    
    useNewUrlParser: true,
    useUnifiedTopology: true,
    }
)


const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error'))
db.once('open', () => {
    console.log('Database connected')
})


const sessionConfig = {
    secret: keys.COOKIEKEY,
    resave: false,
    store : MongoStore.create({
        mongoUrl: DB,
        secret: keys.SECRETKEY,
        touchAfter: 24 * 3600
    }),
    saveUninitialized: true,
    cookie: {
        httpOnly: true,
        expire: Date.now() + 1000 * 60 * 60 * 24 * 7,
        maxAge: 1000 * 60 * 60 * 24 * 7
    }
}

app.use(session(sessionConfig));
app.use(express.json());
app.use(express.urlencoded({extended: true}));


app.get('/', (req, res) => {
    res.send('Hello')
})

app.use(ConfigurationRoutes);
  

app.use((err, req, res, next) => {
    const { statusCode = 500 } = err
    console.log(err, 'err')
    if(!err.message) err.message = 'Something went wrong'
    res.status(403).json({"message": err})
   
})



const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`listening on port ${PORT}`))
