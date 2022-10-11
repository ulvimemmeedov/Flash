const path = require("path");

let dirname = path.join(__dirname, "..//..//src/core/types");
function controllerGenerator(controllerName) {
    return `
import { HttpContextType } from "${dirname}";

export default class ${controllerName}Controller {
    async index(ctx: HttpContextType) {
        return ctx.response.json({ message: "Hello World" })
    }
}

    `
}

module.exports = controllerGenerator;