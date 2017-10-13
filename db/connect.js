import Mongoose from 'mongoose';
import config from '../core/config/config.dev'

const connectToDb =  () => {
    let dbHost = config.dbHost;
    let dbPort = config.dbPort;
    let dbName = config.dbName;
    try {
         Mongoose.connect(`mongodb://${dbHost}:${dbPort}/${dbName}`);
        console.info('Connected to mongo!!!');
    }
    catch (err) {
        console.error('Could not connect to MongoDB');
    }
}

export default connectToDb;


