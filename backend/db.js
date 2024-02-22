const mongoose = require("mongoose");
// const {mongoString} = require("./config.js")
mongoose.connect('mongodb+srv://aryansindhi18:wsxokN0657%40@aryansindhi18.orx7din.mongodb.net/todoapp');

const toDoSchema = new mongoose.Schema({
    title: String, // String is shorthand for {type: String}
    description: String,
    isDone: Boolean,
    CreatedOn: {
      type: Date,
      default: Date.now // This will set the default value to the current date
  }
  });

  const toDo = mongoose.model('toDos', toDoSchema);

  module.exports={toDo}