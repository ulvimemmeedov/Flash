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
            host: "localhost",
            username: "root",
            password: "root",
            database: "db",
            logging: false,
            synchronize: true,
            entities: []
        },
        hash: {
            salt: 10,
        },
        port: ENV.get("PORT")
    }
}

