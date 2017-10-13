import path from "path";

let config = {};


config.dbHost = process.env.dbHost || 'localhost';
config.dbPort = process.env.dbPort || '27017';
config.dbName = process.env.dbName || 'todo-saver';
config.serverPort = process.env.serverPort || 3000;
config.Redis_Db = 0
config.Redis_Host = "127.0.0.1";
config.Redis_Port = 6379;

export default config;

