
import express from "express";
import todoController from "../controllers/todo.controllers"
import imageController from "../controllers/image.controllers"
import auth from '../core/auth.service'
const router = express.Router()


router.route('/')
.get(auth.isAuthenticated(), todoController.getAllTodo)
.post(auth.isAuthenticated(),todoController.createTodo)
.put(auth.isAuthenticated(),todoController.updateTodo)
.delete(auth.isAuthenticated(),todoController.deleteTodo);

router.route('/image')
.post(auth.isAuthenticated(),imageController.upload)

export default router;