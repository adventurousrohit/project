import Route from "interfaces/routs.interface";
import {Router} from "express"
import UserService from "service/user.service";
import usersController from "../controller/user.controller";
import {Request,Response,NextFunction} from "express"



class UserRoute implements Route{
    public path= '/api/users';
    public router=Router();
    public UsersController = new usersController

    constructor(){
        this.initializeRoutes()
    }
 
    private initializeRoutes(){
        // this.router.get(
        //     `${this.path}`,
        //     (req:Request,res:Response)=>{
        //         res.send({message:"helo"})
        //     }
        // )

        this.router.get(
            `${this.path}/user-details/:email`,
            // ()=>{console.log("helo")}
            this.UsersController.getUserByEmail
            

        )

        this.router.post(
            `${this.path}/create-users`,
            this.UsersController.registerUser
        )
       
    }

    
}

export default UserRoute