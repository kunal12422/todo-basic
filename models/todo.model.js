import mongoose from 'mongoose';

const todoSchema = mongoose.Schema({
        
         
        
        text:{type:String},
        completed:{type: Boolean,default:false} 
       
    },
 {collection : 'todo'});

 let TodoModel = mongoose.model('Todo', todoSchema);

export default TodoModel;