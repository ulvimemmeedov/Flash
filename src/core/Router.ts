import path from 'path';
import fs from 'fs';
import express from 'express';
import Utils from './Utils';
import Auth from './Auth';
import { routeType } from './types';
import { Controller } from './Controller';

class Router {
    private router = express.Router();

    async register() {
        let routepath = path.join(__dirname, '../routers')
        if (!fs.existsSync(routepath)) {
            return Utils.Logger.warn("Routers not defined")
        }

        let subFolder: string[] = [];

        const js_files = fs.readdirSync(path.join(routepath)).filter((f) => {
            if (f.endsWith('.js') || f.endsWith('.ts')) {
                return f.endsWith('.js') || f.endsWith('.ts');
            } else {
                fs.readdirSync(path.join(`${routepath}/${f}`)).filter((c) => {
                    subFolder.push(f);
                });
                return subFolder
            }
        });

        for (const f of js_files) {
            const router = (await import(routepath + "/" + f)).default;
            router.map((route: routeType) => {
                this.router[route.method](route.url, (request, response, next) => {
                    let context = {
                        request,
                        response,
                        next,
                        auth: Auth
                    };

                    if (!route.action && !route.controller) {
                        return Utils.Logger.error(new Error("Controller or action not found"))
                    }
                    if (route.action) {
                        return route.action(context);
                    }
                    if (route.controller) {
                        const method = route.controller.split(".")[1];
                        const name = route.controller.split(".")[0];
                        return Controller.addController(name, context, method);
                    }
                });
            })
        }
    }

    public get routers() {
        return this.router;
    }

}

export default Router;