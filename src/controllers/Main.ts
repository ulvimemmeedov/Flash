
    import { HttpContextType } from "../core/types";

    export default class Main {
        async index(ctx: HttpContextType) {
            return ctx.response.json({ message: "Hello World" })
        }
    }
    
    