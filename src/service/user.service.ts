import bcrypt from "bcrypt";
import { CreateUserDto } from "../dtos/users.dto"
import HttpException from "../exceptions/HttpException";
import { User} from "../interfaces/user.interface";
import userModel from "../model/user.model";
import { isEmpty } from "../utils/util";
// import {UpdateWriteOpResult} from 'mongodb';

// import Helper from "@/utils/helper";
import MSG from "../utils/erroemsg.json";
import Mongoose from "mongoose";
import helper from "../utils/helper";

class UserService {

	public users = userModel;

	public async findAllUser(filter: any): Promise<User[]> {
		let cond: any = {
			status: false,
			isDeleted: false,
		};
		if (filter && !isEmpty(filter)) Object.assign(cond, filter);

		let project: any = {
			name: 1,
			role: [],
			email: 1,
			gender: 1,
			mobile: 1,
			status: 1,
			dob: { $dateToString: { format: "%Y-%m-%d", date: "$dob" } },
			profileImage: 1,
			createdAt: 1,
		};
		const users: User[] = await this.users.aggregate([
			{
				$match: cond,
			},
			{
				$project: project,
			},
			{
				$sort: { createdAt: -1 },
			},
		]);
		return users;
	}

	public async getUserCount(
		type: string,
		value: string,
		filter: any
	): Promise<number> { 
		let cond: any = {
			isDeleted: false,
		};
		switch (type) {
			case "email":
				Object.assign(cond, { email: value });
				break;
			case "mobile":
				Object.assign(cond, { mobile: value });
				break;
			case "role":
				Object.assign(cond, { role: value });
				break;
			case "resetToken":
				Object.assign(cond, { resetToken: value });
				break;
			case "_id":
				Object.assign(cond, { _id: value });
				break;
			case "goals":
				Object.assign(cond, { goals: value });
				break;
			case "categories":
				Object.assign(cond, { categories: value });
				break;
			default:
				break;
		}
		if (filter && !isEmpty(filter)) Object.assign(cond, filter);
		const count: number = await this.users.countDocuments(cond);
		return count;
	}



	public async findUserByMobile(userMobile: string): Promise<User> {
		if (isEmpty(userMobile))
			throw new HttpException(400, MSG.FIELDS_MISSING);
		const findUser: User = await this.users.findOne({
			mobile: userMobile,
			isDeleted: false,
		});
		return findUser;
	}


	public async findUserByEmail(userEmail: string): Promise<User> {
		if (isEmpty(userEmail))
			throw new HttpException(400, MSG.FIELDS_MISSING);
		const findUser: User = await this.users.findOne({
			email: userEmail,
			isDeleted: false,
		});
		return findUser;
	}

	public async findUserByRole(userRole:Object): Promise<Array<Object>> {
		console.log("hlo",userRole)
		
		if (isEmpty(userRole))
			throw new HttpException(400, MSG.FIELDS_MISSING);
			
			
		const findUser = await this.users.find({
			role:{$elemMatch:{slug:userRole}},
			isDeleted: false,
		}
		,(error,result)=>{
			if(error){console.log(error)}
		}
		);
		// console.log('find',findUser)
		
		return findUser;
	}

	public async findUserByResetToken(token: string): Promise<User> {
		if (isEmpty(token))
			throw new HttpException(400, MSG.FIELDS_MISSING);
		const findUser: User = await this.users.findOne({
			token:token,
			isDeleted: false,
		});
		return findUser;
	}

	public async findUserBySocial(social: any): Promise<User> {
		if (isEmpty(social.type) || isEmpty(social.token))
			throw new HttpException(400, MSG.FIELDS_MISSING);
		const findUser: User = await this.users.findOne({
			"social.type": social.type,
			"social.token": social.token,
			isDeleted: false,
		});
		return findUser;
	}

	public async createUser(userData: CreateUserDto): Promise<User> {
		if (isEmpty(userData)) throw new HttpException(400, MSG.FIELDS_MISSING);

		const findUser: User = await this.users.findOne({
			email: userData.email,
		});
		if (findUser){throw new HttpException(
			409,
			MSG.EMAIL_IN_USE.replace("%email%", userData.email)
		);}else{
			const hashedPassword = await bcrypt.hash(userData.password, 10);
			const token = await helper.generateHash()
		// console.log(hashedPassword)
		console.log(userData)
		const createUserData: User = await this.users.create({
			...userData,
			password: hashedPassword,
			token:token
		});

		console.log(createUserData)
		return createUserData;
		}
			
			

		// const hashedPassword = await bcrypt.hash(userData.password, 10);
		// console.log(hashedPassword)
		// console.log(userData)
		// const createUserData: User = await this.users.create({
		// 	...userData,
		// 	password: hashedPassword,
		// });

		// console.log(createUserData)
		// return createUserData;
	}

	public async updateUser(
		userId: any,
		userData: any
	): Promise<User> {
		if (isEmpty(userData)) throw new HttpException(400, MSG.FIELDS_MISSING);
		delete userData.role;
		//trainer category selection validation
		
		if (userData.email && userData.email.length > 0) {
			const findUser: User = await this.findUserByEmail(userData.email);
			if (findUser && findUser._id != userId)
				throw new HttpException(
					409,
					MSG.EMAIL_IN_USE.replace("%email%", userData.email)
				);
		}
		if (userData.mobile && userData.mobile.length > 0) {
			const findUser: User = await this.findUserByMobile(userData.mobile);
			if (findUser && findUser._id != userId)
				throw new HttpException(
					409,
					MSG.MOBILE_IN_USE.replace("%mobile%", userData.mobile)
				);
		}

		if (userData.password && userData.password.length > 0) {
			const hashedPassword = await bcrypt.hash(userData.password, 10);
			userData = { ...userData, password: hashedPassword };
		}
		const updateUserById: User = await this.users.findByIdAndUpdate(
			userId,
			{ ...userData },
			{ new: true }
		);
		if (!updateUserById) throw new HttpException(409, MSG.NO_DATA);
		// console.log(updateUserById)
		return updateUserById;
		
	}

	public async resetToken(userId: string): Promise<User> {
		// const resetToken: string = await Helper.generateHash();
		const updateUserById: User = await this.users.findByIdAndUpdate(
			userId,
			{ token:"" ,emailVarification:true,status:true},
			{ new: true }
		);
		if (!updateUserById) throw new HttpException(409, MSG.NO_DATA);
		return updateUserById;
	}

	public async deleteUser(userId: string): Promise<User> {
		const deleteUserById: User = await this.users.findByIdAndDelete(userId);
		if (!deleteUserById) throw new HttpException(409, MSG.NO_DATA);
		return deleteUserById;
	}



    public async favourite(loginId: string, userId: string, action: string): Promise<User>{
        let update: any = {
			$pull: { favourites: userId },
		};
        if(action == 'add'){
            update = {
                $push: {favourites: userId },
            };
        }
        const updateUserById: User = await this.users.findByIdAndUpdate(
			loginId,
			update,
			{ new: true }
		);
		if (!updateUserById) throw new HttpException(409, MSG.NO_DATA);
		return updateUserById;
    }


	public async pushRole(userId:any,role:any):Promise<User>{
		const updateUserByRole: User = await this.users.findByIdAndUpdate(
			userId,
			{$push:role},
			{ new: true }
		);
		if (!updateUserByRole) throw new HttpException(409, MSG.NO_DATA);
		return updateUserByRole;

	}
	public async pullRole(userId:any,userRole:any):Promise<User>{
		let update ={
			$pull:{role:{slug:userRole}}
		}
		console.log(update)
		// console.log(update)
		// const findUser:User= await this.users.findById(userId)
		// const update = findUser.role
		const updateUserByRole = await this.users.findByIdAndUpdate(
			userId,
			update,
			{ new: true }
		);
		return updateUserByRole
	}

	public async findUserById(userId: string): Promise<User> {
		if (isEmpty(userId))
			throw new HttpException(400, MSG.FIELDS_MISSING);
		const findUser: User = await this.users.findOne({
			_id:userId,
			isDeleted: false,
		});
		return findUser;
	}


}

export default UserService;
