const mongoose = require('mongoose');
require('dotenv').config();

// Retrieve the MongoDB Atlas URI from the .env file
const uri = process.env.MONGO_URI;

// Connect to the MongoDB database
mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log('Connected to the database');
    // Your code here
  })
  .catch((error) => {
    console.error('Error connecting to the database', error);
  });

  // Create and Save a Record of a Model:
  let Person = require('./person')
  const person = new Person({
    name: "John Doe",
    age: 25,
    favoriteFoods: ["Pizza", "Burger"]
  });
  
  // Save the document to the database
  person.save(function(err, data) {
    if (err) {
      console.error(err);
    } else {
      console.log("Record saved successfully:", data);
     }
  });


//Create Many Records with model.create()
// Define an array of people objects
const arrayOfPeople = [
  {
    name: "John Doe",
    age: 25,
    favoriteFoods: ["Pizza", "Burger"]
  },
  {
    name: "Jane Smith",
    age: 30,
    favoriteFoods: ["Sushi", "Pasta"]
  },
  // Add more objects as needed
];

// Create multiple records using Model.create()
Person.create(arrayOfPeople, function(err, people) {
  if (err) {
    console.error(err);
  } else {
    console.log("Records created successfully:", people);
   
  }
});

//Use model.find() to Search Your Database

// Define the name you want to search for
const nameToSearch = "John Doe";

// Find all people with the given name using Model.find()
Person.find({ name: nameToSearch }, function(err, people) {
  if (err) {
    console.error(err);
  } else {
    console.log("People with the given name:", people);
    
  }
});


//Use model.findOne() to Return a Single Matching Document from Your Database


// Define the food you want to search for
const foodToSearch = "Pizza";

// Find one person with the given food in their favorites using Model.findOne()
Person.findOne({ favoriteFoods: foodToSearch }, function(err, person) {
  if (err) {
    console.error(err);
  } else {
    console.log("Person with the given food:", person);
   
  }
});


// Use model.findById() to Search Your Database By _id

// Define the _id you want to search for
const personIdToSearch = '603dce73d12b5409a4d3e0e1';

// Find the person with the given _id using Model.findById()
Person.findById(personIdToSearch, function(err, person) {
  if (err) {
    console.error(err);
  } else {
    console.log("Person with the given _id:", person);
   }
});


//Perform Classic Updates by Running Find, Edit, then Save

// Define the personId you want to search for
const personId = '603dce73d12b5409a4d3e0e1';

// Find the person by _id
Person.findById(personId, function(err, person) {
  if (err) {
    console.error(err);
  } else {
    // Add "hamburger" to the person's favoriteFoods array
    person.favoriteFoods.push('hamburger');

    // Save the updated person
    person.save(function(err, updatedPerson) {
      if (err) {
        console.error(err);
      } else {
        console.log('Person updated:', updatedPerson);
      }
    });
  }
});

//Perform New Updates on a Document Using model.findOneAndUpdate()

// Define the personName you want to search for
const personName = 'John Doe';

// Find and update the person by name
Person.findOneAndUpdate(
  { name: personName },
  { age: 20 },
  { new: true },
  function(err, updatedPerson) {
    if (err) {
      console.error(err);
    } else {
      console.log('Updated person:', updatedPerson);
     }
  }
);

//Delete One Document Using model.findByIdAndRemove


// Find and remove the person by _id using findByIdAndRemove()
Person.findByIdAndRemove(personId, function(err, removedPerson) {
  if (err) {
    console.error(err);
  } else {
    console.log('Removed person:', removedPerson);
   }
});


//MongoDB and Mongoose - Delete Many Documents with model.remove()


// Delete all people with the name "Mary" using Model.remove()
Person.remove({ name: "Mary" }, function(err, result) {
  if (err) {
    console.error(err);
  } else {
    console.log("Number of people deleted:", result.deletedCount);
  
  }
});



//Chain Search Query Helpers to Narrow Search Results

// Find people who like burritos
Person.find({ favoriteFoods: "burritos" })
  .sort({ name: 1 }) // Sort by name in ascending order (1) or descending order (-1)
  .limit(2) // Limit the results to two documents
  .select("-age") // Exclude the 'age' field from the results
  .exec(function(err, data) {
    if (err) {
      console.error(err);
    } else {
      console.log("People who like burritos:", data);
    }
  });





