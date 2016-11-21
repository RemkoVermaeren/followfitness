var mongoose = require('mongoose');

var ExerciseSchema = new mongoose.Schema({
    name:String,
    machine: String,
    sets: [{
        repeat : {type : Number},
        weight: {type: Number}
    }],
    training: { type: mongoose.Schema.Types.ObjectId, ref: 'Training' }
});


mongoose.model('Exercise', ExerciseSchema);