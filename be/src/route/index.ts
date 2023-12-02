import * as express from "express"
import AuthController from "../controllers/userController"
import { authenticate } from "../middlewares/auth"
import taskController from "../controllers/taskController"
import categoryController from "../controllers/categoryController"

const router = express.Router()
// const router = express({dest: './uploads'})

router.get("/", (req,res) =>{
  res.send("hello from v1")

})
router.get("/users", AuthController.getUsers)
router.get("/users/:id", AuthController.getUserById)
router.post("/auth/register", AuthController.register)
router.post("/auth/login", authenticate, AuthController.login)

router.post("/create/task", taskController.task)
router.get("/task", taskController.getTask)
router.get("/task/:id", taskController.getTaskById)
router.patch("/task/:id", taskController.updateTask)
router.delete("/task/:id", taskController.deleteTask)

router.post("/create/category", categoryController.category)
router.get("/category", categoryController.getCategory)
router.get("/category/:id", categoryController.getCategoryById)
router.patch("/category/:id", categoryController.updateCategory)
router.delete("/category/:id", categoryController.deleteCategory)



// router.get("/thread/", authenticate, ThreadsController.find)
// router.get("/thread/:id", authenticate, ThreadsController.findOne)
// // router.get("/detail/:id",authenticate, ThreadsController.DetailList)
// router.post("/thread/",authenticate,upload('image'), ThreadsController.create)
// router.delete("/thread/:id", authenticate, ThreadsController.delete)
// router.patch("/thread/:id", ThreadsController.update)

// router.post("/auth/register", AuthController.register)
// router.get("/auth", AuthController.find)
// router.post("/auth/signin", AuthController.login)
// router.get("/auth/check", authenticate, AuthController.check)
// router.post("/auth/edit", authenticate, AuthController.editProfile)
 
// router.get("/reply",authenticate,ReplyController.find)
// router.post("/reply",authenticate, ReplyController.create)

// router.post("/like",authenticate, LikeController.create)
// router.delete("/like/:threadId",authenticate, LikeController.delete)
  
// // router.get("/follow", authenticate, FollowController.find);
// router.post("/follow",authenticate, FollowController.create)
// router.delete("/unfollow/:userId",authenticate, FollowController.delete)

export default router