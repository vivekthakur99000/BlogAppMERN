import express from "express"
import { loginUser, logoutUser, registerUser, updateProfile } from "../controllers/user.controller.js"
import isAuthenticated from "../middlewares/isAuthenticated.js"


const userRoute = express.Router()

userRoute.post("/register", registerUser)
userRoute.post("/login", loginUser)
userRoute.get("/logout", logoutUser)
userRoute.put("/update/profile",isAuthenticated, updateProfile)

export default userRoute