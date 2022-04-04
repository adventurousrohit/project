import {Request,Response,NextFunction} from "express"
import { CreateUserDto } from "dtos/users.dto"
import { User } from "../interfaces/user.interface";
import userService from "../service/user.service";
import HttpException from "../exceptions/HttpException";
import { RequestWithUser } from "../interfaces/auth.interface";

import Helper from "../utils/helper";
import Mongoose from "mongoose";
import moment from "moment";
import config from "config";
import MSG from "../utils/erroemsg.json";

class usersController {
    public UserService = new userService()


    // find user by email
    public getUserByEmail = async (
        req:Request,
        res:Response,
        next:NextFunction
    )=>{
        try{
            console.log()
            const email= req.params.email
            const findUser:User = await this.UserService.findUserByEmail(email)
            if(!findUser)
            throw new HttpException(401,MSG.EMAIL_NOT_FOUND.replace("%email%",email))
            res.send(findUser)
        }
        catch(error){next(error)}
    }


    public registerUser= async (
        req:Request,
        res:Response,
        next:NextFunction
    )=>{
        const userData:CreateUserDto= req.body
        const email = req.body.email
        const findUser:User = await this.UserService.findUserByEmail(email)
        if(findUser)
        throw new HttpException(402,MSG.EMAIL_IN_USE.replace("%%email",email))
        const createUser = await this.UserService.createUser(userData)
        res.send(createUser)
    }
}

export default usersController