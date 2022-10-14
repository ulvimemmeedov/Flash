import Auth from "./Auth"
import { DataSourceOptions } from "typeorm";

interface DataSourceOptionsType extends DataSourceOptions {
    type: DataSourceOptions.type,
    port: number,
    host: string,
    username: string,
    password: string,
    database: string,
    logging: false,
    synchronize: true,
    entities: any[]
}

export type configType = {
    appConfig: {
        cors: {
            origin: string[]
        },
        database: DataSourceOptionsType,
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