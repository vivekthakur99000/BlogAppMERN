import express from "express"
import { addBlog, editBlog, deleteBlog, getAllBlogs, getBlogById, getUserBlogs } from "../controllers/blog.controller.js"
import isAuthenticated from "../middlewares/isAuthenticated.js"

const blogRouter = express.Router()

blogRouter.post("/add",isAuthenticated,  addBlog)
blogRouter.put("/edit/:id",isAuthenticated,  editBlog)
blogRouter.delete("/delete/:id",isAuthenticated,  deleteBlog)
blogRouter.get("/all", getAllBlogs)
blogRouter.get("/byid/:id", getBlogById)
blogRouter.get("/getuserblogs",isAuthenticated, getUserBlogs)

export default blogRouter

