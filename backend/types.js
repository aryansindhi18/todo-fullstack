const zod = require("zod");

const createToDoSchema = zod.object({
    title: zod.string(),
    description: zod.string()
})

const updateToDoSchema = zod.object({
    id: zod.string()
})

module.exports = {createToDoSchema,updateToDoSchema}