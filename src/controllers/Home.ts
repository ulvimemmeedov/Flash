
import { HttpContextType } from "/root/Flash/src/core/types";
export default class HomeController {
    async index(ctx: HttpContextType) {
        return ctx.response.json({ message: "Hello World" })
    }
}
    