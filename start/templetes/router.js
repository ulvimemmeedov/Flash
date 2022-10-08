
function routerGenerator(url) {
    return `
import { routeType } from "../core/types"

const routes: routeType[] = [
    {
        method: "get",
        url: "/",
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