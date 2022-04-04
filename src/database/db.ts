import { dbConfig } from "../interfaces/db.interface";
import config from "config"

export const dbConnection ={
    url:"mongodb+srv://rental:Rohit12345@cluster0.sjopp.mongodb.net/myFirstDatabase?retryWrites=true&w=majority",
    options: {
		useNewUrlParser: true,
		useUnifiedTopology: true,
		// useFindAndModify: false,
		// useCreateIndex: true
	},
}