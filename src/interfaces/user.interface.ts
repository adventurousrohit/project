export interface User {
    _id: string
	id:String
	name:String
	domain:String;
    // firstName: string;
    // lastName: string;
	role: string;
	email: string;
	mobile: string;
	password: string;
	experience:String;
	// profileImage: string;
	status: boolean;
    ctc: string;
	Ectc:String;
	noticePeriodDuration:Number;
	ServingNoticePeriod:Boolean;
	currentCity:String;
	preferCity:String;
	description:String;
	techStack:Array<{}>
	isDeleted:Boolean;
	emailVerified:Boolean;
	// device?: {
	// 	id: string;
	// 	token: string;
	// };
	// social?: {
	// 	type: string;
	// 	token: string;
	// };
}
