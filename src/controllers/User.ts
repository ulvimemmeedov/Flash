
import { HttpContextType } from "/root/nodejs/src/core/types";
import User from "../entities/User";
import HashDriver from "../core/Hash";

export default class UserController {
    async index(ctx: HttpContextType) {
        const users = await User.find();
        return ctx.response.json(users);
    }

    async create(ctx: HttpContextType) {
        const { email, password } = ctx.request.body;
        HashDriver.generateHash(password);
        const user = await User.create({
            email,
            password
        });
        user.save();
        return ctx.response.json(user);
    }
}

