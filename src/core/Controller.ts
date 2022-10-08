import path from 'path';
import { HttpContextType } from './types';

export namespace Controller {
    const controllerPath = path.join(__dirname, "../controllers/");

    export async function addController(controllerName: string, context: HttpContextType, method: string) {
        const Controller = (await import(controllerPath + controllerName)).default;
        const controller = new Controller()
        controller[method](context);
    }
}