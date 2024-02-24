const swaggerUI = require("swagger-ui-express");
const path = require("path")
const YAML = require("yamljs");
const swaggerJSDocs = YAML.load(path.join(__dirname, 'api.yaml'));

const options = {
    customCss: `https://cdnjs.cloudflare.com/ajax/libs/swagger-ui/4.1.0/swagger-ui.min.css`,
    // customfavIcon: "../favicon.ico",
    customSiteTitle: "API docs - ToDo ~AryanSindhi"
}; 

module.exports = { swaggerServe: swaggerUI.serve, swaggerSetup: swaggerUI.setup(swaggerJSDocs,options) };