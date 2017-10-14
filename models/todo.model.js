import mongoose from 'mongoose';
import User from './user.model'
const todoSchema = mongoose.Schema({
        imageUrl: {type:String},
        text:{type:String},
        completed:{type: Boolean,default:false},
        user : {type: mongoose.Schema.ObjectId,ref:'User'}
    },
 {collection : 'todo'});

 let TodoModel = mongoose.model('Todo', todoSchema);

export default TodoModel;