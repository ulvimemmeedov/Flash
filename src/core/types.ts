import Auth from "./Auth"

export type configType = {
    appConfig: {
        cors: {
            origin: string[]
        },
        database: {
            port: number,
            host: string,
            username: string,
            password: string,
            databaseName: string,
            logging: boolean,
            synchronize: boolean
        },
        hash: {
            salt: number,
        }
        port: string | number
    }
}

export type FileParams = {
    filename: string;
    base64: string;
    ext: string;
    size: number;
    type: string;
}

export type HttpContextType = {
    request
    response
    next
    auth: Auth,
    // validation: Validation
}
export type routeType = {
    method: "all" | "get" | "post" | "put" | "delete" | "patch" | "options" | "head"
    url: string
    action?: (ctx: HttpContextType) => any
    controller?: string
}