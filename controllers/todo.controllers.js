import Todo from '../models/todo.model'
import redisClient from '../db/RedisUtils';

const controller = {};

controller.createTodo = (req, res) => {

    let t = new Todo({
        "text":req.body["text"],
        "imageUrl":req.body["imageUrl"],
        "user":req.user["_id"]
    });


    t.save((err)=>{
        console.log("saved mongo");
   
        let obj = {
            "text":req.body["text"],
            "imageUrl":req.body["imageUrl"]
        }
        redisClient.setItem("todo_"+req.user["_id"] , "post_"+t["_id"], JSON.stringify(obj), (err)=> {
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
}
controller.getAllTodo = (req, res) => {
    
    redisClient.getItem("todo_"+req.user["_id"],(err, result)=>{
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
            
            console.log("FROM REDIS GETALL RESULT " + result);
            var k=0;
            for(var i in result){
               
                var o = {};
                o["post"] = i;
                o["task"] = result[i];
             
              arr.push (o);
             
            }
            res.status(200);
           
            res.json({
                "message":"success",
                "data": arr,
                "count":arr.length
              });
        }
        
    })
 }
 controller.deleteTodo = (req, res) => {
    
    Todo
    .remove({"_id":req.query["_id"]})
    .exec()
    .then((data)=>{
        console.log("removed for mongo")
        redisClient.removeItem("todo_"+req.user["_id"],"post_"+req.query["_id"], (err, succ)=>{
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
      


       
        var _id = req.query["_id"]
        var text =  req.query["text"]
        
        if(_id.length != 24){
            return;
        }
       
        const doc = {
            "text":text
        }
        Todo.update({"_id":_id}, doc, (err,user)=>{
            if(err){
                next(err);
            }
            let obj = {
                "text":req.query["text"],
                "imageUrl":req.query["imageUrl"]
            }
            console.log("mongo todo updated")
            redisClient.setItem("todo_"+req.user["_id"],"post_"+_id, JSON.stringify(obj), (err)=> {
                if (err) {
                    next (err);
                }
                 console.log("redis todo updated")
                 res.status(201);
                 res.json({
                    "message":"success",
                    "data": req.query["_id"]
                 });
            })
       });
}



export default controller;

