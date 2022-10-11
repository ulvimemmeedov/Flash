import { DataSource } from "typeorm"
import path from 'path';
import fs from 'fs';
import { config } from "../config";
import Utils from "./Utils";

export default async (): Promise<DataSource | {
    initialize: () => {}
}> => {
    let entitiesPath = path.join(__dirname, '../entities');
    if (Utils.checkFile(entitiesPath)) {
        try {
            const js_files = fs.readdirSync(path.resolve(__dirname, '../entities')).filter((f) => {
                return f.endsWith('.js') || f.endsWith('.ts');
            });
            const entities: any[] = [];

            for await (const f of js_files) {
                const entity = await import(entitiesPath + "/" + f);
                entities.push(entity.default);
            }
            let AppDataSource = new DataSource(config.appConfig.database);

            return AppDataSource;
        } catch (error) {
            return {
                initialize: () => {
                    Utils.Logger.error(error)
                    return {};
                }

            }
        }
    } else {
        return new Promise((resolve, _) => {
            return resolve({
                initialize: () => {
                    Utils.Logger.warn("Entities not defined")
                    return {};
                }
            });
        });
    }
}

