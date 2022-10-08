const path = require('path');
const fs = require("fs");
const srcPath = "../src";
require('dotenv').config({ path: path.join(__dirname, `${srcPath}/config/.env`) });

module.exports = class Kernel {
    static makeEntity(entityName) {
        entityName = entityName.charAt(0).toUpperCase() + entityName.slice(1);
        const entityPath = path.join(__dirname, `${srcPath}/entities`);

        const entityGenerator = require('./templetes/entity');
        const entityTemplete = entityGenerator(entityName);

        if (!fs.existsSync(entityPath)) {
            fs.mkdirSync(entityPath);
        }

        if (fs.existsSync(`${entityPath}/${entityName}.ts`)) {
            throw new Error("Entity exists")
        }

        fs.writeFileSync(`${entityPath}/${entityName}.ts`, entityTemplete, "utf-8");
    }

    static makeRouter(routeName) {
        let routesPath = path.join(__dirname, `${srcPath}/routers`);
        const routerGenerator = require('./templetes/router');
        const routerTemplete = routerGenerator("/" + routeName)

        try {
            if (!fs.existsSync(routesPath)) {
                fs.mkdirSync(routesPath);
            }

            if (fs.existsSync(`${routesPath}/${routeName}.ts`)) {
                throw new Error("Router exists")
            }

            let subDirArr = routeName.split("/");

            if (subDirArr.length > 1 && !fs.existsSync(routesPath + `/${subDirArr[0]}`)) {
                fs.mkdirSync(routesPath + `/${subDirArr[0]}`);
                if (!subDirArr[1]) {
                    routeName += "index"
                }
            }

            fs.writeFileSync(`${routesPath}/${routeName}.ts`, routerTemplete, "utf-8");
            console.log("Router createed");
        } catch (error) {
            console.log(error);
        }
    }

    static makeService(serviceName) {
        serviceName = serviceName.charAt(0).toUpperCase() + serviceName.slice(1);
        const servicePath = path.join(__dirname, `${srcPath}/services`);
        const interfacesPath = path.join(__dirname, `${srcPath}/interfaces`);

        const { serviceGenerator, serviceInterfaceTempleteGenerator } = require('./templetes/service');
        const serviceTemplete = serviceGenerator(serviceName);
        const serviceInterfaceTemplete = serviceInterfaceTempleteGenerator(serviceName);

        if (!fs.existsSync(servicePath)) {
            fs.mkdirSync(servicePath);
        }
        if (!fs.existsSync(interfacesPath)) {
            fs.mkdirSync(interfacesPath);
        }
        if (fs.existsSync(`${servicePath}/${serviceName}.ts`)) {
            throw new Error("Service exists")
        }
        if (fs.existsSync(`${interfacesPath}/${serviceName}Interface.ts`)) {
            throw new Error("Service interface exists")
        }
        fs.writeFileSync(`${interfacesPath}/${serviceName}Interface.ts`, serviceInterfaceTemplete, "utf-8");
        fs.writeFileSync(`${servicePath}/${serviceName}.ts`, serviceTemplete, "utf-8");
    }

    static makeController(controllerName) {
        controllerName = controllerName.charAt(0).toUpperCase() + controllerName.slice(1);

        const controllerPath = path.join(__dirname, `${srcPath}/controllers`);

        const controllerGenerator = require('./templetes/controller');
        const controllerTemplete = controllerGenerator(controllerName);

        if (!fs.existsSync(controllerPath)) {
            fs.mkdirSync(controllerPath);
        }

        if (fs.existsSync(`${controllerPath}/${controllerName}.ts`)) {
            throw new Error("Controller exists")
        }

        fs.writeFileSync(`${controllerPath}/${controllerName}.ts`, controllerTemplete, "utf-8");
    }
}