import express, { Router } from "express"
import { connect, set } from "mongoose"
import Routes from "./src/interfaces/routs.interface"
import { dbConnection } from "./src/database/db"
import { ConnectionOptions } from "tls"
import errorMiddleware from "./src/middleware/error.middleware"
import cors from "cors"
import path from "path"
import flash from "express-flash"
import hpp from "hpp"
import helmet from "helmet"
// import {UserRoutes} from "./src/routes/user.route"
// import { connect } from "http2"


class App {
    public app: express.Application
    public port: string | number
    public env: string

    constructor(routes: Routes[]) {
        this.app = express()
        this.port = 3000
        this.env = process.env.NODE_ENV || "development"

        this.connectToDataBase();
        this.initialiseMiddleware();
        this.initialiseRoutes(routes)
        this.initialiseErrorHandling()
    }



    public listen() {
        this.app.listen(this.port, () => {
            console.log(`server is on ${this.port}`)
        });
    }

    private connectToDataBase() {
        if (this.env !== "production") {
            // console.log("set")
            set("debug", true);
        }
        connect(dbConnection.url, (dbConnection.options as ConnectionOptions)).then(() => {
            console.log("Db started")
        })
        // set("debug", true)
        // console.log('DB')

    }

    private initialiseMiddleware() {
        this.app.use(express.json({ limit: "5mb" }));
        this.app.use(express.urlencoded({ extended: true, limit: "5mb" }));
        this.app.use(cors({ origin: true, credentials: true }));
        // this.app.use(express.static('.src/public'), console.log("hhlo"));
        this.app.use(express.static(path.join(__dirname, "src/public")))
        this.app.use(hpp());
		this.app.use(
			helmet({
				contentSecurityPolicy: false,
			})
		);
        this.app.use(flash());

    }


    private initialiseRoutes(routes: Routes[]) {
        routes.forEach((route) => {
            this.app.use('/', route.router)
        })
        
    }
    private initialiseErrorHandling(){
        this.app.use(errorMiddleware);

    }
}


export default App