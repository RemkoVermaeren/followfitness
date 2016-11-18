var mongoose = require('mongoose');

var TrainingSchema = new mongoose.Schema({
    name: String,
    description: String,
    date: Date,
    exercise: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Exercise'
    }],
    user : {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    isCompleted : Boolean
});


mongoose.model('Training', TrainingSchema);
