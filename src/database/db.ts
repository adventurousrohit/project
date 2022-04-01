import { dbConfig } from "../interfaces/db.interface";
import config from "config"

export const dbConnection ={
    url:"mongodb://localhost:27017/project",
    options: {
		useNewUrlParser: true,
		useUnifiedTopology: true,
		useFindAndModify: false,
		useCreateIndex: true
	},
}