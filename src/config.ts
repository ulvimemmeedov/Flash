import dotenv from 'dotenv';
import path from 'path';
import { configType } from './core/types';

dotenv.config({ path: path.join(__dirname, "/.env") });

export const ENV = {
    ...process.env,
    getAll() {
        return process.env;
    },
    get(key: string): any {
        return process.env[key];
    }
}
export const config: configType = {
    appConfig: {
        cors: {
            origin: [
                "http://localhost:3000",
                "http://localhost:8000"
            ]
        },
        database: {
            type: "mysql",
            port: 3306,
            host: "192.168.1.138",
            username: "root",
            password: "",
            database: "expressddd",
            logging: false,
            synchronize: true
        },
        hash: {
            salt: 10,
        },
        port: ENV.get("PORT")
    }
}