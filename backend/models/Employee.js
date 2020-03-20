const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Defining Collection And Schema
let Employee = new Schema({
   name: {
      type: String,
      require:true
   },
   email: {
      type: String,
      require:true
   },
   designation: {
      type: String,
      require:true
   },
   phoneNumber: {
      type: Number,
      require:true
   }
}, {
   collection: 'employees'
});

module.exports = mongoose.model('Employee', Employee);