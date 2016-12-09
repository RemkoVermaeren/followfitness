var mongoose = require('mongoose');

var MachineSchema = new mongoose.Schema({
    name: String,
    source: String,
    user : {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }});


mongoose.model('Machine', MachineSchema);