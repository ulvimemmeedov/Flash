import { exec } from "child_process";
import Storage from "./core/Storage";
import Utils from "./core/Utils";
import fs from 'fs';
import path from "path";

let dir = __dirname.split("/");
let ci = '';
dir.pop();
ci = dir.join("/");

(new Storage.Storage()).makeStorage();


if (fs.existsSync(path.join(__dirname, "./routers/index.ts"))) {
    Utils.Logger.warn("Router Exists");
} else {
    exec(`node ${ci}/flash make:router index`, (err, stdout, stderr) => {
        if (err) {
            Utils.Logger.error(err);
            return;
        }
        Utils.Logger.Info("Main router created");
    });
}

Utils.Logger.Info("Setup Completed ⚡️");
