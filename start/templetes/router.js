const path = require("path");

let dirname = path.join(__dirname, "..//..//src/core/types");

function routerGenerator(url) {
    return `
import { routeType } from "${dirname}"

const routes: routeType[] = [
    {
        method: "get",
        url: "${url}",
        action: function (ctx) {
            ctx.response.json({
                message: "Hello World"
            })
        }
    },
]
export default routes;
    `
}

module.exports = routerGenerator;