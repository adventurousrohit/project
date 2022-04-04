import mongoose from "mongoose";
import { model, Schema, Document } from "mongoose"
import { User } from "../interfaces/user.interface";

const STACK =['backend','frontend','fullstack','webDesign']
// ROLES = ["admin","doctor", "patient"]
// SOCIALS = ["apple", "google", "facebook"],
// GENDER = ["","male","female"],
// PROFILE_APPROVAL= ["pending","rejected","blocked","approved"];

const userSchema: Schema = new Schema(
	{
		// firstName: {
		// 	type: String,
		// 	required: true,
		// },
		// lastName: {
		// 	type: String,
		// 	required: true,
		// },
		userName: {
			type: String,
			required: true
		},
		id: {
			type: String,
			required: true
		},
		domain: {
			type: String,
			required: true
		},
		email: {
			type: String,
			required: true,
			unique: true,
		},
		mobile: {
			type: String,
			required: true
		},
		password: {
			type: String,
			required: true,
		},
		// profileImage: {
		// 	type: String,
		// 	default: "default.png",
		// },
		currentCity: {
			type: String,
			default: "",
		},
		preferCity: {
			type: String,
			default: "",
		},
		role: {
			type: String,
			required: true,
			// enum: ROLES,
			default: "patient",
		},
		ctc: {
			type: String,
			required: true
		},
		ectc: {
			type: String,
			required: true
		},
		noticePeriodDuration: {
			type: Number,
			required: true
		},
		servingNoticePeriod: {
			type: Boolean,
			required: true
		},
		gender: {
			type: String,
			// enum: GENDER,
			default: "",
		},
		description: {
			type: String
		},
		techStack: [{
			stack: {
				type: String,
				required: true,
				enum:STACK
			}

		}],
        // profileApproval:{
        //     status:{
        //         type: String,
        //         // enum: PROFILE_APPROVAL,
        //         default: "pending",
        //     },
        //     description: {
        //         type: String
        //     }
        // },
		dob: {
			type: Date,
		},
		status: {
			type: Boolean,
			default: false,
		},
		isDeleted: {
			type: Boolean,
			default: false,
		},
		emailVerified: {
			type: Boolean,
			default: false,
		},
		// device: {
		// 	id: String,
		// 	token: String,
		// },
		// social: {
		// 	type: {
		// 		type: String,
		// 		// enum: SOCIALS,
		// 	},
		// 	token: {
		// 		type: String,
		// 	},
		// },
		// resetToken: String,
	},
	{
		timestamps: true,
	}
);

const User = model<User & Document>("User", userSchema)
export default User;