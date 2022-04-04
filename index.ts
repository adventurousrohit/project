import express, {Request,Response} from "express"
import dotenv from 'dotenv'
import App from "./app"

// const app = express()
dotenv.config()

// app router
import UserRoute from "./src/routes/user.route"

const app = new App([
    new UserRoute()
   
])


app.listen()
// app.listen(3000,(req,res)=>{
//     console.log("server is on 3000")
// })