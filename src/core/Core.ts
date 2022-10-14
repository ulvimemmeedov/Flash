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
import cors from 'cors';
import helmet from 'helmet';
import cokieParser from 'cookie-parser';
import Guard from './Guard';
import preactRender from 'express-preact-views';
/**
 * Main App Class.
 */
class FlashApp {
    /**
     * Create an express application.
     * @public
     */
    public Flash = express();

    private port: string | number

    constructor(port?: string | number) {
        this.port = port || config.appConfig.port;
    }

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
        }
        /**
         * Server config
         * - static files
         * - json parse
         * - formData Parse
         */
        this.Flash.set("views", path.join(__dirname, "../views"));
        this.Flash.set('view engine', 'jsx');
        this.Flash.engine('jsx', preactRender.createEngine({
            beautify: true
        }));
        this.Flash.use(Guard.check);
        this.Flash.use("/static", express.static(path.join(__dirname, "../storage/static"), { maxAge: "30d" }));
        this.Flash.use("/uploads", express.static(path.join(__dirname, "../storage/uploads")));
        this.Flash.use(cors(config.appConfig.cors));
        this.Flash.use(helmet());
        this.Flash.use(express.json());
        this.Flash.use(express.urlencoded({ extended: true }));
        this.Flash.use(cokieParser());
        // csruf deprecated
        // this.Flash.use(csrf({ cookie: true }));
        this.Flash.use(routerDriver.routers);
        this.Flash.use(errorHandler);
        this.Flash.use("/*", notFound);

        // all api list
        if (ENV.get("EXPRESSPLUS") == "true") {
            AppLog.allLogEndPoints(this.Flash);
        }

        return this.listen();
    }
}

export default FlashApp;