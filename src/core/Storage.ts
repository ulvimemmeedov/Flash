import fs from 'fs';
import path from 'path';
import { FileParams } from './types';
import Utils from './Utils';


namespace Storage {
    export const folders = ["/uploads", "/static"]

    export const mainPath: string = path.join(__dirname, "../storage");
    export const uploadsPath: string = path.join(mainPath + "/uploads");
    export const staticPath = mainPath + "/static";


    export class Storage {
        private readonly mainPath: string = mainPath;
        makeStorage() {
            if (!fs.existsSync(this.mainPath)) {
                fs.mkdirSync(this.mainPath);
                folders.forEach(folder => {
                    fs.mkdirSync(this.mainPath + folder);
                })
                return Utils.Logger.Info("Storage successfully created");
            }
            Utils.Logger.warn("Storage Exists")
        }
    }
    export class File {
        private file: FileParams;
        private readonly mainPath: string = uploadsPath;
        private static readonly mainPath: string = uploadsPath;

        constructor(file: FileParams) {
            if (!fs.existsSync(this.mainPath)) {
                Utils.Logger.error("Storage not found")
            }
            this.file = file;
        }

        static getFile(_path: string, filename: string) {
            if (!fs.existsSync(this.mainPath)) {
                fs.mkdirSync(this.mainPath);
            }

            return new Promise((resolve, reject) => {
                let full_path = path.join(`${this.mainPath}/${_path}/${filename}`);

                if (!fs.existsSync(full_path)) {
                    return reject({
                        message: "File not found"
                    })
                }
                fs.readFile(path.join(full_path), (err, data) => {

                    if (err) {
                        return reject({
                            error: err,
                            message: "File not found."
                        })
                    } else {
                        return resolve(data);
                    }
                });
            });
        }

        save(filePath: string) {
            let full_path = `${this.mainPath}/${filePath}`;

            if (!fs.existsSync(full_path)) {
                fs.mkdirSync(full_path);
            }

            const name =
                Math.random()
                    .toString(36)
                    .substring(2, 15) +
                Math.random()
                    .toString(36)
                    .substring(2, 15) +
                Date.now().toString(36) +
                `.${this.file.ext}`;

            let base64Data = Buffer.from(this.file.base64.split(",")[1], "base64");

            fs.writeFile(`${full_path}/${name}`, base64Data, (err) => {
                if (err) {
                    Utils.Logger.error({
                        message: "Something that wrong",
                        error: err
                    });
                    throw new Error(err?.message);
                }
            });

            return `/${path}/${name}`;
        }
    }
}

export default Storage;