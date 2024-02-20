const mongoose = require("mongoose");

mongoose.connect('mongodb+srv://aryansindhi18:wsxokN0657%40@aryansindhi18.orx7din.mongodb.net/todoapp');

const toDoSchema = new mongoose.Schema({
    title: String, // String is shorthand for {type: String}
    description: String,
    isDone: Boolean
  });

  const toDo = mongoose.model('toDos', toDoSchema);

  module.exports={toDo}