var mongoose = require('mongoose');

var MachineSchema = new mongoose.Schema({
    name: String,
    source: String
});


mongoose.model('Machine', MachineSchema);