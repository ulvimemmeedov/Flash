import { existsSync } from "fs";

namespace Utils {
    export function checkFile(path: string): boolean {
        return existsSync(path);
    }
    export function log(text, color: string) {
        let c = "\x1b[0m%s\x1b[0m";
        if (color) {
            if (color == "blue") c = "\x1b[36m%s\x1b[0m";
            if (color == "yellow") c = "\x1b[33m%s\x1b[0m";
            if (color == "red") c = "\x1b[31m%s\x1b[0m";
            if (color == "black") c = "\x1b[30m%s\x1b[0m";
            if (color == "white") c = "\x1b[1m%s\x1b[0m";
            if (color == "green") c = "\x1b[32m%s\x1b[0m";
            if (color == "purple") c = "\x1b[35m%s\x1b[0m";
            if (color == "gray") c = "\x1b[37m%s\x1b[0m";
        }
        console.log(c, text);
    }
    export class Logger {
        static Info(arg: any) {
            log(`[INFO] ${arg}`, "white");
        }
        static warn(arg: any) {
            log(`[WARNING] ${arg}`, "yellow");
        }
        static error(arg: any) {
            log(`[ERROR] ${arg}`, "red");
        }
        static table(arg: any) {
            console.table(arg);
        }
    }
}

export default Utils;