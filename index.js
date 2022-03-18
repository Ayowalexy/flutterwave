if(process.env.NODE_ENV !== 'production'){
    require('dotenv').config();
}
const express = require('express');
const app = express();
const ConfigurationRoutes = require('./routes/Configuration');
const session = require('express-session');
const keys = require('./configs/keys');

const sessionConfig = {
    secret: keys.COOKIEKEY,
    resave: false,
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