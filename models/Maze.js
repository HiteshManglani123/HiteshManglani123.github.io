const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');

const mazeSchema = new mongoose.Schema({
  usernameId: {
    type: String,
    unqiue: true,
    required: true,
  },
  mazeBoard: [
    [

    ],
  ],
  date: {
    type: Date,
    default: Date.now,
  },
  typeOfAlgorithm: {
    type: String,
    required: true,
  },
});

mazeSchema.plugin(uniqueValidator);

mazeSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString();
    delete returnedObject._id;
    delete returnedObject.__v;
    delete returnedObject.passwordHash;
  },
});

const maze = mongoose.model('maze', mazeSchema);

module.exports = maze;
