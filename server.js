import express from "express";
import bodyParser from "body-parser";
import morgan from 'morgan'
import Mongoose from 'mongoose'


import config from './core/config/config.dev'
import api from './routes/api.route'



const port = config.serverPort;
const app = express();

let dbHost = config.dbHost;
let dbPort = config.dbPort;
let dbName = config.dbName;




app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(morgan('combined'));
app.use(express.static(__dirname + '/client'));  
app.use('/api', api);
app.get('*', function(req, res) {
    res.sendfile(__dirname + '/client/index.html'); 
});

Mongoose.connect(`mongodb://${dbHost}:${dbPort}/${dbName}`)
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