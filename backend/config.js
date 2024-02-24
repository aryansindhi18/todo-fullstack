const swaggerUI = require("swagger-ui-express");
const path = require("path")
const YAML = require("yamljs");
const swaggerJSDocs = YAML.load(path.join(__dirname, 'api.yaml'));

const options = {
    customCssUrl:
      'https://cdnjs.cloudflare.com/ajax/libs/swagger-ui/4.15.5/swagger-ui.min.css',
    customJs: [
      'https://cdnjs.cloudflare.com/ajax/libs/swagger-ui/4.15.5/swagger-ui-bundle.js',
      'https://cdnjs.cloudflare.com/ajax/libs/swagger-ui/4.15.5/swagger-ui-standalone-preset.js',
    ],
    customSiteTitle: "API docs - ToDo ~AryanSindhi"
}; 

module.exports = { swaggerServe: swaggerUI.serve, swaggerSetup: swaggerUI.setup(swaggerJSDocs,options) };