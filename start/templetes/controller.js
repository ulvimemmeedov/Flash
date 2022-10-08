function controllerGenerator(controllerName) {
    return `
    import { HttpContextType } from "../core/types";

    export default class ${controllerName} {
        async index(ctx: HttpContextType) {
            return ctx.response.json({ message: "Hello World" })
        }
    }
    
    `
}

module.exports = controllerGenerator;