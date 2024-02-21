const mongoose = require("mongoose");
const {mongoString} = require("./config.js")
mongoose.connect(mongoString);

const toDoSchema = new mongoose.Schema({
    title: String, // String is shorthand for {type: String}
    description: String,
    isDone: Boolean
  });

  const toDo = mongoose.model('toDos', toDoSchema);

  module.exports={toDo}