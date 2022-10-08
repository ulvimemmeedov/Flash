function serviceGenerator(serviceName) {
    return `
import BaseService from "../core/BaseService";
import ${serviceName}Interface from "../interfaces/${serviceName}Interface";
export default class ${serviceName} extends BaseService implements ${serviceName}Interface {}
    `
}

function serviceInterfaceTempleteGenerator(serviceName) {
    return `
export default interface ${serviceName}ServiceInterface {

}
    `
}

module.exports = { serviceGenerator, serviceInterfaceTempleteGenerator };