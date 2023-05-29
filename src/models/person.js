const mongoose = require('mongoose');

// Create a person schema
const personSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  age: {
    type: Number,
    default: 0
  },
  favoriteFoods: {
    type: [String],
    default: []
  }
});

// Create the Person model
const Person = mongoose.model('Person', personSchema);

module.exports = Person;
