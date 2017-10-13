import Todo from '../models/todo.model'
import redisClient from '../db/RedisUtils';

const controller = {};

controller.createTodo = (req, res) => {
    let _id = req.body["_id"];
    console.log("-----")

    console.log(req.body["text"], _id)

    console.log("-----")
    let t = new Todo(
        req.body
       );
    Todo.findById(_id, (err, todo)=>{
       if(!todo){
           t.save((err)=>{
                console.log("saved mongo");
                redisClient.setItem("todo","post_"+t["_id"], req.body["text"], (err)=> {
                    if (err) {
                        next (err);
                    }
                     console.log("redis todo created");
                     res.status(201);
                     res.json({
                        "message":"success",
                        "data": t["_id"]
                     });
                })
           })
       }else{
           Todo.update({"_id":_id}, t, (err)=>{
                if(err){
                    next(err);
                }
                console.log("mongo todo updated")
                redisClient.setItem("todo","post_"+_id, req.body["text"], (err)=> {
                    if (err) {
                        next (err);
                    }
                     console.log("redis todo updated")
                     res.status(201);
                     res.json({
                        "message":"success",
                        "data": t["_id"]
                     });
                })
           });
       }

    });

}
controller.getAllTodo = (req, res) => {
    redisClient.getItem("todo",(err, result)=>{
        if(err){
            next(err);
        }
        if(!result){
            res.status(200);
            res.json({
                "message":"success",
                "data": null,
                "count":0
              });
        }
        if(result){
            var arr = []
            
            console.log(result);
            var k=0;
            for(var i in result){
                // console.log(i)
                var o = {};
                o["post"] = i;
                o["task"] = result[i];
             
              arr.push (o);
             
            }
            res.status(200);
            // console.log(arr.push(result))
            res.json({
                "message":"success",
                "data": arr,
                "count":arr.length
              });
        }
        
    })
 }
 controller.deleteTodo = (req, res) => {
     console.log("ID SUBMITTED      post_"+req.query["_id"])
    Todo
    .remove({"_id":req.query["_id"]})
    .exec()
    .then((data)=>{
        console.log("removed for mongo")
        redisClient.removeItem("todo","post_"+req.query["_id"], (err, succ)=>{
            if(err){
                next(err);
            }
                console.log("removed for redis")
                res.status(200);
                res.json({
                    "message":"success removed",
                    "data":req.query["_id"]
                  });
            
    });
    })

 }
controller.updateTodo = (req,res)=>{

}



export default controller;

