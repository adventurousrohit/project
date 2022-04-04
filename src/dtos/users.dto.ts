import config from "config";
import {
	IsEmail,
	IsString,
	IsNotEmpty,
	IsObject,
	IsOptional,
	Contains,
	IsNumber,
	IsArray,
	IsMongoId,
} from "class-validator";

export class CreateUserDto {
	@IsNotEmpty()
	public id: string;

	@IsNotEmpty()
	public userName: string;

	@IsNotEmpty()
	@IsArray()
	@IsString()
	public roletechStack:Array<{stack:String}>;

	@IsNotEmpty()
	@IsString()
	public domain:string

	@IsEmail()
	public email: string;

    @IsEmail()
	public role: string;

	@IsNotEmpty()
	public mobile: string;

	@IsNotEmpty()
	public password: string;

	@IsOptional()
	@IsString()
	public gender: string;

	@IsOptional()
	@IsNumber()
	public dob: string;

	// @IsOptional()
	// @IsString()
	// @Contains(config.get("env"))
	// public profileImage: string;

    @IsOptional()
	@IsObject()
	public social: {
		type: string;
		token: string;
	};

   
    @IsOptional()
	@IsString()
	public currentCity: string;

    @IsOptional()
	@IsString()
	public preferCity : string;

    @IsOptional()
	@IsString()
	public ctc : string;

    @IsOptional()
	@IsString()
	public ectc : string;

    @IsOptional()
	@IsString()
	public dexcription : string;

    @IsNotEmpty()
	public noticePeriodDuration: string;


    @IsNotEmpty()
	public servingNoticePeriod: string;


	// @IsOptional()
	// @IsObject()
	// public device: {
	// 	id: string;
	// 	token: string;
	// };

	// @IsOptional()
	// @IsObject()
	// public social: {
	// 	type: string;
	// 	token: string;
	// };

	// @IsOptional()
	// public resetToken: string;
}
