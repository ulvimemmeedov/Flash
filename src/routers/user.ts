
import { routeType } from "/root/nodejs/src/core/types"

const routes: routeType[] = [
    {
        method: "get",
        url: "/user",
        controller: "User.index"
    },
    {
        method: "post",
        url: "/user",
        controller: "User.create"
    }
]
export default routes;
