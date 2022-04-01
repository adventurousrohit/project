import express from "express"
import {connect,set} from "mongoose"
import Route from "./src/interfaces/routs.interface"
import { dbConnection } from "./src/database/db"
import { ConnectionOptions } from "tls"
// import { connect } from "http2"


class App{
    public app: express.Application
    public port: string|number
    public env: string

    constructor(routes:Route[]){
        this.app = express()
        this.port= 3000
        this.env=process.env.NODE_ENV ||"development"
         
        this.connectToDataBase();
        this.initialiseMiddleware();
        this.initialiseRoutes()
        this.initialiseErrorHandling()


    }


    private connectToDataBase(){
        if (this.env !== "production") {
            set("debug", true);
        }
        connect(dbConnection.url,(dbConnection.options as ConnectionOptions))
       
    }

    private initialiseMiddleware(){
        this.app.use(express.json({ limit: "5mb" }));
		this.app.use(express.urlencoded({ extended: true, limit: "5mb" }));
    }
}