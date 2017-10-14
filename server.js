import express from "express";
import bodyParser from "body-parser";
import morgan from 'morgan'
import Mongoose from 'mongoose'
import cors from 'cors'
import passport from 'passport'
import session from 'express-session'



import initPassport from './core/passport';

import config from './core/config/config.dev'
import api from './routes/api.route'
import users from './routes/user.route'
const  secret = process.env.SECRET || 'mysecret';

const port = config.serverPort;
const app = express();



app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(morgan('combined'));
app.use(express.static(__dirname + '/client')); 
app.use(session({ secret: secret})) 
app.use(passport.initialize());
app.use(passport.session());
app.use(cors())



initPassport(passport);


app.use('/api', api);
app.use('/',users);

app.get('*', function(req, res) {
    res.sendfile(__dirname + '/client/index.html'); 
});





Mongoose.connect(`mongodb://${config.dbHost}:${config.dbPort}/${config.dbName}`)
.then(() => { 
    app.listen(port, () => {
        console.log('server started - ', port);
    });
})
.catch(err => { 
    console.error('App starting error:', err.stack);
    process.exit(1);
});



// catch 404 and forward to error handler
app.use((req, res, next)=> {
    let err = new Error();
    err.status = 404;
    next(err);
});

// error handlers
app.use( (err, req, res, next)=> {
    
    res.status(404);
    
    res.send("NOT FOUND")
});