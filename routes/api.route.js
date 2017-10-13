
import express from "express";
import todoController from "../controllers/todo.controllers"
const router = express.Router()
router.get('/',(req,res)=>{
    todoController.getAllTodo(req,res);
});

router.post('/', (req, res) => {
    todoController.createTodo(req,res);
});
router.put('/', (req,res)=>{
    todoController.updateTodo(req,res);
})
router.delete('/',(req, res) => {
    todoController.deleteTodo(req,res);
});


export default router;