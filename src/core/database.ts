import { DataSource } from "typeorm"
import path from 'path';
import fs from 'fs';
import { config } from "../config";
import Utils from "./Utils";

export default async (): Promise<DataSource | {
    initialize: () => {}
}> => {
    if (Utils.checkFile('../entity')) {
        const js_files = fs.readdirSync(path.resolve(__dirname, '../entity')).filter((f) => {
            return f.endsWith('.js') || f.endsWith('.ts');
        });
        function* importSth(): Generator<Promise<string[]>> {
            for (const f of js_files) {
                yield import('../entity/' + f).then((res) => Object.values(res));
            }
        }
        const entities: string[] = await (async () => await (await Promise.all([...importSth()])).flat())();

        let AppDataSource = new DataSource({
            type: "mysql",
            host: config.appConfig.database.host,
            port: config.appConfig.database.port,
            username: config.appConfig.database.username,
            password: config.appConfig.database.password,
            database: config.appConfig.database.databaseName,
            synchronize: config.appConfig.database.synchronize,
            logging: config.appConfig.database.logging,
            entities: entities,
            subscribers: [],
            migrations: [],
        })

        return AppDataSource;
    } else {
        return new Promise((resolve, _) => {
            return resolve({
                initialize: () => {
                    Utils.Logger.warn("Entities not defined")
                    return {};
                }

            })
        })
    }
}

