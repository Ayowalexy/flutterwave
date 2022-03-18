if(process.env.NODE_ENV !== 'production'){
    require('dotenv').config();
}
const express = require('express');
const app = express();
const ConfigurationRoutes = require('./routes/Configuration');
const session = require('express-session');
const MongoDBStore = require('connect-mongo')(session);
const keys = require('./configs/keys');
const mongoose = require('mongoose');

const DB = `mongodb+srv://seinde4:${keys.PASSWORD}@cluster0.pp8yv.mongodb.net/verido?retryWrites=true&w=majority`;

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


const store = new MongoDBStore({
    url: DB,
    secret: keys.SECRETKEY,
    touchAfter: 24 * 3600
})

const sessionConfig = {
    secret: keys.COOKIEKEY,
    resave: false,
    store,
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

//INITIALIZING ROUTES;

app.get('/', (req, res) => {
    req.session.current_id = Math.random();
    console.log(req.session.current_id)
    res.send('Hello')
})

app.use(ConfigurationRoutes);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`listening on port ${PORT}`))