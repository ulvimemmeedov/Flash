import Utils from "./Utils";
import endPointList from 'express-list-endpoints';

namespace AppLog {
    export function routeLog(req, res, next) {
        const logs = {
            url: req.url,
            method: req.method,
            ip: req.headers['x-forwarded-for'] || req.connection.remoteAddress || req.socket.remoteAddress

        }
        Utils.Logger.table(logs);
        next();
    }
    export function allLogEndPoints(app) {
        Utils.Logger.table(endPointList(app));
    }
}

export default AppLog;