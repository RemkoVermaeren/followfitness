var mongoose = require('mongoose');

var ExerciseSchema = new mongoose.Schema({
    machine: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Machine'
    },
    sets: Number,
    repeats : Number,
    weights : [Number],
    training: { type: mongoose.Schema.Types.ObjectId, ref: 'Training' }
});


mongoose.model('Exercise', ExerciseSchema);