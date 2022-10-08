/**
 * Flash
 * MIT Licensed
 */

/**
 * Module dependencies.
 * @private
 */
import express from 'express';
import 'reflect-metadata';
import AppDataSource from './database';
import { config, ENV } from '../config';
import Utils from './Utils';
import Router from './Router';
import errorHandler from './errorHandler';
import notFound from './notFound';
import AppLog from './AppLog';
import path from 'path';
// PlusOrm,
// io,
// MysqlController,
// ,
// Guard,
// dotenv,
// ,
// Service,
// Router,
// ,
// ,
// Handler,
// ,
// Helmet,
// Cors,
// Validation,
// AsyncHandler,
// ,
// SwaggerUi,
// Mysql,
// Mongoose,
// Global,
// SetGlobal,
// ,
// Multer,
// MongoController
import { Service, csurf, CookieParser, UrlEncoded, JsonParser, ExpressPlusDebug, Helmet, Cors, Guard, Static, Logger } from '@ulvimemmeedov/expressjsplus';
/**
 * Main App Class.
 */
class FlashApp {
    /**
     * Create an express application.
     * @public
     */
    public Flash = express();

    private port = config.appConfig.port;

    private listen() {
        return this.Flash.listen(this.port, () => {
            Utils.Logger.Info(`Server⚡️ running on http://localhost:${this.port}`);
            return this.Flash;
        });
    }

    /**
     * Initialize the Application.
     * @private
     */
    async start() {
        /**
         *  - setup configuration
         */
        let routerDriver = new Router();
        await routerDriver.register();
        await (await AppDataSource()).initialize();


        // instant log
        if (ENV.get("EXPRESSPLUS") == "true") {
            this.Flash.use(AppLog.routeLog);
            this.Flash.use(Logger("dev"))
        }
        /**
         * Debug Panel
         */
        ExpressPlusDebug.default.Start(this.Flash);

        /**
         * Server config
         * - static files
         * - json parse
         * - formData Parse
         */

        this.Flash.use("/static", Static(path.join(__dirname, "../storage/static")))
        this.Flash.use(Cors(config.appConfig.cors));
        this.Flash.use(Helmet());
        this.Flash.use(JsonParser());
        this.Flash.use(UrlEncoded());
        this.Flash.use(CookieParser());
        this.Flash.use(csurf({ cookie: true }));
        this.Flash.use(routerDriver.routers);
        this.Flash.use(errorHandler);
        this.Flash.use("/*", notFound);
        this.Flash.use(Service);
        this.Flash.use(Guard)
        // all api list
        if (ENV.get("EXPRESSPLUS") == "true") {
            AppLog.allLogEndPoints(this.Flash);
        }


        return this.listen();
    }
}

export default FlashApp;