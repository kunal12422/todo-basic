import  redis from 'redis'
import config from '../core/config/config.dev'

const client = redis.createClient(config.Redis_Port || 6379, config.Redis_Host || 'localhost');

client.select(config.Redis_Db, (err, res)=> {
    if (err) {
      throw err;
    }
});

exports.setItem =  (key, field,value,callback)=> {
 
  client.HMSET(key, field, value,  (err)=> {
      if (err) 
          return callback(err);

      return callback(null);
  });
};
exports.getItem =  (key, callback)=> {
  
  client.HGETALL(key, function (err, reply) {
      if (err) {
          return callback(err);
      }
      return callback(null, reply);
  });
};

exports.removeItem =  (key,field ,callback) =>{
 
  client.HDEL(key, field,function (err) {
      if (err) {
          return callback(err);
      }
      return callback(null);
  });
};
