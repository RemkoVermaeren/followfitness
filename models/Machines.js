var mongoose = require('mongoose');

var MachineSchema = new mongoose.Schema({
    name: String
});


mongoose.model('Machine', MachineSchema);